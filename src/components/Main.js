import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom"
import Index from "../pages/Index"
import Home from "../pages/Home";


function Main(props) {
    const [todo, setTodo] = useState(null);

    const URL = "https://dopa-list.herokuapp.com/"

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
                <Route
                    path="/todo"
                    render={(rp) => {
                        if (!props.user) { //firebase user
                            //show a modal or some alert
                            alert("Sorry! You must be Logged in for That")
                            return <Redirect to="/" />
                        } else {
                            return (
                                <Index
                                    todo={todo}
                                    createTodo={createTodo}
                                    updateTodo={updateTodo}
                                    deleteTodo={deleteTodo}
                                    {...rp}
                                />
                            );
                        }
                    }}
                />
            </Switch>
        </main>
    );

}

export default Main;
