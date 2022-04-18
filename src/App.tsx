import "./App.css";
import { UserProvider } from "./store/User.store";
import { useEffect } from "react";
import TaskBody from "./components/TaskBody";
import { TaskListProvider } from "./store/TaskList.store";

function App() {
  useEffect(() => {}, []);

  return (
    <UserProvider>
      <div className="App">
        <TaskListProvider>
          <TaskBody />
        </TaskListProvider>
      </div>
    </UserProvider>
  );
}

export default App;
