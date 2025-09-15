import './App.css';
import {createBrowserRouter, RouterProvider, useParams} from "react-router";
import TodoList from "./components/TodoList";
import {initialState, todoReducer} from "./reducers/todoReducer";
import React, {useReducer} from "react";
import {TodoContext} from "./contexts/TodoContext";
import {DefaultLayout} from "./layout/DefaultLayout";
import TodoItemDetail from "./components/TodoItemDetail";
import DoneTodos from "./components/DoneTodos";

function TodoPage() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const value={state, dispatch};
    return <TodoContext.Provider value={value}>
                    <TodoList/>

                </TodoContext.Provider>;
}
function DonePage() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const value={state, dispatch};
    return <TodoContext.Provider value={value}>
        <DoneTodos/>

    </TodoContext.Provider>;
}
function ErrorPage() {
    return <h1>404 - Not Found!</h1>;
}

function TodoDetail() {
    const {id}=useParams();
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const value={state, dispatch};
    return <TodoContext.Provider value={value}>
        <TodoItemDetail/>

    </TodoContext.Provider>;
    /*console.log(id);
    return <h2>This is : {id} Detail.</h2>;*/
}

const routes = [
    {
        path: '/',
        element: <DefaultLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: ' ',
                element: <h1>Home Page</h1>
            },{
                path: 'todos',
                element:<TodoPage/>,

            },
            {
                path: 'todos/:id',
                element:<TodoDetail/>
            },
            {
                path: 'about',
                element: <h1>About Us</h1>
            },{
            path: 'done',
                element: <DonePage/>
            }
        ]
    }
]
const router = createBrowserRouter(routes);
function App() {
    // the Hooks API manage component data state



    return (
        <div className="App">
            <RouterProvider router={router}> </RouterProvider>
            {/*<DefaultLayout/>*/}

        </div>
    );
}

export default App;
