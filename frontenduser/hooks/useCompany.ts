
import { useQuery } from "@tanstack/react-query";
import { sendRequest } from "@/lib/SendRequest";

const fetchCompany = (id: string) =>
    sendRequest.get(`/company/${id}`).then((res) => res.data);
  export function useCompany(id: string) {
    return useQuery({
      queryKey: ["company", id],
      queryFn: () => fetchCompany(id),
      staleTime: 5 * 60 * 1000,
    });
  }
