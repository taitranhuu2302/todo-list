import { FC, useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  Typography,
  Popconfirm,
  notification
} from 'antd';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from 'react-query';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

import { Task } from '@/types';
import { useDeleteTask, useUpdateTask } from '@/services';
import { QUERY_KEY } from '@/constants';
import moment from 'moment';

interface Props {
  task: Task;
}

const TodoItem: FC<Props> = ({ task }) => {
  const { mutateAsync: deleteTask } = useDeleteTask();
  const { mutateAsync: updateTask } = useUpdateTask();
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();

  const [isCompleted, setIsCompleted] = useState(task.completed);

  const showNotification = (
    type: 'success' | 'error',
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
      placement: 'topRight'
    });
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      showNotification('success', 'Success', 'Task deleted successfully!');
      await queryClient.refetchQueries({ queryKey: [QUERY_KEY.TASKS] });
    } catch {
      showNotification(
        'error',
        'Error',
        'Failed to delete the task. Please try again.'
      );
    }
  };

  const handleCheck = async (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;

    setIsCompleted(checked);

    try {
      await updateTask({ ...task, completed: checked });
      showNotification(
        'success',
        'Success',
        `Task marked as ${checked ? 'completed' : 'incomplete'}!`
      );
      await queryClient.refetchQueries({ queryKey: [QUERY_KEY.TASKS] });
    } catch {
      setIsCompleted(task.completed);
      showNotification(
        'error',
        'Error',
        'Failed to update the task status. Please try again.'
      );
    }
  };

  const isOverdue = () => {
    if (!task.due) return false;
    return moment(task.due).isBefore(moment(), 'day');
  };

  return (
    <>
      <Flex
        className={`todo-item ${isOverdue() ? 'overdue' : ''}`}
        justify="space-between"
        align="center"
      >
        <Flex gap={10}>
          <Checkbox checked={isCompleted} onChange={handleCheck} />
          <Flex vertical>
            <Typography.Text className={`title ${isCompleted && 'completed'}`}>
              {task.title}
            </Typography.Text>
            {task.due && (
              <Typography.Text type="secondary">
                Due: {task.due}
              </Typography.Text>
            )}
          </Flex>
        </Flex>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleDelete}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        >
          <Button danger>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Flex>
      {contextHolder}
    </>
  );
};

export default TodoItem;
