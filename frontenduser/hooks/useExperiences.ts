

import { sendRequest } from '@/lib/SendRequest'
import { useQuery } from '@tanstack/react-query'

const fetchExperiences = () =>
  sendRequest.get('/experience').then((res) => res.data.experiences)

export function useExperiences() {
  return useQuery({
    queryKey: ['experiences'],
    queryFn: fetchExperiences,
    staleTime: 5 * 60 * 1000,
  })
}
