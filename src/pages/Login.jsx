import React, { useEffect } from "react";
import "../styles/Login.scss";
import login_video from "../assets/login.mp4";
import google from "../assets/google-icon.svg";
import twitter from "../assets/twitter-icon.svg";
import arrow from "../assets/Arrow.svg";
import { auth, provider, db } from "../config";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    signInWithPopup(auth, provider).then(async (data) => {
      console.log(">>>>>>>> ", data);
      const auth = {
        email: data.user.email,
        name: data.user.displayName,
        uid: data.user.uid,
      };
      localStorage.setItem("auth", JSON.stringify(auth));
      dispatch(login(auth));

      await setDoc(doc(db, "users", data.user.uid), {
        name: data.user.displayName,
        email: data.user.email,
        uid: data.user.uid,
        groups: [],
      });

      navigate("/dashboard");
    });
  };

  useEffect(() => {
    console.log(">>>>>> ", localStorage.getItem("auth"));
  }, []);

  return (
    <div className="login__wrapper">
      <div className="login__container">
        <div className="login">
          <div className="login__left">
            <h3 className="login__text-heading white">Let me in.</h3>
            <h3 className="login__text-heading white">I want my red pill</h3>

            <p className="login__text white">Ref: The Matrix</p>

            <div className="login__btnContainer">
              <button
                className="login__button"
                onClick={() => handleGoogleLogin()}
              >
                <div className="login__button-container">
                  <img src={google} alt="" />
                  <p>Get Started With Google</p>
                </div>

                <img src={arrow} alt="" />
              </button>

              <button className="login__button">
                <div className="login__button-container">
                  <img src={twitter} alt="" />
                  <p>Get Started With Twitter</p>
                </div>

                <img src={arrow} alt="" />
              </button>
            </div>

            <p className="login__text white">
              By signing in, you agree to Pointless Guidelines. Keep chillin out
              here with your design ideas, talks and much more. Still in beta.
            </p>
          </div>
          <div className="login__right">
            <video
              className="login__video"
              autoPlay
              playsInline
              muted={true}
              loop
            >
              <source src={login_video} type="video/mp4"></source>
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
