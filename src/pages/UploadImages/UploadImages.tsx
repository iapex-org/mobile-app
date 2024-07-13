import React, { useContext, useState } from 'react';
import { IonButton, IonContent, IonIcon, IonPage, IonText, IonToast } from '@ionic/react';
import { accessibility, camera } from 'ionicons/icons';
import { Camera } from '@capacitor/camera';
import { ImageContext } from '../../contexts/ImageContext';
import { useHistory } from 'react-router-dom';
import styles from './UploadImages.module.css';

const UploadImages: React.FC = () => {
    const { setImages } = useContext(ImageContext);
    const history = useHistory();
    const [errorToast, setErrorToast] = useState<string>('');

    const openGallery = async () => {
        setImages([]);
        console.log('Limpiando imágenes...');

        try {
            const images = await Camera.pickImages({
                quality: 100,
                limit: 12,
                height: 1024,
                width: 768
            });

            console.log('Imágenes seleccionadas', images);

            if (images.photos.length > 0) {
                const imageUrls = images.photos
                    .slice(0, 12)
                    .filter(photo => photo.format && (photo.format.includes('jpeg') || photo.format.includes('png') || photo.format.includes('bmp') || photo.format.includes('tiff') || photo.format.includes('HEIC')))
                    .map(photo => photo.webPath);

                if (imageUrls.length >= 10) {
                    setImages(imageUrls);
                    history.push('/verify-images');
                } else if (imageUrls.length > 0) {
                    setImages(imageUrls);
                    setErrorToast('Debes subir al menos 10 imágenes.');
                } else {
                    setErrorToast('Los archivos seleccionados no son imágenes válidas.');
                }
            } else {
                setErrorToast('No se seleccionaron imágenes para subir.');
            }
        } catch (error) {
            console.error('Error al abrir la galería:', error);
            setErrorToast('Error al abrir la galería. Por favor, intenta nuevamente.');
        }
    };

    return (
        <IonPage>
            <IonContent color={'primary'} className='ion-padding'>
                <IonButton color='light' fill='clear' mode='ios' className='fixed-button' size='large' routerLink='/accessibility-settings'>
                    <IonIcon icon={accessibility} className={styles.accessibilityIcon}></IonIcon>
                </IonButton>

                <IonToast mode='ios'
                    isOpen={!!errorToast}
                    position="top"
                    message={errorToast}
                    duration={3000}
                    onDidDismiss={() => setErrorToast('')}
                    color={'danger'}
                />

                <div className={styles.container}>
                    <IonText>
                        <h1>¡Bienvenido!</h1>
                    </IonText>
                    <IonIcon icon={camera} className={styles.cameraIcon}></IonIcon>
                    <p>¡Bienvenido a 'Encuéntrame'! Sube al menos 10 fotos claras de la persona que estás buscando. Asegúrate de incluir diferentes ángulos y características distintivas. Cada imagen es crucial para encontrar a esa persona. Juntos, podemos lograrlo.</p>
                    <IonButton color={'light'} expand="block" mode='ios' onClick={openGallery} className={styles.whiteText}>Continuar</IonButton>
                </div>

                <img src="src\assets\img\logo-encuentrame.png" alt="Encuéntrame" />
            </IonContent>
        </IonPage>
    );
};

export default UploadImages;
