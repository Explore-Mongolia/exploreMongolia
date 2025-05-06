import { sendRequest } from "@/lib/SendRequest";
import { useQuery } from "@tanstack/react-query";


const fetchUser = (id: string) =>
  sendRequest.get(`/user/${id}`).then((res) => res.data.user);

export default function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id], 
    queryFn: () => fetchUser(id),
    staleTime: 5 * 60 * 1000,
    retry: false, 
  });
}
