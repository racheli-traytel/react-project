import { Link } from "react-router-dom";

export default () => {
  return (
    <nav style={{ display: "flex", gap: "20px" }}>
      <Link to="/recipes" style={{ textDecoration: 'none', color: 'black' }}>Recipes</Link> 
      <Link to="/home" style={{ textDecoration: 'none', color: 'black' }}>home</Link>
    </nav>
  );
};