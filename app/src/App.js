import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import "./styles/App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const onChangeLogin = (e) => {
    e.preventDefault();
    const updatedData = { ...data };
    updatedData[e.target.name] = e.target.value;
    setData(updatedData);
    console.log(updatedData);
  };

  const onSubmitData = async (e) => {
    e.preventDefault();
    // Verifica que los datos no esten incompletos

    try {
      const res = await axios.post("http://localhost:4000/users/sign-in", data);
      const user = res.data.user;
      user.logined = true;
      localStorage.user = JSON.stringify(user);
      navigate("/inicio");
    } catch (error) {
      alert("Algo salió mal", error);
      console.log(error)
    }
  };

  return (
    <div>
      <Container className="mt-3 containerLogin">
        <Card className="cardLogin">
          <Card.Body>
            <Card.Title className="titleLogin">Iniciar Sesión</Card.Title>
            <Form onSubmit={onSubmitData}>
              <Form.Group>
                <Form.Label className="text">Correo Electrónico</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Ingresa tu correo."
                  onChange={onChangeLogin}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text">Contraseña</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  onChange={onChangeLogin}
                  required
                />
              </Form.Group>
              <Form.Check label="Recordar usuario" className="text " />
              <Container className="d-flex ">
                <a href="/registrarse">¿No tienes cuenta? Regístrate</a>
              </Container>
              <Container className="d-flex justify-content-center">
                <Button
                  className="mt-3 buttonLogin"
                  variant="info"
                  type="submit"
                >
                  Iniciar Sesión
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default App;
