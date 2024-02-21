import { useQuery } from "@tanstack/react-query";
import {strawberryRequest} from "../api/GraphqlClient";
import { gql } from "graphql-request";



const useMissions = () => useQuery({
      queryKey: ["missions"],
      queryFn: async () => {
        return await strawberryRequest(
          gql`
            query {
                missions {
                    discription
                    drone
                    id
                    name
                    started
                    published
                  }
            }
          `
        );
      },
    });

export default useMissions