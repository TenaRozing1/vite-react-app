import React from "react";
import { TodoList } from "./components/TodoList";
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <header>
        <h1>Tena Rozing</h1>
      </header>
      <main>
        <TodoList />
      </main>
    </div>
  );
};

export default App;
