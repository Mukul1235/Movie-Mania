import React, { useEffect } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hooks";
import Container from "../Container";
const Navbar = () => {
  const { authInfo, handleLogout } = useAuth();
  const { isLoggedIn } = authInfo;
  const { ToggleTheme } = useTheme();
  
  return (
    <div className="bg-secondary shadow-sm shadow-gray-500">
      <Container className="p-2">
        <div className="text-white flex justify-between items-center">
          <Link to="/">
            <img src="./logo.png" className="h-10" />
          </Link>
          <ul className="flex items-center space-x-4">
            <li>
              <button
                onClick={ToggleTheme}
                className="dark:bg-white bg-dark-subtle p-1 rounded">
                <BsFillSunFill className="text-secondary" size={24} />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white"
                placeholder="search..."
              />
            </li>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-white font-semibold text-lg">
                Logout
              </button>
            ) : (
              <Link to="/auth/signin">
                <li className="text-white font-semibold text-lg">login</li>
              </Link>
            )}
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
