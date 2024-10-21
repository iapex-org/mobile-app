import React, { useContext, useEffect, useRef, useState } from 'react';
import { IonButton, IonCheckbox, IonContent, IonIcon, IonModal, IonPage, IonPopover, IonText, IonToast } from '@ionic/react';
import { accessibility, camera, informationCircle } from 'ionicons/icons';
import { Camera } from '@capacitor/camera';
import { ImageContext } from '../../contexts/ImageContext';
import { useHistory } from 'react-router-dom';
import styles from './UploadImages.module.css';
import { useSearchContext } from '../../contexts/SearchContext';
import useTextToSpeechClick from '../../hooks/UseTextToSpeechClick';

const UploadImages: React.FC = () => {
  useTextToSpeechClick();
  const modal = useRef<HTMLIonModalElement>(null);

  const { setImages } = useContext(ImageContext);
  const { setSearchResults, setSearchError, setFormData } = useSearchContext();
  const history = useHistory();
  const [errorToast, setErrorToast] = useState<string>('');
  const [, setSizeExceeded] = useState<boolean>(false);

  const openGallery = async () => {
    if (!termsAccepted) {
      setErrorToast('Debes aceptar los términos y condiciones antes de continuar');
      return;
    }

    setImages([]);
    setFormData(null); // Limpiar el FormData al subir nuevas imágenes
    setSearchResults([]); // Limpiar los resultados de la búsqueda al subir nuevas imágenes
    setSearchError(false); // Limpiar el error de búsqueda al subir nuevas imágenes
    setSizeExceeded(false); // Reseteamos el flag al iniciar la función
    console.log('Limpiando imagenes, resultados de búsqueda y errores...');

    try {
      const images = await Camera.pickImages({
        quality: 100,
        limit: 6,
        height: 4080,
        width: 4080,
      });

      console.log('Imágenes seleccionadas:', images);

      if (images.photos.length > 6) {
        // Mostrar error si se seleccionan más de 6 imágenes
        setErrorToast('Solo puedes seleccionar un máximo de 6 imágenes.');
        return;
      }

      if (images.photos.length > 0) {
        // Variable temporal para verificar si alguna imagen excede el tamaño o dimensiones
        let hasExceeded = false;

        const imageUrls = await Promise.all(
          images.photos
            .slice(0, 6)
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

        // Filtrar las imágenes válidas (no nulas)
        const validImageUrls = imageUrls.filter((url) => url !== null);
        console.log('Imágenes válidas:', validImageUrls);

        // Mostrar mensaje de error si alguna imagen excedió el tamaño o dimensiones
        if (hasExceeded) {
          setErrorToast('Una o más imágenes superan el tamaño o las dimensiones permitidas.');
        } else if (validImageUrls.length >= 3) {
          setImages(validImageUrls);
          history.replace('/verify-images');
        } else if (validImageUrls.length > 0) {
          setImages(validImageUrls);
          setErrorToast('Debes seleccionar por lo menos 3 imágenes.');
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

  const [termsAccepted, setTermsAccepted] = useState<boolean>(() => {
    // Recupera el estado guardado en localStorage o lo establece en false por defecto
    const storedValue = localStorage.getItem('termsAccepted');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // Guarda el estado del checkbox en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('termsAccepted', JSON.stringify(termsAccepted));
  }, [termsAccepted]);

  return (
    <IonPage>
      <IonContent color={'primary'} className='ion-padding'>
        <IonButton
          aria-label='Configuración de accesibilidad'
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
            <h1 className={styles.whiteText}>Inicia tu búsqueda</h1>
          </IonText>

          <IonIcon icon={camera} className={styles.cameraIcon} aria-label="Icono de cámara"></IonIcon>

          <p >
            Sube entre 3 y 6 fotos del rostro de la persona desaparecida, asegurándote de que cumplan con el peso, tamaño y formato permitidos. Las imágenes desde diferentes ángulos y con rasgos reconocibles facilitarán la búsqueda.
          </p>

          <div className='ion-margin-top' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IonButton
              color={'light'}
              expand='block'
              mode='ios'
              onClick={openGallery}
              style={{ flexGrow: 999, marginRight: '4px' }}
              className={styles.blueText}
            >
              Subir fotos
            </IonButton>
            <IonButton
              aria-label='Requisitos sobre las imágenes'
              color={'light'}
              mode='ios'
              expand='block'
              id="info-icon"
              style={{ flexGrow: 1, marginLeft: '4px' }}
              className={styles.blueText}
            >
              <IonIcon color='primary' icon={informationCircle}></IonIcon>
              <IonPopover
                mode="ios"
                trigger="info-icon"
                side='top'
                alignment='center'
                className="custom-popover"
              >
                <IonContent class="ion-padding">
                  <ul className='ion-no-margin'>
                    <p className='ion-no-margin'><li>Deben ser entre 3 y 6 imágenes.</li></p>
                    <p className='ion-no-margin'><li>El tamaño máximo por imagen es de 5 MB.</li></p>
                    <p className='ion-no-margin'><li>Resolución máxima permitida: 4080x4080 píxeles.</li></p>
                    <p className='ion-no-margin'><li>Formatos admitidos: JPG, JPEG, PNG, BMP, TIFF, HEIC.</li></p>
                    <p className='ion-no-margin'><li>Usa imágenes claras del rostro y desde diferentes ángulos.</li></p>
                  </ul>
                </IonContent>
              </IonPopover>
            </IonButton>
          </div>

          <div className='ion-padding-vertical'
            style={{ display: 'flex', alignItems: 'center', marginTop: '8px', justifyContent: 'center' }}>
            <IonCheckbox
              mode='ios'
              checked={termsAccepted}
              onIonChange={(e) => setTermsAccepted(e.detail.checked)}
              style={{ marginRight: '8px' }} // Espacio entre el checkbox y el texto
            />
            <p style={{ margin: 0 }}>
              Acepto los <b style={{cursor: 'pointer'}} id='terms-and-conditions'>términos y condiciones</b>
            </p>
            <IonModal className='ion-padding' mode='ios' ref={modal} trigger="terms-and-conditions" initialBreakpoint={0.5} breakpoints={[0, 0.5, 0.75, 1]}>
              <div style={{ padding: '25px', overflowY: 'auto' }}>
                <h2>Términos y condiciones de uso</h2>
                <p><strong>1. Introducción:</strong> Bienvenido a nuestra aplicación. Al utilizar la aplicación, aceptas los presentes términos y condiciones. Si no estás de acuerdo con ellos, te pedimos que no utilices la aplicación. Nos reservamos el derecho de modificar estos términos en cualquier momento, y es tu responsabilidad revisarlos regularmente. El uso continuado de la aplicación después de cualquier cambio constituirá la aceptación de dichos cambios.</p>
                <p><strong>2. Uso de la aplicación:</strong> La aplicación está diseñada para facilitar la búsqueda de personas desaparecidas mediante la recopilación de información relevante, incluidas fotografías. Te comprometes a proporcionar información veraz y precisa. El mal uso o uso indebido de la aplicación está estrictamente prohibido. No está permitido subir contenido inapropiado, ofensivo, ilegal o que viole derechos de terceros. Nos reservamos el derecho de eliminar contenido que consideremos inapropiado sin previo aviso.</p>
                <p><strong>3. Responsabilidad del usuario:</strong> Eres responsable de la exactitud de la información proporcionada, así como del uso adecuado de la aplicación. No asumimos responsabilidad por las consecuencias derivadas de la carga de información incorrecta o falsa. Es tu responsabilidad asegurar que cualquier fotografía o dato proporcionado cuente con el consentimiento adecuado para su uso.</p>
                <p><strong>4. Privacidad y protección de datos:</strong> Respetamos tu privacidad y nos comprometemos a proteger tus datos personales de acuerdo con las leyes aplicables de protección de datos. Los datos que proporciones serán utilizados exclusivamente para los fines específicos de esta aplicación, es decir, la búsqueda de personas desaparecidas. No compartiremos tus datos personales con terceros sin tu consentimiento explícito, salvo que sea requerido por ley o por orden judicial. Para más información sobre cómo manejamos tus datos, revisa nuestra Política de Privacidad disponible dentro de la aplicación.</p>
                <p><strong>5. Propiedad intelectual:</strong> Todo el contenido de la aplicación, incluyendo textos, imágenes, íconos y diseño, es propiedad de sus respectivos titulares y está protegido por las leyes de propiedad intelectual. No está permitida la copia, reproducción, distribución o uso comercial del contenido de la aplicación sin nuestro consentimiento previo por escrito. El uso no autorizado del contenido podrá resultar en acciones legales.</p>
                <p><strong>6. Limitación de responsabilidad:</strong> La aplicación se proporciona "tal cual", sin garantías explícitas o implícitas de ningún tipo. No garantizamos la disponibilidad continua de la aplicación ni su funcionamiento sin errores o interrupciones. No somos responsables de ningún daño directo o indirecto que pueda derivarse del uso o imposibilidad de uso de la aplicación, incluyendo, pero no limitado a, pérdida de datos o lucro cesante.</p>
                <p><strong>7. Modificaciones de los términos y la aplicación:</strong> Nos reservamos el derecho de modificar los términos y condiciones, así como el contenido o las funcionalidades de la aplicación en cualquier momento. Te notificaremos sobre cambios relevantes mediante la propia aplicación o por otros medios que consideremos apropiados. Es tu responsabilidad revisar periódicamente los términos para estar al tanto de las modificaciones.</p>
                <p><strong>8. Ley aplicable y jurisdicción:</strong> Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes aplicables en México, sin dar efecto a ninguna disposición sobre conflictos de leyes. Cualquier disputa que surja en relación con estos términos o el uso de la aplicación será sometida a la jurisdicción exclusiva de los tribunales competentes en México.</p>
              </div>
            </IonModal>
          </div>

        </div>

        <img src='src\assets\img\logo-encuentrame.png' alt='Logotipo de "Encuéntrame"' />
      </IonContent>
    </IonPage>
  );
};

export default UploadImages;
