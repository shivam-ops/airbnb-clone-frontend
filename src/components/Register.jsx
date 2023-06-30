import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorFlash from "./ErrorFlash";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseError = () => {
    setErrorMessage("");
  };

  async function registerUser(e) {
    e.preventDefault();

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    if (!name || !email || !password) {
      //alert("Please provide all required fields");
      setErrorMessage("Please provide all required fields");
      return;
    }

    //validate name
    const nameErrors = validateName(name);
    if (nameErrors.length > 0) {
      setErrorMessage("Name validation failed:\n" + nameErrors.join("\n"));
      return;
    }

    //validate email
    const emailErros = validateEmail(email);
    if (emailErros.length > 0) {
      setErrorMessage("Email validation failed:\n" + emailErros.join("\n"));
      return;
    }

    //validate password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setErrorMessage(
        "Password validation failed:\n" + passwordErrors.join("\n")
      );
      return;
    }

    try {
      await axios.post("/register", userData);
      setErrorMessage("Registration successfull. Now you can log in");
      // Reset input fields
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Registeration failed. Please try again later");
    }
  }

  function validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
      errors.push("Must be at least 8 characters long.");
    }

    if (!/[a-zA-Z]/.test(password)) {
      errors.push("Must contain at least one alphabet character.");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Must contain at least one number");
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Must contain at least 1 special char (!@#$%^&*).");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Must contain at least one capital letter.");
    }

    return errors;
  }

  function validateEmail(email) {
    const regex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/;
    const errors = [];

    if (email.length > 325) {
      errors.push("Email address must be less than 326 characters.");
    }

    if (!regex.test(email)) {
      errors.push("Invalid email address format.");
    }

    return errors;
  }

  function validateName(name) {
    const regexKanji = /^[\p{Script_Extensions=Han}]{1,10}$/u;
    const regexKatakana = /^[\p{Script_Extensions=Katakana}ー]{2,20}$/u;
    const regexHiragana = /^[\p{Script_Extensions=Hiragana}ー]{2,20}$/u;
    const regexEnglish = /^[A-Za-z\s]{3,20}$/;
    const errors = [];

    if (regexEnglish.test(name)) {
      if (name.length < 3) {
        errors.push("Name must contain at least 3 English letters.");
      }
    } else if (regexKanji.test(name)) {
      if (name.length < 1 || name.length > 10) {
        errors.push("Name must be between 1 and 10 Kanji characters.");
      }
    } else if (regexHiragana.test(name)) {
      if (name.length < 2 || name.length > 20) {
        errors.push("Name must be between 2 and 20 Hiragana characters.");
      }
    } else if (regexKatakana.test(name)) {
      if (name.length < 2 || name.length > 20) {
        errors.push("Name must be between 2 and 20 Katakana characters.");
      }
    } else {
      errors.push("Name is invalid.");
    }

    return errors;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already have an account?{" "}
            <Link className="underline text-black" to={"/login"}>
              Log in
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
