import React from "react";
import TodoItem from "./TodoItem";

// 1. 여기서 props로 'toggleComplete'도 같이 받아야 합니다.
const TodoBoard = ({ todolist, deleteTask, toggleComplete }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todolist.length > 0 ? (
        todolist.map((item) => (
          <TodoItem 
            item={item} 
            key={item._id}
            deleteTask={deleteTask} 
            // 2. 받은 'toggleComplete'를 TodoItem에게 또 넘겨줍니다.
            toggleComplete={toggleComplete} 
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;