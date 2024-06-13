import { IonButton, IonContent, IonImg, IonPage, IonText } from '@ionic/react';
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
                    <span className="material-symbols-outlined">
                        psychology
                    </span>
                    <p>En estos momentos nuestro potente algoritmo está buscando las mejores coincidencias en nuestra base de datos basándose en las fotos que subiste. Por favor, no cierres la aplicación mientras esta pantalla esté activa.</p>
                </div>
                <IonButton color='light' fill='clear' mode='ios' slot="fixed" size='small' routerLink='/search-results'>
                .
                </IonButton>
                <IonImg src="src\assets\img\banner-bottom.png" />
            </IonContent>
        </IonPage>
    );
};

export default LoadingImages;
