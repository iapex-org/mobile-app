import { IonButton, IonContent, IonIcon, IonPage, IonText } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import styles from './ProcessCompleted.module.css';

const ProcessCompleted: React.FC = () => {
    return (
        <IonPage>
            <IonContent color={'primary'} className='ion-padding'>
                <div className={styles.container}>
                    <IonText>
                        <h1>¡Lo lograste!</h1>
                    </IonText>
                    <IonIcon icon={checkmarkCircle} className={styles.checkmarkIcon}></IonIcon>
                    <p>Tu solicitud ha sido recibida. Te notificaremos a través de WhatsApp al número proporcionado o por correo electrónico, según los datos que nos proporcionaste. Cada minuto que pasa te acerca más a reunirte con esa persona tan querida.</p>
                    <IonButton color={'light'} expand="block" mode='ios' routerLink='/search-results' className={styles.whiteText}>Volver a la sección de resultados</IonButton>
                </div>

                <img src="src\assets\img\logo-encuentrame.png" alt="Encuéntrame" />
            </IonContent>
        </IonPage>
    );
};

export default ProcessCompleted;
