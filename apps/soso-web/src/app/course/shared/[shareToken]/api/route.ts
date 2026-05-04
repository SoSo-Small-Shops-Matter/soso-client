import { NextRequest, NextResponse } from 'next/server'

const W = 1200
const H = 630
const FALLBACK_IMAGE = '/images/confirm.png'

interface StopCoord {
  lat: number
  lng: number
}

function centroid(coords: StopCoord[]): StopCoord {
  return {
    lat: coords.reduce((s, c) => s + c.lat, 0) / coords.length,
    lng: coords.reduce((s, c) => s + c.lng, 0) / coords.length,
  }
}

function computeZoom(coords: StopCoord[]): number {
  if (coords.length <= 1) return 14

  const lats = coords.map((c) => c.lat)
  const lngs = coords.map((c) => c.lng)
  const latSpan = Math.max(...lats) - Math.min(...lats)
  const lngSpan = Math.max(...lngs) - Math.min(...lngs)

  if (latSpan === 0 && lngSpan === 0) return 14

  const padding = 2
  const zLng = Math.log2((W * 360) / (256 * lngSpan * padding))
  const zLat = Math.log2((H * 180) / (256 * latSpan * padding))

  return Math.max(8, Math.min(16, Math.floor(Math.min(zLng, zLat))))
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ shareToken: string }> }) {
  const { shareToken } = await params

  const courseRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/shared/${shareToken}`, {
    next: { revalidate: 3600 },
  })

  if (!courseRes.ok) {
    return NextResponse.redirect(new URL(FALLBACK_IMAGE, req.url))
  }

  const data = await courseRes.json()
  const stops: { shop: { lat: number; lng: number } }[] = data?.result?.stops ?? []

  if (!stops.length) {
    return NextResponse.redirect(new URL(FALLBACK_IMAGE, req.url))
  }

  const coords = stops.map((s) => ({ lat: s.shop.lat, lng: s.shop.lng }))
  const center = centroid(coords)
  const zoom = computeZoom(coords)

  const url = new URL('https://maps.apigw.ntruss.com/map-static/v2/raster')
  url.searchParams.set('w', String(W))
  url.searchParams.set('h', String(H))
  url.searchParams.set('center', `${center.lng},${center.lat}`)
  url.searchParams.set('level', String(zoom))
  url.searchParams.set('format', 'jpg')

  stops.forEach((stop, i) => {
    url.searchParams.append('markers', `type:d|size:mid|pos:${stop.shop.lng} ${stop.shop.lat}|label:${i + 1}`)
  })

  const naverHeaders = {
    'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID ?? '(undefined)',
    'X-NCP-APIGW-API-KEY': process.env.NAVER_CLIENT_SECRET ?? '(undefined)',
  }

  const mapRes = await fetch(url.toString(), {
    headers: naverHeaders,
    next: { revalidate: 3600 },
  })

  if (!mapRes.ok) {
    return NextResponse.redirect(new URL(FALLBACK_IMAGE, req.url))
  }

  const image = await mapRes.arrayBuffer()

  return new NextResponse(image, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
