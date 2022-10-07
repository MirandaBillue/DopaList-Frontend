import { useState } from "react";


function Index (props) {
  const [ newForm, setNewForm ] = useState({
    name: "",
  });

  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.createTodo(newForm);
    setNewForm({
      name: "",
    });
  };

  const removeTodo = (todos) => {
    props.deleteTodo(todos._id);
  }

const loaded = () => {
    return props.todo.map((todos) => (
      <div key={todos._id} className="todos">
       <li className="todolist">{todos.name}</li>
       <button 
       onClick={()=> 
       {removeTodo(todos)}}
        >Completed</button>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };


  return (
    <section>
        <h1 className="listfont">Todo List</h1>
        <div className="todoform">
      <form onSubmit={handleSubmit}>
        <input
          type="textarea"
          value={newForm.name}
          name="name"
          placeholder="What We Gotta Do?!"
          onChange={handleChange}
        />
        <button type="submit" 
        >Add Todo</button>
      </form> 
      {props.todo ? loaded() : loading()}     
      </div>
    </section>
  );
}


export default Index;

