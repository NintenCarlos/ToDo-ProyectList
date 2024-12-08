import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import "./styles/Registration.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [data, setData] = useState({});

  const navigate = useNavigate();

  const onChangeRegister = (e) => {
    const updatedData = { ...data };
    updatedData[e.target.name] = e.target.value;

    setData(updatedData);
    console.log(updatedData);
  };

  const onRegisterUser = async (e) => {
    e.preventDefault()
    if (data.password !== data.confirmPassword) {
      alert("Las contraseñas no coinciden.");
    } else {
      try {
        data.role = "client";
        await axios.post("http://localhost:4000/users/registration", data);
        alert("El usuario se ha creado con éxito.");
        navigate("/");

      } catch (error) {
        alert("Algo salió mal. Inténtelo de nuevo.");
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Container className="containerRegistration mt-3">
        <Card className="cardRegistration">
          <Card.Body>
            <Card.Title className="titleRegistration">Regístrate</Card.Title>

            <Form onSubmit={onRegisterUser}>
              <Form.Group>
                <Form.Label className="text">Nombre(s)</Form.Label>
                <Form.Control
                  name="name"
                  placeholder="Ingresa tu nombre"
                  onChange={onChangeRegister}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text">Apellidos</Form.Label>
                <Form.Control
                  name="lastNames"
                  placeholder="Ingresa tus apellidos"
                  onChange={onChangeRegister}
                  required
                />
              </Form.Group>

              <Form.Group className="text">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  onChange={onChangeRegister}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text">Contraseña</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Ingresa contraseña"
                  onChange={onChangeRegister}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="text">Confirmar Contraseña</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder="Comprueba que las contraseñas son iguales"
                  onChange={onChangeRegister}
                  required
                />
              </Form.Group>

              <Container className="mt-3 d-flex justify-content-center">
                <Button
                  variant="info"
                  className="buttonRegistration"
                  type="submit"
                >
                  Registrarse
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Registration;
