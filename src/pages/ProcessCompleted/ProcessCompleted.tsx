import { IonButton, IonContent, IonIcon, IonPage, IonText } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import styles from './ProcessCompleted.module.css';

const ProcessCompleted: React.FC = () => {
    return (
        <IonPage>
            <IonContent color={'primary'} className='ion-padding'>
                <div className={styles.container}>
                    <IonText>
                        <h1>Solicitud recibida</h1>
                    </IonText>
                    <IonIcon icon={checkmarkCircle} className={styles.checkmarkIcon}></IonIcon>
                    <p>
                        Tu solicitud ha sido registrada. Recibirás actualizaciones a través de WhatsApp o por correo electrónico, según la información que proporcionaste. Estamos comprometidos en ayudarte a reunirte con esa persona importante para ti.
                    </p>
                    <IonButton
                        color={'light'}
                        expand="block"
                        mode='ios'
                        routerLink='/search-results'
                        className={styles.whiteText}
                    >
                        Volver a resultados
                    </IonButton>
                </div>
                <img src="src\assets\img\logo-encuentrame.png" alt="Encuéntrame" />
            </IonContent>
        </IonPage>
    );
};

export default ProcessCompleted;
