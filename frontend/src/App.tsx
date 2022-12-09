import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import "./App.css"

/* App components */
import SignIn from './pages/SignIn/SignIn';
import Register from './pages/Register/Register';
import Start from './pages/Start/Start';
import Home from './pages/Home/Home';
import MyAccount from './pages/MyAccount/MyAccount';
import Clients from './pages/Clients/Clients';


setupIonicReact();
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={Start} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/homePage" component={Home} />
        <Route exact path="/myaccount" component={MyAccount} />
        <Route exact path="/clients" component={Clients} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;