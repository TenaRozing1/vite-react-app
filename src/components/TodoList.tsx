import React, { useState } from "react";
import { TodoItem } from "./ToDoItem";

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  fromAPI: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [numTasksToAdd, setNumTasksToAdd] = useState<number>(0);

  const addTask = () => {
    if (newTask.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        task: newTask,
        completed: false,
        fromAPI: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTask = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTasksFromAPI = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/todos?limit=${numTasksToAdd}`);
      const data = await response.json();
      console.log(data)
      const apiTodos = data.todos.map((todo: any) => ({
        id: todo.id,
        task: todo.todo,
        completed: todo.completed,
        fromAPI: true,
      }));
      setTodos([...todos, ...apiTodos]);
      setNumTasksToAdd(0);
      alert("Tasks from API successfully added!");
    } catch (error) {
      console.error("Failed to fetch tasks from API", error);
      alert("Failed to fetch tasks from API");
    }
  };

  const deleteAllTasks = () => {
    setTodos([]);
  };

  const deleteManualTasks = () => {
    setTodos(todos.filter(todo => todo.fromAPI));
  };

  const deleteAPITasks = () => {
    setTodos(todos.filter(todo => !todo.fromAPI));
  };

  const completedTasksCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todo-list">
      <h1 className="todo-title">Welcome to my todo app</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="api-tasks">
        <input
          type="number"
          value={numTasksToAdd}
          onChange={(e) => setNumTasksToAdd(Number(e.target.value))}
          placeholder="Number of API tasks"
        />
        <button onClick={addTasksFromAPI}>Add Tasks from API</button>
      </div>
      <div className="task-actions">
        <button onClick={deleteAllTasks}>Delete All Tasks</button>
        <button onClick={deleteManualTasks}>Delete Manual Tasks</button>
        <button onClick={deleteAPITasks}>Delete API Tasks</button>
      </div>
      <p>Completed Tasks: {completedTasksCount}</p>
      <div className="tasks">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            task={todo.task}
            completed={todo.completed}
            onToggle={() => toggleTask(todo.id)}
            onDelete={() => deleteTask(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};
