import { IonPage, IonContent } from "@ionic/react";
import { FiArrowLeft, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import SocialAuth from "../../components/SocialAuth/SocialAuth";
import "./SignIn.css";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Route } from 'react-router-dom';
import Home from "../Home/Home";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

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
      if (res.status === 201) {
        setAuthorized(true);
      }
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
          <div className="mainTitle">
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
                  required
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
                  required
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
                <SocialAuth icon={<FcGoogle />} title="Entrar com Google" />
                <SocialAuth icon={<FaFacebook />} title="Entrar com Facebook" />
              </div>
            </div>
          </form>
          <footer className="footer">
            <p>Novo usuário? <a href="/register">Casdastre-se</a></p>
          </footer>
        </div>
      </IonContent>
    </IonPage>
  );
}
