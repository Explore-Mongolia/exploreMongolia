import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Company {
  id: number;
  name: string;
  description: string;
  profileImage: string;
}

const fetchCompanies = async (): Promise<Company[]> => {
  const response = await axios.get("http://localhost:9000/company");
  return response.data.companies || [];
};

export const useCompanies = () =>
  useQuery({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
  });
