import { create } from 'zustand'

export interface SelectedShop {
  id: number
  name: string
  mainImage: string | null
  lat?: number
  lng?: number
}

interface CourseAddState {
  selectedShops: SelectedShop[]
  courseName: string
  addShop: (shop: SelectedShop) => void
  removeShop: (shopId: number) => void
  toggleShop: (shop: SelectedShop) => void
  reorderShops: (fromIndex: number, toIndex: number) => void
  setCourseName: (name: string) => void
  reset: () => void
}

export const useCourseAddStore = create<CourseAddState>((set, get) => ({
  selectedShops: [],
  courseName: '',

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

  setCourseName: (name) => set({ courseName: name }),

  reset: () => set({ selectedShops: [], courseName: '' }),
}))
