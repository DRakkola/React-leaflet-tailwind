import {
  useFiefAuth,
  useFiefIsAuthenticated,
  useFiefUserinfo,
} from "@fief/fief/react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import {
  LockClosedIcon,
  LockOpen1Icon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

const Header = () => {
  const fiefAuth = useFiefAuth();
  const isAuthenticated = useFiefIsAuthenticated();
  const userinfo = useFiefUserinfo();

  const login = useCallback(() => {
    fiefAuth.redirectToLogin(
      `${window.location.protocol}//${window.location.host}/callback`
    );
  }, [fiefAuth]);

  const logout = useCallback(() => {
    fiefAuth.logout(`${window.location.protocol}//${window.location.host}`);
  }, [fiefAuth]);

  return (
    <ul className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <li>
        <Link to="/" className="flex items-center gap-2 hover:text-gray-300">
          <HomeIcon />
          Public page
        </Link>
      </li>
      <li>
        <Link
          to="/private"
          className="flex items-center gap-2 hover:text-gray-300"
        >
          <LockClosedIcon />
          Private page
        </Link>
      </li>
      <li>
        {!isAuthenticated && (
          <button
            type="button"
            onClick={() => login()}
            className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LockOpen1Icon />
            Login
          </button>
        )}
        {isAuthenticated && userinfo && (
          <div className="flex items-center gap-2">
            <PersonIcon />
            <span>{userinfo.email}</span>
            <button
              type="button"
              onClick={() => logout()}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </li>
    </ul>
  );
};

export default Header;
