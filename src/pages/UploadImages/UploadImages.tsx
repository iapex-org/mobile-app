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
  const [sizeExceeded, setSizeExceeded] = useState<boolean>(false);

  const openGallery = async () => {
    setImages([]);
    setSizeExceeded(false); // Reseteamos el flag al iniciar la función
    console.log('Limpiando imágenes...');
    console.log('Limpiando variable de tamaño excedido...', sizeExceeded);

    try {
      const images = await Camera.pickImages({
        quality: 100,
        limit: 12,
        height: 4080,
        width: 4080,
      });

      console.log('Imágenes seleccionadas:', images);

      if (images.photos.length > 12) {
        // Mostrar error si se seleccionan más de 12 imágenes
        setErrorToast('Solo puedes seleccionar un máximo de 12 imágenes.');
        return;
      }

      if (images.photos.length > 0) {
        // Variable temporal para verificar si alguna imagen excede el tamaño o dimensiones
        let hasExceeded = false;

        const imageUrls = await Promise.all(
          images.photos
            .slice(0, 12)
            .filter((photo) =>
              photo.format &&
              (photo.format.includes('jpeg') ||
                photo.format.includes('jpg') ||
                photo.format.includes('png') ||
                photo.format.includes('bmp') ||
                photo.format.includes('tiff') ||
                photo.format.includes('HEIC'))
            )
            .map(async (photo) => {
              try {
                console.log('Validando imagen:', photo.webPath);

                // Obtener la imagen para verificar su tamaño
                const response = await fetch(photo.webPath);
                const blob = await response.blob();

                // Crear un objeto de imagen para obtener las dimensiones
                const img = new Image();
                img.src = URL.createObjectURL(blob);

                // Esperar a que la imagen se cargue para validar las dimensiones
                await new Promise((resolve, reject) => {
                  img.onload = () => {
                    // Verificar las dimensiones de la imagen
                    const maxWidth = 4080;
                    const maxHeight = 4080;

                    console.log(`Dimensiones de la imagen: ${img.width}x${img.height}`);

                    if (img.width > maxWidth || img.height > maxHeight) {
                      console.warn(
                        `Imagen excede las dimensiones máximas permitidas (${maxWidth}x${maxHeight}): ${img.width}x${img.height}`
                      );
                      hasExceeded = true; // Marcar como excedido
                      setErrorToast('Una o más imágenes superan las dimensiones máximas permitidas.');
                      reject(new Error('Dimensiones excedidas'));
                    } else {
                      resolve(true);
                    }
                  };
                  img.onerror = (error) => {
                    console.error('Error al cargar la imagen para validar dimensiones:', error);
                    reject(error);
                  };
                });

                // Validar si la imagen excede los 5 MB
                console.log('Tamaño de la imagen (bytes):', blob.size);
                if (blob.size <= 5 * 1024 * 1024) {
                  console.log('Imagen válida:', photo.webPath);
                  return photo.webPath;
                } else {
                  console.warn('Imagen excede los 5 MB:', photo.webPath);
                  hasExceeded = true; // Marcar como excedido
                  setErrorToast('Una o más imágenes superan el tamaño máximo de 5 MB.');
                  return null;
                }
              } catch (error) {
                console.error('Error al verificar la imagen:', error);
                setErrorToast('Error al verificar una imagen.');
                return null;
              }
            })
        );

        // Actualizar el estado basado en la variable temporal `hasExceeded`
        setSizeExceeded(hasExceeded);
        console.log('Flag de tamaño excedido:', hasExceeded);

        // Filtrar las imágenes válidas (no nulas)
        const validImageUrls = imageUrls.filter((url) => url !== null);
        console.log('Imágenes válidas:', validImageUrls);

        // Mostrar mensaje de error si alguna imagen excedió el tamaño o dimensiones
        if (hasExceeded) {
          setErrorToast('Una o más imágenes superan el tamaño o las dimensiones permitidas.');
        } else if (validImageUrls.length >= 8) {
          setImages(validImageUrls);
          history.push('/verify-images');
        } else if (validImageUrls.length > 0) {
          setImages(validImageUrls);
          setErrorToast('Debes seleccionar por lo menos 8 imágenes.');
        } else {
          setErrorToast('Los archivos seleccionados no son imágenes válidas o superan el tamaño o dimensiones permitidas.');
        }
      } else {
        setErrorToast('No se seleccionaron imágenes para subir.');
      }
    } catch (error) {
      console.error('Error al abrir la galería:', error);
      setErrorToast('Error al abrir tu galería de imágenes. Por favor, vuelve a intentarlo.');
    }
  };

  return (
    <IonPage>
      <IonContent color={'primary'} className='ion-padding'>
        <IonButton
          color='light'
          fill='clear'
          mode='ios'
          className='fixed-button'
          size='large'
          routerLink='/accessibility-settings'
        >
          <IonIcon icon={accessibility} className={styles.accessibilityIcon}></IonIcon>
        </IonButton>

        <IonToast mode='ios'
          isOpen={!!errorToast}
          position='top'
          message={errorToast}
          duration={3000}
          onDidDismiss={() => setErrorToast('')}
          color={'danger'}
        />

        <div className={styles.container}>
          <IonText>
            <h1>Inicia tu búsqueda</h1>
          </IonText>
          <IonIcon icon={camera} className={styles.cameraIcon}></IonIcon>
          <p>
            Por favor, sube entre 8 y 12 fotos claras de la persona desaparecida. Las imágenes desde diferentes ángulos y con rasgos distintivos ayudarán a mejorar la búsqueda. Cada detalle puede ser crucial.
          </p>
          <IonButton
            color={'light'}
            expand='block'
            mode='ios'
            onClick={openGallery}
            className={styles.whiteText}
          >
            Subir fotos
          </IonButton>
        </div>

        <img src='src\assets\img\logo-encuentrame.png' alt='Encuéntrame' />
      </IonContent>
    </IonPage>
  );
};

export default UploadImages;
