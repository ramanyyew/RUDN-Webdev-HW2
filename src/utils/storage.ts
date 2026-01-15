import type { Task, Status } from '../types/task';

let tasksInMemory: Task[] = [];

export const getTasks = (): Task[] => {
  const result: Task[] = [];
  for (let i = 0; i < tasksInMemory.length; i++) {
    result.push(tasksInMemory[i]);
  }
  return result;
};

export const saveTasks = (tasks: Task[]): void => {
  tasksInMemory = [];
  for (let i = 0; i < tasks.length; i++) {
    tasksInMemory.push(tasks[i]);
  }
};

export const getTask = (id: number): Task | undefined => {
  const allTasks = getTasks();
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id === id) {
      return allTasks[i];
    }
  }
  return undefined;
};

export const createTask = (title: string, description: string): Task => {
  const allTasks = getTasks();
  let maxId = 0;
  
  if (allTasks.length === 0) {
    maxId = 0;
  } else {
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].id > maxId) {
        maxId = allTasks[i].id;
      }
    }
  }
  
  const newId = maxId + 1;
  
  const newTask: Task = {
    id: newId,
    title: title,
    description: description,
    createdAt: new Date(),
    status: 0,
  };
  
  allTasks.push(newTask);
  saveTasks(allTasks);
  return newTask;
};

export const updateStatus = (id: number, status: Status): void => {
  const allTasks = getTasks();
  let found = false;
  
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id === id) {
      allTasks[i].status = status;
      found = true;
      break;
    }
  }
  
  if (found) {
    saveTasks(allTasks);
  }
};

export const deleteTask = (id: number): void => {
  const allTasks = getTasks();
  const newArray: Task[] = [];
  
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id !== id) {
      newArray.push(allTasks[i]);
    }
  }
  
  saveTasks(newArray);
};
