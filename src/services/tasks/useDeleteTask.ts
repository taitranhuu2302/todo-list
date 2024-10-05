import { useMutation } from 'react-query';

import { axiosInstance } from '@/config';
import { BASE_URL } from '@/constants';

const useDeleteTask = () => {
  return useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`${BASE_URL}/tasks/${id}`)
  });
};
export default useDeleteTask;
