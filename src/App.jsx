import { useState } from "react";
import "./App.css";
import Users from "./components/users/index";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Users />
    </>
  );
}

export default App;
