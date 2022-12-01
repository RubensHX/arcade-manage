import { IonContent, IonPage } from "@ionic/react";
import { Redirect } from "react-router";

type Props = {
    authorized: boolean;
}


export default function Home({ authorized }: Props) {
    if (!authorized) {
        return <Redirect to="/signin" />
    }
    return (
        <IonPage>
            <IonContent fullscreen>

            </IonContent>
        </IonPage>
    )
}