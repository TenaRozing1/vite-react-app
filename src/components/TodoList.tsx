import React, { useState, ChangeEvent } from "react";
import { TodoItem } from "./TodoItem";
import Button from "./button-component/Button";
import Input from "./input-component/Input";

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
    if (newTask.trim() === "") {
      alert("Task cannot be empty.");
    } else {
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
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTasksFromAPI = async () => {
    if (numTasksToAdd <= 0) {
      alert("Please enter a valid number of tasks to add.");
      return;
    }
    try {
      const response = await fetch(
        `https://dummyjson.com/todos?limit=${numTasksToAdd}`
      );
      const data = await response.json();
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
    setTodos(todos.filter((todo) => todo.fromAPI));
  };

  const deleteAPITasks = () => {
    setTodos(todos.filter((todo) => !todo.fromAPI));
  };

  const completedTasksCount = todos.filter((todo) => todo.completed).length;

  const handleNewTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleNumTasksChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumTasksToAdd(Number(e.target.value));
  };

  return (
    <div className="todo-list">
      <h1 className="todo-title">Welcome to my todo app! :)</h1>
      <div className="add-task">
        <Input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Add a new task"
        />
        <Button onClick={addTask} color="primary">
          Add Task
        </Button>
      </div>
      <div className="api-tasks">
        <Input
          type="number"
          value={numTasksToAdd}
          onChange={handleNumTasksChange}
          placeholder="Number of API tasks"
        />
        <Button onClick={addTasksFromAPI} color="primary">
          Add Tasks from API
        </Button>
      </div>
      <div className="task-actions">
        <Button
          onClick={deleteAllTasks}
          color="secondary"
          disabled={todos.length === 0} // Disable button if no tasks to delete
        >
          Delete All Tasks
        </Button>
        <Button
          onClick={deleteManualTasks}
          color="secondary"
          disabled={todos.every((todo) => todo.fromAPI)} // Disable button if all tasks are from API
        >
          Delete Manual Tasks
        </Button>
        <Button
          onClick={deleteAPITasks}
          color="secondary"
          disabled={todos.every((todo) => !todo.fromAPI)} // Disable button if all tasks are manual
        >
          Delete API Tasks
        </Button>
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
