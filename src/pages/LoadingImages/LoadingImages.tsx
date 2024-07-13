import { IonContent, IonIcon, IonPage, IonText } from '@ionic/react';
import { cog } from 'ionicons/icons';
import styles from './LoadingImages.module.css';

const LoadingImages: React.FC = () => {
    return (
        <IonPage>
            <IonContent color={'primary'} className='ion-padding'>
                <div className={styles.container}>
                    <IonText>
                        <h1>Procesando fotos...</h1>
                    </IonText>
                    <IonIcon icon={cog} className={styles.cogIcon}></IonIcon>
                    <p>En estos momentos nuestro potente algoritmo está buscando las mejores coincidencias en nuestra base de datos basándose en las fotos que subiste. Por favor, no cierres la aplicación mientras esta pantalla esté activa.</p>
                </div>

                <img src="src\assets\img\logo-encuentrame.png" alt="Encuéntrame" />
            </IonContent>
        </IonPage>
    );
};

export default LoadingImages;
