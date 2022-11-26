import { IonContent, IonPage} from '@ionic/react';
import Welcome from '../Welcome/Welcome';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Welcome />
      </IonContent>
    </IonPage>
  );
};

export default Home;
