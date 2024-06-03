import { Link } from 'react-router-dom'

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    <Link to="/cart">Cart</Link>
    <input type="text" placeholder="Search..." />
  </nav>
)

export default Navbar