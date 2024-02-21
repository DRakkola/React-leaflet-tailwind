import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ScreenShareProvider } from "./pages/Stream/ScreenShareContext";
import { FiefAuthProvider } from "@fief/fief/react";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
import { Routes } from "./routes";

const App = () => {
  return (
    // <FiefAuthProvider
    //   baseURL="http://localhost:8000"
    //   clientId="Sa9Q0SyaHSGrynz7HbixxAycvKFegLn-Xcugf7MhGYY"
    // >
    <div className="h-screen w-screen bg-slate-50">
      <QueryClientProvider client={queryClient}>
        <div>
          <Toaster />
        </div>
        <Routes />
        {/* <Route path="/callback" element={<Callback />} /> */}
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </div>
    // </FiefAuthProvider>
  );
};

export default App;
