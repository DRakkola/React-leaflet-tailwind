import { create } from "zustand";

const Notification = create((set) => ({
  currentNotification: "Notifications working",
  setcurrentNotification: (pk) => set(() => ({ currentNotification: pk })),
}));

export default Notification;
