import './App.css';
import {createBrowserRouter, NavLink, Outlet, RouterProvider} from "react-router";

function DefaultLayout() {
    return <>
        <header>
            <nav>
                <ul>
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li>todo list</li>
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

const routes = [
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: ' ',
                element: <h1>Home Page</h1>
            }, {
                path: 'about',
                element: <h1>About Us</h1>
            }
        ]
    }
]
const router = createBrowserRouter(routes);
function App() {
    // the Hooks API manage component data state

    //const [state, dispatch] = useReducer(todoReducer, initialState);
    //const value={state, dispatch};

    return (
        <div className="App">
            <RouterProvider router={router}> </RouterProvider>
            {/*<DefaultLayout/>*/}
            {/*<TodoContext.Provider value={value}>*/}
            {/*  <TodoList/>*/}
            {/*</TodoContext.Provider>*/}
        </div>
    );
}

export default App;
