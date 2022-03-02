import { useReducer, useState } from "react";
import "./styles.css";
import reducer, { ADD_TODO, REMOVE_TODO, COMPLETE_TODO } from "./store/reducer";

export default function App() {
  const [id, setId] = useState(0);
  const [text, setText] = useState("");
  const initialState = [
    {
      id: id,
      text: "First Item",
      completed: false
    }
  ];

  //We could also pass an empty array as the initial state
  //const initialState = []
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const addTodoItem = (e) => {
    e.preventDefault();
    const newId = id + 1;
    setId(newId);
    dispatch({
      type: ADD_TODO,
      id: newId,
      text: text
    });
    setText("");
  };
  const removeTodo = (id) => {
    dispatch({ type: REMOVE_TODO, id });
  };
  const completeTodo = (id) => {
    dispatch({ type: COMPLETE_TODO, id });
  };
  return (
    <div className="App">
      <h1>Todo Example</h1>
      <form className="input" onSubmit={addTodoItem}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button disabled={text.length === 0} type="submit">+</button>
      </form>
      <div className="todos">
        {state.map((todo) => (
          <div key={todo.id} className="todoItem">
            <p className={todo.completed && "strikethrough"}>{todo.text}</p>
            <span onClick={() => removeTodo(todo.id)}>✕</span>
            <span onClick={() => completeTodo(todo.id)}>✓</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// useMemo is a hook that allows us to memoize expensive computations
// useCallback is a hook that allows us to memoize expensive functions
// const memoResult = useMemo(() => a + b, [a, b])
// const callbackResult = useCallback(a + b, [a, b])
// const callbackResult = useCallback(() => a + b, [a, b])
//   useEffect(() => {
//     const callback = callbackResult()
//     console.log(callback)   
//   })