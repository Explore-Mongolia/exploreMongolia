import { useQuery } from "@tanstack/react-query";
import { sendRequest } from "@/lib/SendRequest";

const fetchExperience = (id: string) =>
  sendRequest.get(`/experience/${id}`).then((res) => res.data.experience);


export function useExperience(id: string) {
  return useQuery({
    queryKey: ["experience", id],
    queryFn: () => fetchExperience(id),
    staleTime: 5 * 60 * 1000,
  });
}
