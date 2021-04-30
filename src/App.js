import React, {useState, useEffect} from 'react';
import "./App.css";
// Importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos]=useState([]);




  // Run once when the App starts
  useEffect(()=>{
    getLocalTodos();
  }, []);
  // UseEffect Allows us to run a function in two differnt places.
  // When the user clicks submit and when the user selects/ toggles between completed and uncompleted.
  useEffect(()=>{
  filterHandler();
  saveLocalTodos();
  }, [todos, status])

  // Functions and events.
  // You can add this function on the use effect function to avoid the warning on the console.
  const filterHandler = ()=>{
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo=>todo.completed === true))
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo=>todo.completed === false))
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  };

  // Save to local storage 
  const saveLocalTodos=()=>{
      localStorage.setItem("todos", JSON.stringify(todos));
  };
  
  //Get saved todos
  const getLocalTodos = ()=>{
    if(localStorage.getItem("todos")=== null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
      let todoLocal= JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal)
    }
  };

  return (
  <div className="App">
    <header>
      <h1>My Todo List </h1>
    </header>
    <Form 
    inputText = {inputText}
    todos={todos}
    setTodos = {setTodos}
    setInputText={setInputText}
    setStatus = {setStatus}
    />
    <TodoList 
    filteredTodos = {filteredTodos}
    setTodos = {setTodos}
    todos = {todos}/> 
  </div>
  );
}

export default App;
 