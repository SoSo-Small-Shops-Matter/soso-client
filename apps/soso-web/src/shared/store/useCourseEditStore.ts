import { create } from 'zustand'
import type { CourseDetailDto } from '@/shared/api/course/types'

export interface SelectedShop {
  id: number
  name: string
  mainImage: string | null
  lat?: number
  lng?: number
}

interface CourseEditState {
  courseId: number | null
  selectedShops: SelectedShop[]
  courseName: string
  initFromCourse: (course: CourseDetailDto) => void
  addShop: (shop: SelectedShop) => void
  removeShop: (shopId: number) => void
  toggleShop: (shop: SelectedShop) => void
  reorderShops: (fromIndex: number, toIndex: number) => void
  clearShops: () => void
  setCourseName: (name: string) => void
  reset: () => void
}

export const useCourseEditStore = create<CourseEditState>((set, get) => ({
  courseId: null,
  selectedShops: [],
  courseName: '',

  initFromCourse: (course) =>
    set({
      courseId: course.id,
      courseName: course.name,
      selectedShops: course.stops
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((stop) => (stop.shop)),
    }),

  addShop: (shop) =>
    set((state) => ({
      selectedShops: [...state.selectedShops, shop],
    })),

  removeShop: (shopId) =>
    set((state) => ({
      selectedShops: state.selectedShops.filter((s) => s.id !== shopId),
    })),

  toggleShop: (shop) => {
    const isSelected = get().selectedShops.some((s) => s.id === shop.id)
    if (isSelected) {
      get().removeShop(shop.id)
    } else {
      get().addShop(shop)
    }
  },

  reorderShops: (fromIndex, toIndex) =>
    set((state) => {
      const shops = [...state.selectedShops]
      const [moved] = shops.splice(fromIndex, 1)
      shops.splice(toIndex, 0, moved)
      return { selectedShops: shops }
    }),

  clearShops: () => set({ selectedShops: [] }),

  setCourseName: (name) => set({ courseName: name }),

  reset: () => set({ courseId: null, selectedShops: [], courseName: '' }),
}))
