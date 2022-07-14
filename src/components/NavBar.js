function NavBar({ setOpenNewEventDrawer, background }) {
  return (
    <div className="sticky top-0 z-50 flex justify-between items-center w-full bg-white px-12 shadow-lg">
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
        <button
          onClick={() => alert("Kommt noch! Bis dahin herrscht Anarchie!!")}
          className="m-4 px-4 py-1 rounded font-bold text-sm"
        >
          Login
        </button>
        <button
          onClick={() => setOpenNewEventDrawer(true)}
          className="transition ease-in-out delay-100 bg-blue-700 hover:-translate-x-1 hover:scale-110 hover:bg-indigo-500 duration-300 px-4 py-1 rounded font-bold text-white text-sm"
        >
          Neue Veranstaltung
        </button>
      </div>
    </div>
  );
}

export default NavBar;
