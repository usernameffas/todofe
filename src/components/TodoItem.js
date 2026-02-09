import React from "react";
import { Col, Row } from "react-bootstrap";

// 1. 여기 괄호 안에 'toggleComplete'가 꼭! 있어야 합니다.
const TodoItem = ({ item, deleteTask, toggleComplete }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button 
              className="button-delete" 
              onClick={() => deleteTask(item._id)}
            >
              삭제
            </button>
            
            {/* 2. 여기에 클릭 이벤트가 연결되어 있어야 합니다. */}
            <button 
              className="button-delete"
              onClick={() => toggleComplete(item._id)}
            >
              {item.isComplete ? "안끝남" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;