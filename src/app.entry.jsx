import toast, { Toaster } from "react-hot-toast";

import { NotificationsContext } from "./hooks/NotificationProfider";
import { Routes } from "./routes";
import { useEffect, useContext } from "react";
const App = () => {
  // Initialize local state for message input

  // Use the chat messages from the query client
  const { currentNotification } = useContext(NotificationsContext);
  console.log("current : ", currentNotification);

  const notify = () => {
    if (currentNotification.type === "success") {
      toast.success(currentNotification.data, {
        duration: 10000,
        position: "top-center",
      });
    }

    if (currentNotification.type === "end") {
      toast.success(currentNotification.data, {
        duration: 10000,
        position: "top-center",
      });
    }
  };
  useEffect(() => {
    notify();
  }, [currentNotification]);
  return (
    // <FiefAuthProvider
    //   baseURL="http://localhost:8000"
    //   clientId="Sa9Q0SyaHSGrynz7HbixxAycvKFegLn-Xcugf7MhGYY"
    // >
    <div className="h-screen w-screen bg-slate-50">
      <div>
        <Toaster />
      </div>
      <Routes />
      {/* <Route path="/callback" element={<Callback />} /> */}
    </div>
    // </FiefAuthProvider>
  );
};

export default App;
