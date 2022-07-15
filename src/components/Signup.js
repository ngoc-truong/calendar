import { useState } from "react";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const loginData = JSON.stringify({ email, password });
    const headers = { headers: { "Content-Type": "application/json" } };

    axios
      .post("http://localhost:3001/users", loginData, headers)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // fetch("http://localhost:3001/users", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  };

  return (
    <div>
      <h1>Registrieren</h1>
      <form onSubmit={handleLogin}>
        <div>
          Email
          <input
            type="text"
            value={email}
            name="email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          Passwort
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="login-btn" type="submit">
          Registrieren
        </button>
      </form>
    </div>
  );
};

export default Signup;
