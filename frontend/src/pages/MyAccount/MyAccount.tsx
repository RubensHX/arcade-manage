import { IonPage, IonContent } from "@ionic/react";
import {FiUser, FiMessageCircle} from "react-icons/fi";
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
            <MainHeader title="Minha Conta" />
        </header>
        <body>
          <div className="container-myaccount">
            <div>
              <img src="../../assets/Rectangle 472.svg" alt="" />
            </div>
            <div className="div-button-block">
              <button className="button">
                <FiUser/> Informações da conta
              </button>
            </div>
            <div className="div-button-block">
              <button className="button">
                <FiMessageCircle/> Ajuda e suporte
              </button>
            </div>
          </div>
        </body>
      </IonContent>
    </IonPage>
  );
}
