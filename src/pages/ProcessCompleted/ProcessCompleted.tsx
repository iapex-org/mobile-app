import { IonButton, IonContent, IonImg, IonPage, IonText } from '@ionic/react';
import './ProcessCompleted.css';

const ProcessCompleted: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <IonImg src="src\assets\img\banner-top.png" />
                <div className='container'>
                    <IonText>
                        <h1>¡Lo lograste!</h1>
                    </IonText>
                    <span className="material-symbols-outlined">
                        check_circle
                    </span>
                    <p>Tu solicitud acaba de ser recibida. Se te notificará a través de WhatsApp al número que nos proporcionaste. Cada minuto que transcurre es un minuto más cerca que estás de ver a esa persona tan querida.</p>
                    <IonButton expand="block" mode='ios' routerLink='/search-results'>Volver a la sección de resultados</IonButton>
                </div>
                <IonImg src="src\assets\img\banner-bottom.png" />
            </IonContent>
        </IonPage>
    );
};

export default ProcessCompleted;
