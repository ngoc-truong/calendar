import { useState } from "react";
import axios from "axios";

const Login = ({ setUser, setError, setNotification }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const loginData = JSON.stringify({ email, password });
    const headers = { headers: { "Content-Type": "application/json" } };

    axios
      .post("http://localhost:3001/login", loginData, headers)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        window.localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data)
        );
        setEmail("");
        setPassword("");
        setNotification("Willkommen, du hast dich erfolgreich eingeloggt.");
        setTimeout(() => {
          setNotification(null);
        }, 8000);
        return response.data;
      })
      .catch((error) => {
        setNotification(
          `Oh mademoiselle, irgendwas ist schief gelaufen: ${error.message}`
        );
        setError(true);
        setTimeout(() => {
          setError(null);
          setNotification(null);
        }, 8000);
        console.log(error);
      });
  };

  return (
    <div>
      <form className="flex gap-4" onSubmit={handleLogin}>
        <div>
          <input
            className="bg-gray-100 rounded py-2 px-4 w-full"
            placeholder="E-Mail"
            type="text"
            value={email}
            name="email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          <input
            className="bg-gray-100 rounded py-2 px-4 w-full"
            placeholder="Passwort"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="button" type="submit">
          Einloggen
        </button>
      </form>
    </div>
  );
};

export default Login;
