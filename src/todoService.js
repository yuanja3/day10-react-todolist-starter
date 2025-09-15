import {getTodos} from "./apis/api";
import {useCallback} from "react";

export const useTodoService = () => {
    const [todos,setTodos]=React.useState([]);
    //get
    const loadTodos=useCallback(()=>{
        getTodos().then(response=>{
            setTodos(response.data);
        })
    },[])
    return { todos,loadTodos}
};
