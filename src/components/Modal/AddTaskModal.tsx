import { FC, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Modal, notification } from 'antd';
import moment from 'moment';
import { useQueryClient } from 'react-query';

import { CreateTask, Task } from '@/types';
import { useCreateTask } from '@/services';
import { QUERY_KEY } from '@/constants';

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddTaskModal: FC<Props> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const { mutateAsync: createTaskAsync, isLoading } = useCreateTask();
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();

  const handleSubmit = async (data: CreateTask) => {
    const payload: Omit<Task, 'id'> = {
      title: data.title,
      due: data.due ? moment(data.due).format('YYYY-MM-DD') : null,
      completed: false
    };

    try {
      await createTaskAsync(payload);
      await queryClient.refetchQueries({ queryKey: [QUERY_KEY.TASKS] });
      form.resetFields();
      api.success({
        message: 'Task created successfully!',
        description: 'Your task has been created and is now in your task list'
      });
      onClose();
    } catch {
      api.error({
        message: 'Failed to create task',
        description:
          'There was an error creating the task. Please try again later.' // Mô tả cho thông báo lỗi
      });
    }
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  return (
    <>
      <Modal open={open} onCancel={onClose} title="Add New Task">
        <Form
          requiredMark={'optional'}
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: 'Please enter the title' },
              { max: 100 },
              {
                validator: (_, value) => {
                  const specialCharRegex = /^[a-zA-Z0-9\s]*$/;
                  if (value && !specialCharRegex.test(value)) {
                    return Promise.reject(
                      new Error('Title cannot contain special characters')
                    );
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input placeholder="Enter the title" />
          </Form.Item>
          <Form.Item
            label="Due Date"
            name="due"
            rules={[
              {
                validator: (_, value) => {
                  if (value && value < moment().startOf('day')) {
                    return Promise.reject(
                      new Error('Due date cannot be earlier than today')
                    );
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <DatePicker format={'MM/DD/YYYY'} />
          </Form.Item>
          <Form.Item>
            <Button
              disabled={isLoading}
              className="submit-btn"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
  );
};

export default AddTaskModal;
