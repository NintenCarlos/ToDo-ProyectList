import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({
    task: "",
    description: "Descripción Vacía",
    dueDate: "2025-08-01",
    status: false,
    userId: JSON.parse(localStorage.user)._id,
  });

  const navigate = useNavigate();

  const getTask = async (taskId) => {
    const res = await axios.get(`http://localhost:4000/tasks/${taskId}`);
    setTask(res.data.task);
  };

  useEffect(() => {
    getTask(taskId);
  }, [taskId]);

  const onChangeTitle = (e) => {
    e.preventDefault();
    const data = task;
    data.task = e.target.value;

    setTask({ ...data });
  };

  const onChangeDescription = (e) => {
    e.preventDefault();
    const data = task;
    data.description = e.target.value;

    setTask({ ...data });
  };

  const onChangeDate = (e) => {
    setTask({
      ...task,
      dueDate: e.target.value,
    });
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/tasks/update/${taskId}`, task);
      console.log("Tarea actualizada:", task);
      navigate("/inicio");
    } catch (error) {
      alert("Hubo un error al actualizar la tarea.");
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <Container className="mt-3">
        <Card>
          <Card.Body>
            <Card.Title className="title">Actualiza tu Tarea</Card.Title>

            <Container>
              <Card className="miniCards">
                <Card.Body>
                  <Card.Title className="cardTaskTitle">{task.task}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <Card.Text>{task.dueDate}</Card.Text>
                </Card.Body>
              </Card>
            </Container>

            <Container className="mt-3">
              <Form onSubmit={updateTask}>
                <Card className="miniCards">
                  <Card.Body>
                    <Card.Text className="cardTaskTitle">
                      Ingresa el título de la tarea
                    </Card.Text>
                    <Form.Control
                      value={task.task}
                      placeholder="Introduce la tarea"
                      onChange={onChangeTitle}
                      required
                    />
                  </Card.Body>
                </Card>

                <Card className="miniCards">
                  <Card.Body>
                    <Card.Text className="cardTaskTitle">
                      Ingresa una descripción para la tarea
                    </Card.Text>
                    <Form.Control
                      value={task.description}
                      placeholder="Introduce tu descripción"
                      onChange={onChangeDescription}
                      required
                    />
                  </Card.Body>
                </Card>

                <Card className="miniCards">
                  <Card.Body>
                    <Card.Text className="cardTaskTitle">
                      Ingresa la fecha de vencimiento
                    </Card.Text>
                    <Form.Control
                      value={task.dueDate}
                      type="date"
                      onChange={onChangeDate}
                      required
                    />
                  </Card.Body>
                </Card>

                <Container className="justify-content-end d-flex">
                  <Button className="button" type="submit">
                    Actualizar Tarea
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

export default UpdateTask;
