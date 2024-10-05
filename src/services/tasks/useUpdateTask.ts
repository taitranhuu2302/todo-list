import { useMutation } from 'react-query';

import { Task } from '@/types';
import { axiosInstance } from '@/config';
import { BASE_URL } from '@/constants';

const useUpdateTask = () => {
  return useMutation({
    mutationFn: (task: Task) =>
      axiosInstance.put(`${BASE_URL}/tasks/${task.id}`, task)
  });
};
export default useUpdateTask;
