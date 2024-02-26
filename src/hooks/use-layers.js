import { create } from "zustand";

const useLayers = create((set) => ({
  isLocationsShown: false,
  isPicturesShown: false,
  isLiveShown: false,

  setIsLocationsShown: () =>
    set((state) => ({ isLocationsShown: !state.isLocationsShown })),
  setIsPicturesShown: () =>
    set((state) => ({ isPicturesShown: !state.isPicturesShown })),
  setIsLiveShown: () => set((state) => ({ isLiveShown: !state.isLiveShown })),
}));

export default useLayers;
