import { IonPage, IonContent } from "@ionic/react";
import {FiUser, FiMessageCircle, FiChevronRight} from "react-icons/fi";
import MainHeader from "../../components/MainHeader/MainHeader";
import "./MyAccount.css";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function MyAccount() {
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
        <header>
            <MainHeader title="Minha Conta" href="/signin" />
        </header>
        <body>
          <div className="container-myaccount">
            <div className="img-myaccount">
              <img src="../../assets/Rectangle 472.svg" alt="" />
            </div>
            <div className="div-button-block">
              <a href="">
                <button className="button-myaccount">
                  <FiUser/> Informações da conta <FiChevronRight/>
                </button>
              </a>
            </div>
            <div className="div-button-block">
              <button className="button-myaccount">
                <FiMessageCircle/> Ajuda e suporte <FiChevronRight/>
              </button>
            </div>
          </div>
          <footer className="footer">
            <div className="footer-myaccount">
              <a className="teste" href="/signin">Sair da conta</a>
              <p className="version">v.1.0.0</p>
            </div>
          </footer>
        </body>
      </IonContent>
    </IonPage>
  );
}
