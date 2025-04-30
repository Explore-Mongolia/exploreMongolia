
import { sendRequest } from "@/lib/SendRequest";
import { useQuery } from "@tanstack/react-query";

const fetchTrips = () =>
  sendRequest.get("/destination").then((res) => res.data.destinations);

export default function useTrips() {
  return useQuery({
    queryKey: ["trips"],
    queryFn: fetchTrips,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
