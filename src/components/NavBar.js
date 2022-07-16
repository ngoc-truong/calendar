import Login from "./Login";
import { LogoutIcon } from "@heroicons/react/outline";

const NavBar = ({ user, setUser, setOpenNewEventDrawer, background }) => {
  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <div className="font navbar">
      <div className="logo text-xl text-gray-800">
        <div className="flex items-center">
          <img
            className="nav-logo mt-2"
            src={background}
            alt="illustration dancers"
          />
          <span className="ml-1 text-2xl">
            Ca
            {/* <span className="bg-gradient-to-r from-gray-100 to-red-300"> */}
            lindy
            {/* </span> */}
            er
          </span>
        </div>
      </div>{" "}
      <div>
        {user === null && <Login setUser={setUser} />}
        {user !== null && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpenNewEventDrawer(true)}
              className="button"
            >
              Neue Veranstaltung
            </button>
            <LogoutIcon onClick={logout} className="logout" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
