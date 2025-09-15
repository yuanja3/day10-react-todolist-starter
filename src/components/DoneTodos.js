import {useContext, useEffect} from "react";
import { TodoContext } from "../contexts/TodoContext";
import {getTodos} from "../apis/api";

const DoneTodos = () => {
    const { state,dispatch } = useContext(TodoContext);
    useEffect(() => {
        getTodos().then(todos => {
            dispatch({type: 'LOAD_TODOS', todos: todos.data});
        });
    }, []);
    const doneTodos = Array.isArray(state) ? state.filter(todo => todo.done) : [];

    return (
        <div>
            <h2>Completed Todos</h2>
            <div className={"todo-group"}>
                {doneTodos.length === 0 ? (
                    <div>No completed todos.</div>
                ) : (
                    doneTodos.map(({ id, text }) => (
                        <div key={id} className={`todo-item`}><span>{text}</span></div>
                    ))
                )}
            </div>

        </div>
    );
};
export default DoneTodos;