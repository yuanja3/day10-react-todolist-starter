import './App.css';
import {createBrowserRouter, NavLink, Outlet, RouterProvider, useParams} from "react-router";
import TodoList from "./components/TodoList";
import {initialState, todoReducer} from "./reducers/todoReducer";
import {useReducer} from "react";
import { TodoContext } from "./contexts/TodoContext";
function DefaultLayout() {
    return <>
        <header>
            <nav>
                <ul>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'todos'}>todo list</NavLink></li>
                    <li><NavLink to={'/about'}>About</NavLink></li>
                </ul>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer>
            Footer Copyright
        </footer>
    </>;
}

function TodoPage() {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const value={state, dispatch};
    return <TodoContext.Provider value={value}>
                    <TodoList/>
                </TodoContext.Provider>;
}

function ErrorPage() {
    return <h1>404 - Not Found!</h1>;
}

function TodoDetail() {
    const {id}=useParams();
    console.log(id);
    return <h2>This is : {id} Detail.</h2>;
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
