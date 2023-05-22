// Imports
// Font-awesome Icons
import { FaChevronDown } from "react-icons/fa";

// assests
import { avatar, logo } from "../../assets";

const Nav = () => {
  return (
    <nav className="navbar border-b border-gray-100">
      {/* Left Side */}
      <div className="flex-1 flex items-center gap-2">
        <img src={logo} alt="logo" />
        <p>Member State Dashboard</p>
      </div>
      {/* Right Side */}
      <div className="flex-none">
        {/* Language Dropdown */}
        <div className="dropdown mr-6">
          <div className="flex items-center gap-2">
            <div>
              <button className="">EN</button>
            </div>
            <label tabIndex={0} className="">
              <FaChevronDown />
            </label>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu px-4 py-2 shadow gap-2 rounded-md bg-white"
          >
            <li>lang</li>
            <li>lang</li>
          </ul>
        </div>
        {/* User Avatar & Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="flex items-center gap-2">
            <div>Hello, Jamal</div>
            <button className="avatar btn-circle">
              <img src={avatar} />
            </button>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-white"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
