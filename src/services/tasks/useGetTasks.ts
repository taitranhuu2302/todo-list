import { useQuery } from 'react-query';

import { BASE_URL, QUERY_KEY } from '@/constants';
import { Task } from '@/types';
import { axiosInstance } from '@/config';

const useGetTasks = () => {
  return useQuery<Task[]>({
    queryKey: [QUERY_KEY.TASKS],
    queryFn: () => axiosInstance.get(`${BASE_URL}/tasks`)
  });
};

export default useGetTasks;
