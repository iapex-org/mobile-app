import { IonButton, IonContent, IonIcon, IonPage, IonText } from '@ionic/react';
import { checkmarkCircle } from 'ionicons/icons';
import styles from './ProcessCompleted.module.css';
import { useHistory } from 'react-router';
import useTextToSpeechClick from '../../hooks/UseTextToSpeechClick';

const ProcessCompleted: React.FC = () => {
    useTextToSpeechClick();

    const history = useHistory();

    return (
        <IonPage>
            <IonContent color={'primary'} className='ion-padding'>
                <div className={styles.container}>
                    <IonText>
                        <h1>Solicitud enviada</h1>
                    </IonText>
                    <IonIcon icon={checkmarkCircle} className={styles.checkmarkIcon}></IonIcon>
                    <p>
                        Recibirás actualizaciones por celular o correo electrónico.
                        <br /> Estamos comprometidos en ayudarte a reunirte con esa persona.
                    </p>
                    <IonButton
                        color={'light'}
                        expand="block"
                        mode='ios'
                        onClick={() => history.replace(`/search-results`)}
                        className={styles.whiteText}
                    >
                        Volver a resultados
                    </IonButton>
                </div>
                <img src="src\assets\img\logo-encuentrame.png" alt='Logotipo de "Encuéntrame"' />
            </IonContent>
        </IonPage>
    );
};

export default ProcessCompleted;
