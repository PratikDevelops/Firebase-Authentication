import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [edit, setEdit] = useState({
    email: false,
    password: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email);
  const passwordIsValid = input.password.length >= 6;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);
      navigate("/home");
    } catch (error) {
      console.error(error.message);
      if (error.code === "auth/invalid-credential") {
        setErrorMessage("Invalid credentials.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("User not found. Please check your email.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e, identifier) => {
    setInput((prev) => ({
      ...prev,
      [identifier]: e.target.value,
    }));
    setEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const handleBlur = (identifier) => {
    setEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const handleReset = () => {
    setInput({
      email: "",
      password: "",
    });
    setEdit({
      email: false,
      password: false,
    });
    setErrorMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            value={input.email}
            onChange={(event) => handleChange(event, "email")}
            onBlur={() => handleBlur("email")}
            id="email"
            type="email"
            name="email"
            aria-describedby="email-error"
            required
          />
          <div id="email-error" className="control-error" aria-live="polite">
            {input.email && !emailIsValid && (
              <p>Please enter a valid email address</p>
            )}
          </div>
        </div>
        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            value={input.password}
            onChange={(event) => handleChange(event, "password")}
            onBlur={() => handleBlur("password")}
            id="password"
            type="password"
            name="password"
            aria-describedby="password-error"
            required
          />
          <div id="password-error" className="control-error" aria-live="polite">
            {input.password && input.password.length < 6 && (
              <p>Password must be at least 6 characters</p>
            )}
          </div>
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="form-actions">
        <button
          type="button"
          className="button button-flat"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="submit"
          className="button"
          disabled={!emailIsValid || !passwordIsValid || isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
