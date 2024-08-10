import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { RotateLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUP: false,
  });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password);
      setLoading({ ...loading, signUP: true })
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUP: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUP: false });
        });
    }
  };

  // console.log(password, email);
  return (
    <section className={classes.login}>
      {/* {logo} */}
      <Link to={"/"}>
        <img
          src="https://th.bing.com/th?id=OIP.bvZGKlD5OFiiOJNNfo5YwAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
          alt=""
        />
      </Link>
      {/* {form} */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData.state.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            {loading.signIn ? (
              <RotateLoader color="#000000" size={20} />
            ) : (
              "Sing In"
            )}
          </button>
        </form>
        {/* {agreement} */}
        <p>
          By signign-in you agree to the AMAZON FAKE CLONE Condition of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Notice.
        </p>
        {/* {create account btn} */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.login_registerButton}
        >
          {loading.signUP ? (
            <RotateLoader color="#000000" size={20} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
