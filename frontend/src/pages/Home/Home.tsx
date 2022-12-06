import { IonContent, IonPage } from "@ionic/react";
import axios from "axios";


export default function Home() {
    const handleLogout = () => {
        axios("http://localhost:3000/auth/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
        })
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <button onClick={handleLogout}>Logout</button>
            </IonContent>
        </IonPage>
    )
}