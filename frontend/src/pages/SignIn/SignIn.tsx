import { IonPage, IonContent } from "@ionic/react";
import { FiArrowLeft, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import SocialAuth from "../../components/SocialAuth/SocialAuth";
import "./SignIn.css";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

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
              <button className="signInButton" type="submit">
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
        </div>
      </IonContent>
    </IonPage>
  );
}
