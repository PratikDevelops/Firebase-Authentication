import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email);
  const passwordIsValid = input.password.length >= 6;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);
      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
     
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Invalid credentials.");
          break;
        case "auth/user-not-found":
          toast.error("No account found with this email address.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          toast.error("The email address is invalid.");
          break;
        default:
          toast.error("An error occurred. Please try again later.");
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
  };

  const handleReset = () => {
    setInput({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="control-row">
          <div className="control no-margin">
            <label htmlFor="email">Email</label>
            <input
              value={input.email}
              onChange={(event) => handleChange(event, "email")}
              id="email"
              type="email"
              name="email"
              required
            />
            {!emailIsValid && input.email && (
              <p>Please enter a valid email address</p>
            )}
          </div>
          <div className="control no-margin">
            <label htmlFor="password">Password</label>
            <input
              value={input.password}
              onChange={(event) => handleChange(event, "password")}
              id="password"
              type="password"
              name="password"
              required
            />
            {input.password && input.password.length < 6 && (
              <p>Password must be at least 6 characters</p>
            )}
          </div>
        </div>

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
      <ToastContainer />
    </div>
  );
}
