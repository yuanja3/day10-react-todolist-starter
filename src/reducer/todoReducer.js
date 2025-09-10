export const initialState = [
  {id: Date.now(), text: "the first todo", done: false},
  {id: Date.now(), text: "the second todo", done: false},
];

// reducer is a pure function that define and gather all state update logic
export const todoReducer = (state, action) => {
  return state;
};