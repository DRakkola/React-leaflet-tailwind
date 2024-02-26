import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/RestClient";

const useLiveState = () =>
  useQuery({
    queryKey: ["Live", "State"],
    queryFn: async () => {
      const res = await axiosInstance("/streamState/");

      return res.data;
    },
    refetchOnWindowFocus: true,
  });
const useLiveData = () =>
  useQuery({
    queryKey: ["live", "data"],
    queryFn: async () => {
      const res = await axiosInstance("/upload/live/");
      return res.data;
    },
    refetchInterval: 5000,
  });
export { useLiveState, useLiveData };
