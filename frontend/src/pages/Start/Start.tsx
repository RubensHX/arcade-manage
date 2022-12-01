import { IonContent, IonPage} from '@ionic/react';
import Welcome from '../Welcome/Welcome';
import './Start.css';

const Start: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Welcome />
      </IonContent>
    </IonPage>
  );
};

export default Start;
