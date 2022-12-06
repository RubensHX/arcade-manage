import { IonPage, IonContent } from "@ionic/react";
import { FiArrowLeft, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import SocialAuth from "../../components/SocialAuth/SocialAuth";
import "./SignIn.css";
import { FormEvent, useState } from "react";
import axios from "axios";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { app } from "../../config/firebase/firebase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User>();
  const form = document.querySelector("form");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await axios("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      data: {
        email: email,
        password: password,
      },
    }).then((res) => {
      setUser(res.data);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", user?.refreshToken ?? "");
    });
  };

  const handleGoogleAuth = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        sessionStorage.setItem("@AuthFirebase:token", token ?? "");
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleFacebookAuth = () => {
    const auth = getAuth(app);
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        sessionStorage.setItem("@AuthFirebase:token", token ?? "");
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <header className="header">
          <a href="/home">
            <button className="goBack">
              <FiArrowLeft />
            </button>
          </a>
        </header>
        <div className="container">
          <div className="mainTitle-signin">
            <h1 className="title">Entrar</h1>
            <p className="subtitle">Bem-vindo</p>
          </div>
          <form>
            <div className="inputBlock">
              <label className="input" htmlFor="email">
                <FiMail />
                <input
                  className="inputText"
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  autoComplete="off"
                />
              </label>
            </div>
            <div className="inputBlock">
              <label className="input" htmlFor="password">
                <FiLock />
                <input
                  className="inputText"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                />
              </label>
            </div>
            <a href="/resetPassword" className="passwrdReset">
              Esqueceu sua senha?
            </a>
            <div className="authButtons">
              <button className="signInButton" onClick={handleLogin}>
                Entrar
              </button>
              <div className="optional">
                <div className="line"></div>
                <p>ou</p>
                <div className="line"></div>
              </div>
              <div className="socialAuth">
                <SocialAuth
                  icon={<FcGoogle />}
                  title="Entrar com Google"
                  action={handleGoogleAuth}
                />
                <SocialAuth
                  icon={<FaFacebook />}
                  title="Entrar com Facebook"
                  action={handleFacebookAuth}
                />
              </div>
            </div>
          </form>
          <footer className="footer">
            <p>
              Novo usuário? <a href="/register">Casdastre-se</a>
            </p>
          </footer>
        </div>
      </IonContent>
    </IonPage>
  );
}
