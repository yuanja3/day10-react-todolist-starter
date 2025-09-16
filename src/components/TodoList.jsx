import {useContext, useEffect, useState} from "react";
import {TodoContext} from "../contexts/TodoContext";
import '../TodoList.css';
import {Button, message, Modal} from 'antd';
import { Message } from "antd";
import { Input ,Space } from 'antd';
import {getTodos, addTodo, deleteTodos, updateTodo} from "../apis/api";
import TextArea from "antd/es/input/TextArea";
import {DeleteOutlined, EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
const TodoList = () => {
  const {state, dispatch} = useContext(TodoContext);
    const [input, setInput] = useState("");
    /*function toggleDone(id) {
        dispatch({type: 'Done', id:id});
    }*/
    const toggleDone=async(id)=>{
        const todo=state.find(t=>t.id===id);
        const updatedTodo={...todo,done:1-todo.done};
        updateTodo(id,updatedTodo).then(response=>{
            console.log(response.data);
            dispatch({type:'Done',id:id});
            message.success('Todo status updated successfully');
        });
    }
    const updateTodoText=async(id,text)=>{
        const todo=state.find(t=>t.id===id);
        const updatedTodo={...todo,text:text};
        updateTodo(id,updatedTodo).then(response=>{
            console.log(response.data);
            dispatch({type:'Update',id:id,text:text});
            message.success('Todo updated successfully');
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
            message.success('Todo deleted successfully');
        });
    }
    const handleAddTodo=async ()=>{
        const todo={text:input,done:false};
        addTodo(todo).then(response=>{
            console.log(response.data);
            dispatch({type:'Add',todo:response.data});
            message.success('Todo added successfully');
        });
        setInput("");

    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");
    const showModal = (id,text) => {
        setEditingId(id);
        setEditingText(text);
        setIsModalOpen(true);
    };
    const handleOk = () => {

        updateTodoText(editingId, editingText);
        setIsModalOpen(false);
        setEditingId(null);
        setEditingText("");
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        getTodos().then(todos => {
           dispatch({type: 'LOAD_TODOS', todos: todos.data});
        });
    }, []);
    return (
        <div >
            <div>Todo List</div>
            <div className={"todo-group"} >
            {state.length === 0 && (
                <div className="todo-desc">Add the things you need to do today...</div>
            )}

            {state.map(({text, done, id}) => (
                <div key={id} className={`todo-item ${done ? 'done' : ''}`}>
                    <span onClick={() => toggleDone(id)}>{text}</span>
                    <Button onClick={() => showModal(id, text)}>
                        <EditOutlined/>
                    </Button>
                    <Modal

                        closable={{'aria-label': 'Custom Close Button'}}
                        title="Edit Todo"
                        open={isModalOpen && editingId === id}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <TextArea
                            value={editingText}
                            onChange={e => setEditingText(e.target.value)}
                        />
                    </Modal>
                    <Button onClick={() => deleteTodo(id)}><DeleteOutlined/></Button>
                </div>
            ))}

            </div>
            <div style={{marginTop: '20px'}}>
            <Space.Compact style={{width: '70%'}}>
                <Input placeholder="Add new todo" value={input} onChange={e => setInput(e.target.value)}/>
                <Button type="primary" onClick={handleAddTodo}><PlusCircleOutlined/></Button>
                <Button type="default" onClick={()=>window.location.href='/done'}>

                    View Completed Todos
                </Button>
            </Space.Compact>

            </div>


        </div>


    );
}

export default TodoList