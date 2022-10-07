import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom"
import Index from "../pages/Index"
import Home from "../pages/Home";
import About from "../pages/About"
import Task from "../pages/Task";
import MyCalendar from "../pages/Calendar";

function Main(props) {
    const [todo, setTodo] = useState(null);

    // const URL = "http://localhost:4000/todo/";
    const URL = "https://dopa-list.herokuapp.com/";


    const getTodo = async (uid) => {
        const url = uid ? URL + '?uid=' + uid : URL
        const response = await fetch(url);
        const data = await response.json();
        setTodo(data);
    };

    const createTodo = async (todos) => {
        const token = await props.user.getIdToken();
        // make post request to create todo
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(todos),
        });
        // update list of todo
        getTodo();
    };

    const updateTodo = async (todos, id) => {
        const token = await props.user.getIdToken();
        // make put request to create todo
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(todos),
        });
        // update list of todo
        getTodo(props.user.uid);
    }

    const deleteTodo = async (id) => {
        const token = await props.user.getIdToken();
        // make delete request to create todo
        await fetch(URL + id, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        // update list of todo
        getTodo(props.user.uid);
    }

    useEffect(() => {
        if (props.user) {
            getTodo(props.user.uid);
        } else {
            getTodo();
        }
    }, [props.user]);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>   
                <Route path="/todo">
                    <Index 
                    todo={todo} 
                    createTodo={createTodo}
                    deleteTodo={deleteTodo} 
                    />
                </Route>
                <Route
                    path="/todo/:id"
                    render={(rp) => {
                        return (
                            <Task
                            todo={todo}
                                updateTodo={updateTodo}
                                deleteTodo={deleteTodo}
                                {...rp}
                            />
                        )
                    }}
                />
                <Route path="/calendar">
                    <MyCalendar />
                    </Route>          
            </Switch>
        </main>
    );
}

export default Main;
