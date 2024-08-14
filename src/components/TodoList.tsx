import TodoItem from "./TodoItem";

const TodoList = ({ todoList, onCompleteTodo, onDeleteTodo }) => {
  return (
    <div className="todo-list">
      {todoList.map((todoItem) => {
        return (
          <TodoItem
            key={todoItem.id}
            name={todoItem.name}
            isCompleted={todoItem.isCompleted}
            onCompleteTodo={() => onCompleteTodo(todoItem.id)}
            onDeleteTodo={() => onDeleteTodo(todoItem.id)}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
