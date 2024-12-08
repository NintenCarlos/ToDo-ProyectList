import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarHome from "./components/Navbar";
import "./styles/CreateTask.css";

const CreateTask = () => {
  const [task, setTask] = useState({
    task: "Tarea sin título",
    description: "Descripción Vacía",
    dueDate: "",
    status: false,
    userId: JSON.parse(localStorage.user)._id,
  });

  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    e.preventDefault();
    const data = task;
    data.task = e.target.value;

    if (!data.task) {
      data.task = "Tarea sin título";
    }

    setTask({ ...data });
  };

  const onChangeDescription = (e) => {
    e.preventDefault();
    const data = task;
    data.description = e.target.value;

    if (!data.description) {
      data.description = "Descripción Vacía";
    }

    setTask({ ...data });
  };

  const onChangeDate = (e) => {
    setTask({
      ...task,
      dueDate: e.target.value,
    });
  };

  const createTask = async () => {
    try {
      await axios.post("http://localhost:4000/tasks/create", task);

      navigate("/inicio");
      console.log(task);
    } catch (error) {
      alert("hubo un error creando la tarea.");
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarHome />
      <Container className="mt-3">
        <Card className="card">
          <Card.Body>
            <Card.Title className="title">Crea tus Tareas</Card.Title>

            {/*La vista previa de la tarea. */}
            <Container>
              <Card className="miniCards">
                <Card.Body>
                  <Card.Title className="cardTaskTitle">{task.task}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <Card.Text>{task.dueDate}</Card.Text>
                </Card.Body>
              </Card>
            </Container>

            {/*Título Card */}
            <Container className="mt-3">
              <Form>
                <Card className="miniCards">
                  <Card.Body>
                    <Card.Text className="cardTaskTitle">
                      Ingresa la tarea
                    </Card.Text>
                    <Form.Control
                      name={task.title}
                      placeholder="Introduce la tarea"
                      onChange={onChangeTitle}
                      required
                    />
                  </Card.Body>
                </Card>

                {/*Descripción Card */}
                <Card className="miniCards">
                  <Card.Body>
                    <Card.Text className="cardTaskTitle">
                      Ingresa una descripción para la tarea.
                    </Card.Text>
                    <Form.Control
                      name={task.description}
                      placeholder="Introduce tu descripción"
                      onChange={onChangeDescription}
                      required
                    />
                  </Card.Body>
                </Card>

                {/*Fecha Card */}
                <Card className="miniCards">
                  <Card.Body>
                    <Card.Text className="cardTaskTitle">
                      Ingresa una descripción para la tarea.
                    </Card.Text>
                    <Form.Control
                      name={task.dueDate}
                      type="date"
                      onChange={onChangeDate}
                      required
                    />
                  </Card.Body>
                </Card>

                <Container>
                  <Button className="button mb-3" onClick={() => createTask()}>
                    Crear Tarea
                  </Button>
                </Container>
              </Form>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CreateTask;
