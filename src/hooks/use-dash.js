import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/RestClient";


const useDash = () => 
  useQuery({
    queryKey: ['dash'],
    queryFn: async () => {
      const res = await axiosInstance(
        '/dashboard/'
      );

      return res.data;
    },
  })

const useMonthly = () =>
useQuery({
  queryKey: ['graph'],
  queryFn: async () => {
    const res = await axiosInstance(
      '/monthly-count/'
    );

    return res;
  },
})

export  {useDash,useMonthly}
