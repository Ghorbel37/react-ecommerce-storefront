import { NavLink } from "react-router";
import shopLogo from "../../assets/logo.png";

export default function HomeIcon() {
  return (
    <NavLink to="/" className="shrink-0 hover:text-stone-300 transition-colors" aria-label="Home">
      <img src={shopLogo} alt="Shop logo" className="hover:opacity-75 transition-opacity" />
    </NavLink>
  );
}
