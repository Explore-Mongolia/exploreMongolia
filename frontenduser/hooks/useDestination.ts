import { useQuery } from "@tanstack/react-query";
import { sendRequest } from "@/lib/SendRequest";

const fetchDestination = (id: string) =>
  sendRequest.get(`/destination/${id}`).then((res) => res.data);
export function useDestination(id: string) {
  return useQuery({
    queryKey: ["destination", id],
    queryFn: () => fetchDestination(id),
    staleTime: 5 * 60 * 1000,
  });
}
