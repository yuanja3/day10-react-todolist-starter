import {useContext, useEffect, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import '../TodoList.css';
import {getTodos, addTodo, deleteTodos, updateTodo} from "../apis/api";
const TodoList = () => {
  const {state, dispatch} = useContext(TodoContext);
    const [input, setInput] = useState("");
    /*function toggleDone(id) {
        dispatch({type: 'Done', id:id});
    }*/
    const toggleDone=async(id)=>{
        const todo=state.find(t=>t.id===id);
        const updatedTodo={...todo,done:!todo.done};
        updateTodo(id,updatedTodo).then(response=>{
            console.log(response.data);
            dispatch({type:'Done',id:id});
        });
    }
    // function addTodo() {
    //     if (input.trim()) {
    //         dispatch({type: 'Add', text: input});
    //         setInput("");
    //     }
    // }
    /*function deleteTodo(id) {
        dispatch({type: 'Delete',id: id});
    }*/
    const deleteTodo=async(id)=>{
        deleteTodos(id).then(response=>{
            console.log(response.data);
            dispatch({type:'Delete',id:id});
        });
    }
    const handleAddTodo=async ()=>{
        const todo={text:input,done:false};
        addTodo(todo).then(response=>{
            console.log(response.data);
            dispatch({type:'Add',todo:response.data});

        });
        setInput("");
    }
    useEffect(() => {
        getTodos().then(todos => {
           dispatch({type: 'LOAD_TODOS', todos: todos.data});
        });
    }, []);
    return (
        <div className={"todo-group"}>
            <div>Todo List</div>
            {state.length === 0 && (
                <div className="todo-desc">Add the things you need to do today...</div>
            )}

            {state.map(({text, done, id}) => (
                <div key={id} className={`todo-item ${done ? 'done' : ''}`}>
                    <span onClick={() => toggleDone(id)}>{text}</span>
                    <button onClick={() => deleteTodo(id)}>X</button>
                </div>
            ))}
            <div>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Add new todo"
                />
                <button className="add-button" onClick={handleAddTodo} >Add</button>
            </div>
        </div>
    );
}

export default TodoList