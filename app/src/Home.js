import React from "react";
import Dashboard from "./components/Dashboard";
import Preview from "./components/Preview";

const Home = () => {
  const user = localStorage.user ? JSON.parse(localStorage.user) : undefined;

  return (
    <div>{user.role === "administrator" ? <Dashboard /> : <Preview />}</div>
  );
};

export default Home;
