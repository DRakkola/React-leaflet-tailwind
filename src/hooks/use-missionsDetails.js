import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/RestClient";



const useDissionsDetails = (id) => useQuery({
      queryKey: ["missionDetails",id],
      queryFn: async () => {
        const res =  await axiosInstance(
          `api/delegations/with_intensity/?mission_id=${id}`
        );
        return res.data
      },
    });

export default useDissionsDetails