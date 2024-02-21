import { create } from 'zustand'

const useLayers = create((set) => ({
  isLocationsShown: false,
  isPicturesShown: false,
  setIsLocationsShown: () => set((state) => ({ isLocationsShown: !state.isLocationsShown})),
  setIsPicturesShown: () => set((state) => ({ isPicturesShown: !state.isPicturesShown})),
}))

export default useLayers