import { IonContent, IonPage } from "@ionic/react";
import axios from "axios";
import "./Home.css";
import { useState, useEffect, useMemo } from 'react';
import {
  Bag,
  ShoppingCartSimple,
  SignOut,
  SquaresFour,
  User,
} from "phosphor-react";
import { format } from "date-fns";
import { getAuth } from 'firebase/auth';
import { app } from "../../config/firebase/firebase";

export default function Home() {
  const [username, setUsername] = useState("");
  const date = new Date();

  const handleLogout = () => {
    axios("http://localhost:3000/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
    sessionStorage.clear();
    window.location.href = "/signin";
  };

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
      setUsername(user.displayName ?? "");
    }
  }, [])

  return (
    <IonPage>
      <IonContent fullscreen>
        <header className="home-page-header">
          <img src="../../assets/Rectangle 2635.png" alt="logo" />
          <p>Olá, {username}</p>
          
          <button onClick={handleLogout}>
            <SignOut size={32} color="#000" />
          </button>
        </header>
        <main className="home-page-main">
          <section className="home-page-my-sales">
            <p>{format(date, "dd/MM/yyyy")}</p>
            <h6>Total de vendas</h6>
            <h6>Quantidade</h6>
            <h3>Minhas vendas</h3>
          </section>
          <section className="home-page-grid">
            <ul>
              <li>
                <a href="/products">
                <Bag size={32} /> Produtos
                </a>
              </li>
              <li>
                <a href="/clients">
                  <User size={32} /> Clientes
                </a>
              </li>
              <li>
                <a href="/sales">
                <ShoppingCartSimple size={32} />
                </a>
                Vendas
              </li>
              <li>
                <a href="/categories">
                <SquaresFour size={32} />
                </a>
                Categorias
              </li>
            </ul>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
}
