import { login, logout } from "../services/firebase";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header(props) {
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="/">DopaList</Navbar.Brand>
        <Link to="/todo">
          <div style={{ color: 'white' }}>Todo Lists</div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {
            props.user ?
              <>
                <div style={{ marginRight: 10, color: "white" }}>Welcome, {props.user.displayName}</div>
                <img src={props.user.photoURL} alt="" style={{
                  height: 30,
                  width: 30,
                  borderRadius: '50%',
                  marginRight: 10
                }}
                />
                <div
                  onClick={logout}
                  style={{
                    cursor: 'pointer',
                    marginRight: 10,
                    color: 'white'
                  }}>
                  Logout
                </div>
              </>
              :
              <div
                onClick={login}
                style={{
                  cursor: 'pointer',
                  marginRight: 10,
                  color: "white"
                }}>
                Login
              </div>
          }
        </div>
      </Container>
    </Navbar>

  );
}

export default Header;