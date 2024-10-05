import { useMutation } from 'react-query';

import { BASE_URL } from '@/constants';
import { Task } from '@/types';
import { axiosInstance } from '@/config';

const useCreateTask = () => {
  return useMutation({
    mutationFn: (task: Omit<Task, 'id'>) =>
      axiosInstance.post(`${BASE_URL}/tasks`, task)
  });
};

export default useCreateTask;
