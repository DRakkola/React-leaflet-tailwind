import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/RestClient";
import { formatISO } from "date-fns";
const useLocations = (filters) =>
  useQuery({
    queryKey: [filters],
    queryFn: async () => {
      var Mission = "";
      var Drone = "";
      var From = "";
      var To = "";
      var queryParams = [];
      if (filters["Mission"] != null) {
        Mission = "Mission=".concat(filters["Mission"]);
        queryParams.push(Mission);
      }
      if (filters["Drone"] != null) {
        Drone = "Drone=".concat(filters["Drone"]);
        queryParams.push(Drone);
      }
      if (filters["From"] != null) {
        From = "From=".concat(
          formatISO(new Date(filters["From"]), { representation: "date" })
        );
        queryParams.push(From);
      }
      if (filters["To"] != null) {
        To = "To=".concat(
          formatISO(new Date(filters["To"]), { representation: "date" })
        );
        queryParams.push(To);
      }
      queryParams = queryParams.join("&");
      console.log("queryParams", queryParams);
      return await axiosInstance(`locations/?${queryParams}`);
    },
  });

export default useLocations;
