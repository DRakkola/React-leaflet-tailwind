import { create } from 'zustand'

const missionID = create((set) => ({
  currentMission: '0d498bfb-b43a-42a6-accb-d101e7b30fd5',
  setcurrentMission: (pk) => set(() => ({ currentMission: pk })),
}))

export default missionID