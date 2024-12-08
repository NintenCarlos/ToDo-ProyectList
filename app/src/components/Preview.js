import { useEffect, useState } from "react";
import "../styles/Preview.css";
import { Button, Card, CloseButton, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarHome from "./Navbar";

const Preview = () => {
  const [tasks, setTasks] = useState([]);
  const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;

  useEffect(() => {
    getTasks();
  }, []);

  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/tasks/get", {
        userId: user._id,
      });

      setTasks(data.tasks);
    } catch (error) {
      alert("Algo salió mal, intentelo más tarde");
    }
  };

  const changeStatus = async (indexTask, taskId) => {
    try {
      const updatedTasks = [...tasks];
      updatedTasks[indexTask].status = !updatedTasks[indexTask].status;
      setTasks(updatedTasks);

      // Petición
      await axios.put(`http://localhost:4000/task-status/${taskId}`, {
        status: updatedTasks[indexTask].status,
      });
    } catch (error) {
      alert("Hubo un error al marcar la tarea.");
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/delete/${taskId}`);

      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      alert("Hubo un error al eliminar la tarea.");
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarHome />
      <Container className="containerPreview">
        <Card className="mt-3 cardPreview">
          <Card.Body>
            <Card.Title className="titlePreview">Tus tareas</Card.Title>
            <Card.Subtitle className="subtitlePreviewText">
              Bienvenido {user.name} {user.lastNames}
            </Card.Subtitle>

            {tasks.map((task, taskId) => (
              <Card key={taskId} className="mt-2 miniCards">
                <Card.Body>
                  <Container className="d-flex justify-content-between">
                    <Card.Title className="cardTaskTitle"  >
                      <Form.Check
                        type="checkbox"
                        label={task.task}
                        checked={task.status}
                        onChange={() => changeStatus(taskId, task._id)}
                      />
                    </Card.Title>
                    <CloseButton onClick={() => deleteTask(task._id)} />
                  </Container>


                    <Card.Text>{task.description}</Card.Text>
                    <Card.Text><b className="cardTaskTitle">Fecha de vencimiento:</b> {task.dueDate}</Card.Text>
                 
                    <Button className="button" onClick={() => navigate(`/actualizar-tarea/${task._id}`)}>Actualizar Tarea</Button>
                </Card.Body>
              </Card>
            ))}
            <Container className="d-flex justify-content-end">
              <Button
                onClick={() => navigate("/crear-tarea")}
                className="mt-3 createTask"
              >
                Crear tarea
              </Button>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Preview;
