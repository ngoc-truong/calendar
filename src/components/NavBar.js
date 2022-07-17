import Login from "./Login";
import { LogoutIcon } from "@heroicons/react/outline";

const NavBar = ({
  user,
  setUser,
  setNotification,
  setError,
  setOpenNewEventDrawer,
  background,
}) => {
  const logout = () => {
    window.localStorage.removeItem("loggedInUser");
    setNotification("Erfolgreich ausgeloggt, mademoiselle!");
    window.scrollTo(0, 0);
    setTimeout(() => {
      setNotification(null);
    }, 8000);
    setUser(null);
  };

  return (
    <div className="flex place-content-center drop-shadow-2xl bg-white">
      <div className="font navbar  max-w-7xl bg-white">
        <div className="logo text-xl text-gray-800">
          <div className="flex items-center">
            <img
              className="nav-logo mt-2 mb-2"
              src={background}
              alt="illustration dancers"
            />
            <span className="ml-1 text-2xl">
              Ca
              {/* <span className="bg-gradient-to-r from-gray-100 to-red-300"> */}
              lindy
              {/* </span> */}r
            </span>
          </div>
        </div>{" "}
        <div>
          {user === null && (
            <Login
              setUser={setUser}
              setNotification={setNotification}
              setError={setError}
            />
          )}
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
    </div>
  );
};

export default NavBar;
