import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";
import TodoItem from "./components/TodoItem";

function App() {
  const [todolist, setTodolist] = useState([]);
  const [task, setTask] = useState(""); // 입력값 상태 추가

  const getTasks = async () => {
    const response = await api.get('/tasks');
    console.log("rrrrrrr", response);
    setTodolist(response.data.data); // todolist 업데이트
  };

  const addTask = async () => {
    if (!task.trim()) return; // 빈 값 방지
    
    try {
      const response = await api.post("/tasks", { 
        task, 
        isComplete: false 
      });
      console.log("추가 성공:", response);
      setTask(""); // 입력창 초기화
      getTasks(); // 목록 새로고침
    } catch (error) {
      console.error("추가 실패:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);  
      console.log("삭제 성공:", response);
      getTasks(); // 목록 새로고침
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  

  useEffect(() => {
    getTasks();
  }, []); 

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>
      
      <TodoBoard todolist={todolist} deleteTask={deleteTask} /> 
    </Container>
  );
}

export default App;