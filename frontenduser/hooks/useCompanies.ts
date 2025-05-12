import { sendRequest } from '@/lib/SendRequest';
import { useQuery } from '@tanstack/react-query';

interface Company {
  id: string;
  name: string;
  description: string;
  profileImage?: string;
}

const fetchCompanies = async (): Promise<Company[]> => {
  const response = await sendRequest.get("/company");
  return response.data.companies || [];
};

export const useCompanies = () =>
  useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
  });
