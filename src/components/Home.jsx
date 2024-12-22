import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="home">
      <h2>Welcome to the Home Page!</h2>

      {user ? (
        <div className="user-info">
          <p>Logged in as: {user.email}</p>
          <p>Name: {user.displayName || "N/A"}</p>
          <p>
            <button className="button" onClick={handleLogout}>
              Logout
            </button>
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
