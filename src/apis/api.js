import axios from "axios";

const instance=axios.create({
    baseURL: 'http://localhost:8080', // Replace with your API base URL
});

instance.interceptors.request.use(config=>{
    // You can add headers here if needed
    console.log('Request Success:',config);
    config.metadata = {
        startTime: Date.now()
    }
    return config;
},error=>{
    return Promise.reject(error);
});
instance.interceptors.response.use(response=>{
    console.log('Response Successs:',response);
    console.log('Api duration is : ' + (Date.now() - response.config.metadata.startTime) +'ms')
    return response;
},error=>{
    const {status,data}=error.response;
    console.log('Response Error:',status,data);
    if(status===401){
        alert(`Response Error ${status} ${data}`)
        console.log(error.response)
        // Handle unauthorized access, e.g., redirect to login
    } else if (status===403){
        alert(`Response Error ${status} ${data}`)
        console.log(error.response)
        // Handle forbidden access
    }else if (status===404){
        alert(`Response Error ${status} ${data}`)
        console.log(error.response)
        // Handle resource not found
    }
    else if (status>=500){
        alert(`Response Error ${status} ${data}`)
        console.log(error.response)
        // Handle server errors
    }
    return Promise.reject(error);
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