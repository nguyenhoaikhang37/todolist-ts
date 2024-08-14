import { useRef, useState } from "react";
import { defaultTodoList, filterTodoOptions } from "./constants";
import TodoList from "./components/TodoList";

export default function App() {
  // TODO 8: Sau khi có state `status`, tạo 1 biến tên `filteredTodoList` để filter lại todoList với status tương ứng
  // Sau đó bỏ vào prop data của `TodoList` là `filteredTodoList`

  const [todoList, setTodoList] = useState(defaultTodoList);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("all");
  console.log("✅ ~ status:::", status);

  const filteredTodoList = todoList.filter((todo) => {
    if (status === "all") return true;
    if (status === "completed") return todo.isCompleted;
    if (status === "incomplete") return !todo.isCompleted;
  });

  const inputRef = useRef(null);

  const handleSearchTextChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      name: searchText,
      isCompleted: false,
    };

    setTodoList([newTodo, ...todoList]);
    setSearchText("");
    inputRef.current.focus();
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatus(value);
  };

  const handleCompleteTodo = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      } else return todo;
    });
    setTodoList(newTodoList);
  };

  const handleDeleteTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <>
      <header>
        <h1>My To Do List</h1>
      </header>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          className="todo-input"
          ref={inputRef}
          value={searchText}
          onChange={handleSearchTextChange}
        />
        <button className="todo-button" type="submit">
          <i className="fas fa-plus-circle fa-lg" />
        </button>
        <div className="select">
          <select
            name="todos"
            className="filter-todo"
            onChange={handleStatusChange}
          >
            {filterTodoOptions.map((todoOption) => {
              return (
                <option key={todoOption.value} value={todoOption.value}>
                  {todoOption.label}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <div className="todo-container">
        <TodoList
          todoList={filteredTodoList}
          onCompleteTodo={handleCompleteTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
    </>
  );
}
