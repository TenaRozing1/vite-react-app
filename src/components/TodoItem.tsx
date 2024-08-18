import React, { useEffect, useRef } from "react";

interface TodoItemProps {
  task: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ task, completed, onToggle, onDelete }) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = completed;
    }
  }, [completed]);

  return (
    <div className={`todo-item ${completed ? 'completed' : ''}`}>
      <input type="checkbox" ref={checkboxRef} onChange={onToggle} />
      <span>{task}</span>
      <button onClick={onDelete}>Remove</button>
    </div>
  );
};
