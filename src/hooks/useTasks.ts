import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { Task, Status } from '../types/task';
import {
  getTasks,
  createTask,
  updateStatus,
  deleteTask,
  saveTasks,
} from '../utils/storage';

type ApiTodoItem = {
  id: number;
  title: string;
  completed: boolean;
};

const convertApiTodoToTask = (apiItem: ApiTodoItem, existingTasks: Task[]): Task => {
  for (let j = 0; j < existingTasks.length; j++) {
    if (existingTasks[j].id === apiItem.id) {
      return existingTasks[j];
    }
  }
  
  let taskStatus: 0 | 1 | 2 = 0;
  if (apiItem.completed === true) {
    taskStatus = 2;
  } else {
    taskStatus = 0;
  }
  
  return {
    id: apiItem.id,
    title: apiItem.title,
    description: '',
    createdAt: new Date(),
    status: taskStatus,
  };
};

export const useTasks = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const savedTasks = getTasks();
      
      if (savedTasks.length !== 0) {
        return savedTasks;
      }
      
      try {
        const apiResponse = await axios.get<ApiTodoItem[]>(
          'https://jsonplaceholder.typicode.com/todos'
        );
        const convertedTasks: Task[] = [];
        
        let howMany = 20;
        if (apiResponse.data.length < 20) {
          howMany = apiResponse.data.length;
        }
        
        for (let i = 0; i < howMany; i++) {
          const converted = convertApiTodoToTask(apiResponse.data[i], savedTasks);
          convertedTasks.push(converted);
        }
        
        const allTasks: Task[] = [];
        for (let k = 0; k < savedTasks.length; k++) {
          allTasks.push(savedTasks[k]);
        }
        for (let m = 0; m < convertedTasks.length; m++) {
          allTasks.push(convertedTasks[m]);
        }
        
        if (allTasks.length > 0) {
          saveTasks(allTasks);
        }
        
        return allTasks;
      } catch {
        return savedTasks;
      }
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: (data: { title: string; description: string }) => {
      const created = createTask(data.title, data.description);
      return Promise.resolve(created);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: (data: { id: number; status: Status }) => {
      updateStatus(data.id, data.status);
      return Promise.resolve(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: number) => {
      deleteTask(taskId);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    tasks: tasks,
    isLoading: isLoading,
    createTask: createTaskMutation.mutate,
    updateStatus: updateStatusMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};

export const useTask = (id: number) => {
  const { tasks, isLoading } = useTasks();
  let foundTask: Task | undefined = undefined;
  
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      foundTask = tasks[i];
      break;
    }
  }
  
  return { 
    task: foundTask, 
    isLoading: isLoading,
  };
};
