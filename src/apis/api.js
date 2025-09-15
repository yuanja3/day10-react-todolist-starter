import axios from "axios";

const instance=axios.create({
    baseURL: 'https://68c78c8d5d8d9f514732227a.mockapi.io/api/', // Replace with your API base URL
});

export const getTodos=async()=>{
    return await instance.get('/todos');
}
export const addTodo=async (todo)=>{
    return await instance.post('/todos',todo);
}
export const deleteTodos=async (id)=>{
    return await instance.delete(`/todos/${id}`);
}
export const updateTodo=async (id,todo)=>{
    return await instance.put(`/todos/${id}`,todo);
}