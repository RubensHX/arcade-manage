import { IonContent, IonPage } from "@ionic/react";
import axios from "axios";
import { Redirect } from "react-router";

type Props = {
    authorized: boolean;
}


export default function Home({ authorized }: Props) {
    if (!authorized) {
        return <Redirect to="/signin" />
    }

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