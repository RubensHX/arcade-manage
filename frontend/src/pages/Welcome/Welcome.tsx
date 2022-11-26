import "./Welcome.css";
import { IonPage } from "@ionic/react";

export default function Welcome() {
  return (
    <IonPage>
      <div className="container">
        <div className="heroSection">
          <img src="../../assets/Rectangle 2635.svg" alt="logo" />
          <p className="slogan">
            Seu negócio organizado e na palma de sua mão. Realize vendas rápido
            e ganhe tempo tempo e dinheiro.
          </p>
        </div>
        <div className="bubbleClass">
          <div className="activeBubble"></div>
          <div className="inactiveBubble"></div>
          <div className="inactiveBubble"></div>
        </div>
        <div className="buttonClass">
          <a href="/signin">
            <button className="nextButton">Próximo</button>
          </a>
        </div>
      </div>
    </IonPage>
  );
}
