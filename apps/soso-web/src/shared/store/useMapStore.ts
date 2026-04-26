import { create } from 'zustand';

interface Marker {
  id: number;
  position: {
    lat: number;
    lng: number;
  };
  data?: any;
  icon?: {
    content: string;
      anchor?: {
      x: number;
      y: number;
    };  
  };
  zIndex?: number;
}

interface MapStore {
  center: {
    lat: number;
    lng: number;
  };
  minZoom: number;
  zoom: number;
  markers: Marker[]; // 여러 개의 마커를 저장
  map: naver.maps.Map | null;
  setMap: (map: naver.maps.Map) => void;
  setCenter: (lat: number, lng: number) => void;
  moveCenter: (lat: number, lng: number) => void; // 중심 이동 함수
  setZoom: (zoom: number) => void;
  setMapState: (lat: number, lng: number, zoom: number) => void;
  addMarker: (marker: Marker) => void; // 마커 추가
  removeMarker: (id: number) => void; // 특정 마커 제거
  clearMarkers: () => void; // 모든 마커 제거
}

const useMapStore = create<MapStore>((set, get) => ({
  center: {
    lat: 37.5665,
    lng: 126.978,
  },
  zoom: 18,
  minZoom: 7,
  markers: [],
  map: null,

  setMap: (map) => set({ map }),

  setCenter: (lat, lng) =>
    set((state) => ({
      ...state,
      center: { lat, lng },
    })),

  moveCenter: (lat, lng) => {
    const map = get().map;
    if (map) {
      map.panTo(new naver.maps.LatLng(lat, lng));
    }
    set((state) => ({
      ...state,
      center: { lat, lng },
    }));
  },

  setZoom: (zoom) =>
    set((state) => ({
      ...state,
      zoom,
    })),

  setMapState: (lat, lng, zoom) =>
    set({
      center: { lat, lng },
      zoom,
    }),

  addMarker: (marker) =>
    set((state) => ({
      markers: [...state.markers, marker],
    })),

  removeMarker: (id) =>
    set((state) => ({
      markers: state.markers.filter((marker) => marker.id !== id),
    })),

  clearMarkers: () => set({ markers: [] }),
}));

export default useMapStore;
