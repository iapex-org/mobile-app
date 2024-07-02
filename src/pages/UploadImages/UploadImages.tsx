import { IonButton, IonContent, IonIcon, IonImg, IonPage, IonText } from '@ionic/react';
import { accessibility, camera } from 'ionicons/icons';
import './UploadImages.css';

const UploadImages: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <IonImg src="src\assets\img\banner-top.png" />
                <div className='container'>
                    <IonText>
                        <h1>¡Bienvenido!</h1>
                    </IonText>
                    <IonIcon icon={camera} color='primary' className='cameraIcon'></IonIcon>
                    <p>¡Bienvenido a 'Encuéntrame'! Sube al menos 10 fotos claras de la persona que estás buscando. Asegúrate de incluir diferentes ángulos y características distintivas. Cada imagen es crucial para encontrar a esa persona. Juntos, podemos lograrlo.</p>
                    <IonButton expand="block" mode='ios' routerLink='/verify-images'>Continuar</IonButton>
                </div>
                <IonButton color='light' fill='clear' mode='ios' className='fixed-button' size='large' routerLink='/accessibility-settings'>
                    <IonIcon icon={accessibility} className='accessibilityIcon'></IonIcon>
                </IonButton>
                <IonImg src="src\assets\img\banner-bottom.png" />
            </IonContent>
        </IonPage>
    );
};

export default UploadImages;
