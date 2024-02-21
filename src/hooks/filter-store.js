import { create } from 'zustand'

const Filters = create((set) => ({
  Mission : null,
  setcurrentMission: (Mission) => set(() => ({ Mission: Mission })),
  Drone : null,
  setcurrentDrone: (Drone) => set(() => ({ Drone: Drone })),
  From : null,
  setFrom:(From) => set(() => ({ From: From })),
  To:null,
  setTo:(To)=> set(() => ({ To: To }))
}))

export  {Filters};