import { useMemo, useState } from 'react';
import { Button, Input, Skeleton, Tooltip, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { AddTaskModal } from '@/components';
import TodoItem from '@/components/Todo/TodoItem';
import { useGetTasks } from '@/services';

const { Option } = Select;

const FILTER_STATUS = {
  ALL: 'ALL',
  COMPLETED: 'COMPLETED',
  IN_COMPLETED: 'IN_COMPLETED'
};

const TodoList = () => {
  const { data: tasks, isLoading } = useGetTasks();
  const [openAddTask, setOpenAddTask] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState(FILTER_STATUS.ALL);

  const toggleOpenAddTask = () => setOpenAddTask((prev) => !prev);

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    return tasks
      .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
      .filter((task) => {
        if (filterStatus === FILTER_STATUS.COMPLETED) return task.completed;
        if (filterStatus === FILTER_STATUS.IN_COMPLETED) return !task.completed;
        return true;
      })
      .reverse();
  }, [tasks, search, filterStatus]);

  const renderedTaskList = useMemo(() => {
    if (isLoading) {
      return <Skeleton active paragraph={{ rows: 3 }} />;
    }

    if (filteredTasks.length > 0) {
      return filteredTasks.map((task) => (
        <TodoItem task={task} key={task.id} />
      ));
    }

    return <p>No tasks available.</p>;
  }, [isLoading, filteredTasks]);

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="todo">
        <div className="todo-header">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            size="large"
          />
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            style={{ width: 150 }}
            size="large"
          >
            <Option value={FILTER_STATUS.ALL}>All</Option>
            <Option value={FILTER_STATUS.COMPLETED}>Completed</Option>
            <Option value={FILTER_STATUS.IN_COMPLETED}>In Completed</Option>
          </Select>
          <Tooltip placement="bottom" title="Add Task">
            <Button size="large" onClick={toggleOpenAddTask}>
              <PlusOutlined />
            </Button>
          </Tooltip>
        </div>
        <div className="todo-list">{renderedTaskList}</div>
      </div>
      <AddTaskModal open={openAddTask} onClose={toggleOpenAddTask} />
    </div>
  );
};

export default TodoList;
