import { Redirect, Route } from 'react-router-dom';
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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';
import UploadImages from './pages/UploadImages/UploadImages';
import AccessibilitySettings from './pages/AccessibilitySettings/AccessibilitySettings';
import SelectImages from './pages/SelectImages/SelectImages';
import LoadImages from './pages/LoadImages/LoadImages';
import SearchResults from './pages/SearchResults/SearchResults';
import IndividualResult from './pages/IndividualResult/IndividualResult';
import InstitutionInformation from './pages/InstitutionInformation/InstitutionInformation';
import ContactInstitution from './pages/ContactInstitution/ContactInstitution';
import ProcessCompleted from './pages/ProcessCompleted/ProcessCompleted';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/upload-images">
          <UploadImages />
        </Route>
        <Route exact path="/accessibility-settings">
          <AccessibilitySettings />
        </Route>
        <Route exact path="/select-images">
          <SelectImages />
        </Route>
        <Route exact path="/loading-images">
          <LoadImages />
        </Route>
        <Route exact path="/search-results">
          <SearchResults />
        </Route>
        <Route exact path="/individual-result">
          <IndividualResult />
        </Route>
        <Route exact path="/institution-information">
          <InstitutionInformation />
        </Route>
        <Route exact path="/contact-health-institution">
          <ContactInstitution />
        </Route>
        <Route exact path="/process-completed">
          <ProcessCompleted />
        </Route>
        <Route exact path="/">
          <Redirect to="/upload-images" />
        </Route>
        <Route>
          <Redirect to="/upload-images" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
