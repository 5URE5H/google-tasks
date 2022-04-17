import "./App.css";
import { UserProvider } from "./store/User.store";
import Login from "./components/login/Login";
import Logout from "./components/login/Logout";
import { useEffect } from "react";
import { listTaskLists } from "./api";
import TaskBody from "./components/TaskBody";

function App() {
  useEffect(() => {}, []);

  return (
    <UserProvider>
      <div className="App">
        <TaskBody />
        <Login />
        <Logout />
      </div>
    </UserProvider>
  );
}

export default App;
