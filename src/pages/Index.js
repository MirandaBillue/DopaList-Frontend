import { useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'


function Index(props) {
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
  
const loaded = () => {
    return props.todo.map((todos) => (
      <div key={todos._id} className="todos"><ul>
        <li className="todolist">{todos.name}</li>
        <button key={todos.id} onClick={()=> this.props.removeTodos(todos._id)}>x</button>
        </ul>  
      </div>
    ));
  };

  const loading = () => {
    return <h1>Looking for Lists...</h1>;
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
      
      <Calendar />
    </section>
  );
}


export default Index;
