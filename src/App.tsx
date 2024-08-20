import { useEffect, useState } from "react"
import { TodoProvider } from "./contexts"
import {TodoForm, TodoItem} from "./components";

function App() {
  const [todos, setTodos] = useState<{id : number, todo : string, completed : boolean}[]>([])

  const addTodo = (todo : string) => {
    const todoItem = {
      id : todos.length,
      todo : todo,
      completed : false
    }
    setTodos((pre) => [todoItem, ...pre])
  };
  const updateTodo = (id : number, todo : string) => {
    setTodos((pre) => pre.map((preTodo) => (preTodo.id === id) ? { ...preTodo, todo } : preTodo));
  };
  const deleteTodo = (id : number) => {
    setTodos((pre) => pre.filter((todo) => todo.id !== id))
  };
  const toggleComplete = (id : number) => {
    setTodos((pre) => pre.map((todo) => (todo.id === id) ? {...todo, completed : !todo.completed} : todo))
  };

  useEffect(() => {
    const tempTodos = localStorage.getItem('todos')
    const todos = tempTodos ? JSON.parse(tempTodos) : []
    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, toggleComplete, deleteTodo}}>
      <div className="bg-[#1d293a] min-h-screen py-8">
        <div className="bg-[#062552] w-full max-w-2xl mx-auto shadow-lg rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
              {/* Todo form goes here */}
              <TodoForm></TodoForm>
          </div>
          <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>)}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
