import { createContext, useContext } from "react";


export const TodoContext = createContext({
    todos : [
        {
            id : 1,
            todo : 'todo message',
            completed : false,
        }
    ],
    addTodo : (todo : string) => {},
    updateTodo : (id : number, todo : string) => {},
    deleteTodo : (id : number) => {},
    toggleComplete : (id : number) => {},
})

export const useTodo = () =>  useContext(TodoContext);

export const TodoProvider = TodoContext.Provider;