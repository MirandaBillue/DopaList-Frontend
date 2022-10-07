import { useState } from "react";

function Task(props) {
  const id = props.match.params.id;
  const todo = props.todo;
  const todos = todo.find(p => p._id === id);

  const [ editForm, setEditForm ] = useState(todos);

  // handleChange function for form
  const handleChange = event => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  }

  const handleSubmit = event => {
    event.preventDefault();
    props.updateTodo(editForm);
  }


  return (
    <div className="todos">
      <h1>{todos.name}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="Task"
          onChange={handleChange}
        />
     
        <input type="submit" value="Update todos" />
      </form>
    </div>
  )
}

export default Task;