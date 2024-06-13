import { IonButton, IonContent, IonImg, IonPage, IonText } from '@ionic/react';
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
                    <span className="material-symbols-outlined">
                        add_a_photo
                    </span>
                    <p>¡Bienvenido a 'Encuéntrame'! Sube al menos 10 fotos claras de la persona que estás buscando. Asegúrate de incluir diferentes ángulos y características distintivas. Cada imagen es crucial para encontrar a esa persona. Juntos, podemos lograrlo.</p>
                    <IonButton expand="block" mode='ios' routerLink='/select-images'>Continuar</IonButton>
                </div>
                <IonButton color='light' fill='clear' mode='ios' slot="fixed" size='large' routerLink='/accessibility-settings'>
                    <span className="material-symbols-outlined accessibility-icon">
                        accessibility
                    </span>
                </IonButton>
                <IonImg src="src\assets\img\banner-bottom.png" />
            </IonContent>
        </IonPage>
    );
};

export default UploadImages;
