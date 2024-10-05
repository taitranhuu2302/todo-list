export interface Task {
  id: number;
  title: string;
  due: string | null;
  completed: boolean;
}

export interface CreateTask {
  title: string;
  due: string;
}
