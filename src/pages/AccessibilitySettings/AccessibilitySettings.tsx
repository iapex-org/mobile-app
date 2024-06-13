import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonRange, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import './AccessibilitySettings.css';
import { arrowBackOutline, contrastOutline, textOutline, volumeMediumOutline, volumeMuteOutline } from 'ionicons/icons';

const AccessibilitySettings: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" className="ion-margin-horizontal">
                        <IonBackButton text="Ajustes de accesibilidad" color="medium" defaultHref="#" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding'>
                <p>Texto</p>
                <IonList mode='ios'>
                    <IonItem mode='ios'>
                        <IonIcon icon={textOutline} slot='start'></IonIcon>
                        <p>Tamaño del texto</p>
                        <IonRange mode='ios'></IonRange>
                    </IonItem>
                    <IonItem mode='ios'>
                        <IonIcon icon={textOutline} slot='start'></IonIcon>
                        <p>Texto en negritas</p>
                        <IonRange mode='ios'></IonRange>
                    </IonItem>
                </IonList>

                <p>Texto de voz</p>
                <IonList>
                    <IonItem mode='ios'>
                        <IonIcon icon={volumeMuteOutline} slot='start'></IonIcon>
                        <p>Texto de voz</p>
                        <IonToggle slot='end' mode='ios'></IonToggle>
                    </IonItem>
                    <IonItem mode='ios'>
                        <IonIcon icon={volumeMediumOutline} slot='start'></IonIcon>
                        <p>Velocidad de lectura</p>
                        <IonRange mode='ios'></IonRange>
                    </IonItem>
                </IonList>

                <p>Modos de alto contraste</p>
                <IonList mode='ios'>
                    <IonItem mode='ios'>
                        <IonIcon icon={contrastOutline} slot='start' mode='ios'></IonIcon>
                        <p>Texto oscuro sobre fondo claro</p>
                        <IonToggle slot='end' mode='ios'></IonToggle>
                    </IonItem>
                    <IonItem mode='ios'>
                        <IonIcon icon={contrastOutline} slot='start' mode='ios'></IonIcon>
                        <p>Texto claro sobre fondo oscuro</p>
                        <IonToggle slot='end' mode='ios'></IonToggle>
                    </IonItem>
                </IonList>

            </IonContent>
        </IonPage>
    );
};

export default AccessibilitySettings;