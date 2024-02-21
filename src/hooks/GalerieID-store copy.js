import { create } from "zustand";

const Notification = create((set) => ({
  currentGalerie: null,
  setcurrentGalerie: (pk) => set(() => ({ currentGalerie: pk })),
}));

export default GalerieID;
