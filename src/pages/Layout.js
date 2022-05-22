import { Outlet, Link, useNavigate} from "react-router-dom";
import { logout} from "../firebase";
import { OutlinedInput, Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";


const Layout = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

        </ul>
      </nav>
      <Button
                variant="outlined"
                onClick={() => { signOut(auth).then( navigate("/login") )}}>
                Logout
            </Button>
    </div>

  )
};

export default Layout;