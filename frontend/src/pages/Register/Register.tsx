import { IonPage, IonContent } from "@ionic/react";
import { FiArrowLeft, FiMail, FiLock , FiSmartphone, FiUser} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import SocialAuth from "../../components/SocialAuth/SocialAuth";
import "./Register.css";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    await axios("http://192.168.3.6:3000/api/auth/login", {
      method: "POST",
      data: {
        email: email,
        password: password,
      }
    })
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <header className="header">
          <a href="/signin">
            <button className="goBack">
              <FiArrowLeft />
            </button>
          </a>
        </header>
        <div className="container">
          <div className="mainTitleRegister">
            <h1 className="title">Cadastrar</h1>
            <p className="subtitle">Criar conta</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="inputBlock">
              <label className="input" htmlFor="nome">
                <FiUser />
                <input
                  className="inputText"
                  type="text"
                  name="nome"
                  id="nome"
                  placeholder="Nome"
                  required
                  autoComplete="off"
                />
              </label>
            </div>
            <div className="inputBlock">
              <label className="input" htmlFor="telefone">
                <FiSmartphone />
                <input
                  className="inputText"
                  type="tel"
                  name="telefone"
                  id="telefone"
                  placeholder="Telefone"
                  required
                  autoComplete="off"
                />
              </label>
            </div>
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
            <p className="termsofuse">
              Ao se cadastrar você concorda com os termos de Uso
            </p>
            <div className="authButtons">
              <button className="signInButton" type="submit">
                Criar
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
            <p>Já possui um cadastro? <a href="/signin">Entrar</a></p>
          </footer>
        </div>
      </IonContent>
    </IonPage>
  );
}
