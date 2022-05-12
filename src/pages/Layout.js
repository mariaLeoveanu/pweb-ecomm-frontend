import { Outlet, Link, useNavigate} from "react-router-dom";
import { logout} from "../firebase";
import { OutlinedInput, Button } from "@mui/material";

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
                onClick={() => { logout(); navigate("/login") }}>
                Logout
            </Button>
    </div>

  )
};

export default Layout;