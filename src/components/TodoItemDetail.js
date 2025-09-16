import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getTodos } from "../apis/api";

function TodoItemDetail() {
    const { id } = useParams();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log("Fetching details for todo ID:", id);
    useEffect(() => {
        getTodos().then(res => {
            //console.log("Fetched todos:", res.data.find(item => item.id ===  Number(id)));
            const found = res.data.find(item => item.id ===  Number(id));
            setTodo(found);
            setLoading(false);

        }).catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!todo) return <div>Todo not found.</div>;

    return (
        <div>
            <h2>Todo Detail</h2>
            <p><strong>ID:</strong> {todo.id}</p>
            <p><strong>Text:</strong> {todo.text}</p>
            <p><strong>Status:</strong> {todo.done ===1?"Completed" : "Pending"}</p>
        </div>
    );
}

export default TodoItemDetail;
