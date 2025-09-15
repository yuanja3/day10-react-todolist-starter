export const initialState = [
    {id: 1, text: "the first todo", done: false},
    {id: 2, text: "the second todo", done: false},
];

// reducer is a pure function that define and gather all state update logic
export const todoReducer = (state, action) => {

    switch (action.type) {
        case 'Done':
            return state.map(todo =>
                todo.id === action.id ? {...todo, done: !todo.done} : todo
            );
        case 'Add':
            return [
                ...state,
                action.todo
            ];
        case 'Delete':
            return state.filter(todo => todo.id !== action.id);
        case 'LOAD_TODOS':
            return action.todos;
        default:
            return state;

    }

};
