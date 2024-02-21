import { create } from 'zustand'

const GalerieID = create((set) => ({
  currentGalerie: null,
  setcurrentGalerie: (pk) => set(() => ({ currentGalerie: pk })),
}))

export default GalerieID