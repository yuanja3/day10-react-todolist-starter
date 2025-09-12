import {useContext, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import '../TodoList.css';
const TodoList = () => {
  const {state, dispatch} = useContext(TodoContext);
    const [input, setInput] = useState("");
    function toggleDone(id) {
        dispatch({type: 'Done', id:id});
    }
    function addTodo() {
        if (input.trim()) {
            dispatch({type: 'Add', text: input});
            setInput("");
        }
    }
    function deleteTodo(id) {
        dispatch({type: 'Delete',id: id});
    }
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
                <button className="add-button" onClick={addTodo} >Add</button>
            </div>
        </div>
    );
}

export default TodoList