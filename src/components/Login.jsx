import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import ErrorFlash from "./ErrorFlash";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseError = () => {
    setErrorMessage("");
  };

  async function userLogin(e) {
    e.preventDefault();

    const userData = { email: email, password: password };

    if (!email || !password) {
      setErrorMessage("Please provide all required fields");
      return;
    }
    try {
      const { data } = await axios.post("/login", userData);
      console.log(data);
      setRedirect(true);
      // Reset input fields
      // setEmail("");
      // setPassword("");
      setUser(data);
      setErrorMessage("Login successful");
    } catch (error) {
      setErrorMessage(error.response.data.detail);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={userLogin}>
          <input
            type="email"
            placeholder={"your@email.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don&apos;t have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
      {errorMessage && (
        <ErrorFlash message={errorMessage} onClose={handleCloseError} />
      )}
    </div>
  );
}
