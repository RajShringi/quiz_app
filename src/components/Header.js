import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="container mx-auto border-b mb-6">
      <NavLink exact to="/">
        <p className="py-4 font-bold">Home</p>
      </NavLink>
    </div>
  );
}
export default Header;
