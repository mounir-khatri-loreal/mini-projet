import './App.css';
import {TodoProvider} from "./TodoContext";
import TodoList from "./component/TodoList";

function App() {
  return (
    <TodoProvider>
    <div className="App">
      <header className="App-header">
<TodoList/>
      </header>
    </div>
    </TodoProvider>
  );
}

export default App;
