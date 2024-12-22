import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function reset() {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    // Field-wise validation
    if (!firstName) {
      toast.error("First name is required!");
      return;
    }

    if (!lastName) {
      toast.error("Last name is required!");
      return;
    }

    if (!email) {
      toast.error("Email is required!");
      return;
    }

    if (!password) {
      toast.error("Password is required!");
      return;
    }

    if (!confirmPassword) {
      toast.error("Please confirm your password!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        });
      }

      toast.success("Signup successful! 🎉");
      reset();
    } catch (error) {
      // Map Firebase error codes to user-friendly messages
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already in use!");
          break;
        case "auth/invalid-email":
          toast.error("The email address is invalid!");
          break;
        case "auth/weak-password":
          toast.error("The password is too weak!");
          break;
        default:
          toast.error("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleRegister}>
        <h2>Welcome on board!</h2>
        <p>We just need a little bit of data from you to get you started 🚀</p>

        <div className="control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="control-row">
          <div className="control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <hr />
        <div className="control-row">
          <div className="control">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="control">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <p className="form-actions">
          <button type="button" className="button button-flat" onClick={reset}>
            Reset
          </button>
          <button type="submit" className="button">
            Sign up
          </button>
        </p>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span style={{ color: "red" }}>Login here</span>
          </Link>
        </p>
      </form>
    </>
  );
}
