import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent,
    IonIcon,
    IonPage,
    IonTitle,
    IonToggle,
    IonToolbar,
} from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
import './SearchResults.css';

const SearchResults: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="#" />
                    </IonButtons>
                    <IonTitle>Resultados</IonTitle>
                </IonToolbar>
                <p className="firstText">
                    Las siguientes imágenes pueden ser no aptas para cualquier tipo de público. Se recomienda discreción.
                </p>
                <div className="firstDiv">
                    <IonIcon icon={filterOutline} className="closeIcon" />
                    <h2 className="firstText">Mostrar imagenes</h2>
                    <div className="secondDiv">
                        <IonToggle
                            className="firstToggle"
                            aria-label="Tertiary toggle"
                            color="tertiary"
                            checked={true}
                        />
                    </div>
                </div>

                <IonCard>
                    <img className="firstImg" 
                    src="https://th.bing.com/th/id/R.a9c079398deedb06087f1077192aa5c2?rik=vONGoK7V3tTQpA&pid=ImgRaw&r=0" />
                    <IonCardContent>
                        <p>
                            <strong>Descripción:</strong>
                            Piel morena y el cabello negro, corto y liso. Su rostro muestra una barba de candado crecida, ojos oscuros, nariz ancha y labios carnosos, con mejillas llenas y una mandíbula prominente. Muestra heridas...
                        </p>
                    </IonCardContent>
                    <IonButton className="firstButton" expand="block">
                        Contactar
                    </IonButton>
                </IonCard>
                <IonCard>
                    <img className="firstImg" src="https://th.bing.com/th/id/OIP.nQwKyArPpF6XGHqMAxqsTAHaE4?w=969&h=639&rs=1&pid=ImgDetMain" />
                    <IonCardContent>
                        <p>
                            <strong>Descripción:</strong>
                            Piel morena y cabello negro corto y ondulado. Rostro ancho con pómulos hinchados. Labios muy carnosos, con cortaduras en ellos, cejas ligeramente gruesas y ojos en forma de almendra, de un color...
                        </p>
                    </IonCardContent>
                    <IonButton className="firstButton" expand="block">
                        Contactar
                    </IonButton>
                </IonCard>
                <IonCard>
                    <img className="firstImg" src="https://gmintegratedcare.org.uk/wp-content/uploads/2023/11/230908-nhs-cbwy-or-shot-02-032.jpg" />
                    <IonCardContent>
                        <p>
                            <strong>Descripción:</strong>
                            Piel morena clara y el cabello negro, corto y con orientación hacia la izquierda. Tiene una mandíbula definida, complexión delgada pero atlética. Tiene heridas en la zona de la frente y el ojo...
                        </p>
                    </IonCardContent>
                    <IonButton className="firstButton" expand="block">
                        Contactar
                    </IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default SearchResults;
