import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";

function App() {
  const [todolist, setTodolist] = useState([]);
  const [task, setTask] = useState("");

  const getTasks = async () => {
    const response = await api.get('/tasks');
    setTodolist(response.data.data);
  };

  const addTask = async () => {
    if (!task.trim()) return;
    
    try {
      const response = await api.post("/tasks", { 
        task, 
        isComplete: false 
      });
      setTask("");
      getTasks();
    } catch (error) {
      console.error("추가 실패:", error);
    }
  };

  // ▼▼▼ [새로 추가해야 할 부분] 삭제 함수 ▼▼▼
  const deleteTask = async (id) => {
    try {
      console.log("삭제할 아이디:", id); // 이게 찍히는지 확인해야 함
      // 백엔드 주소로 삭제 요청을 보냄 (주소 뒤에 id 붙임)
      const response = await api.delete(`/tasks/${id}`);
      
      if(response.status === 200){
          getTasks(); // 삭제 성공하면 목록 다시 불러오기
      }
    } catch (error) {
      console.error("삭제 에러:", error);
    }
  };
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  const toggleComplete = async (id) => {
    try {
      // 1. id로 해당 아이템을 찾는다
      const task = todolist.find((item) => item._id === id); 
      
      // 2. 현재 상태(isComplete)를 반대로 뒤집어서 서버에 보낸다 (true -> false, false -> true)
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });

      // 3. 성공하면 목록을 새로고침한다
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
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

      {/* ▼▼▼ TodoBoard에게 삭제 기능(리모컨)을 넘겨줘야 함! ▼▼▼ */}
      <TodoBoard 
        todolist={todolist} 
        deleteTask={deleteTask} 
        toggleComplete={toggleComplete}
      />
    </Container>
  );
}

export default App;