import { IonButton, IonContent, IonIcon, IonImg, IonPage, IonText } from '@ionic/react';
import { cog } from 'ionicons/icons';
import './LoadingImages.css';

const LoadingImages: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <IonImg src="src\assets\img\banner-top.png" />
                <div className='container'>
                    <IonText>
                        <h1>Procesando fotos...</h1>
                    </IonText>
                    <IonIcon icon={cog} color='primary' className='cogIcon'></IonIcon>
                    <p>En estos momentos nuestro potente algoritmo está buscando las mejores coincidencias en nuestra base de datos basándose en las fotos que subiste. Por favor, no cierres la aplicación mientras esta pantalla esté activa.</p>
                </div>
                <IonButton color='light' fill='clear' mode='ios' className='fixed-button' size='large' routerLink='/search-results'>
                    .
                </IonButton>
                <IonImg src="src\assets\img\banner-bottom.png" />
            </IonContent>
        </IonPage>
    );
};

export default LoadingImages;
