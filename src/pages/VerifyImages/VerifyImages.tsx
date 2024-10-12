import React, { Key, useContext, useState, useEffect } from 'react';
import { IonAlert, IonButton, IonContent, IonFab, IonFabButton, IonIcon, IonPage, IonToast } from '@ionic/react';
import { addOutline, trashOutline } from 'ionicons/icons';
import ImageSelectCard from '../../components/ImageSelectCard/ImageSelectCard';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import { ImageContext } from '../../contexts/ImageContext';
import { Camera } from '@capacitor/camera';
import { useHistory } from 'react-router-dom';
import styles from './VerifyImages.module.css';

const VerifyImages: React.FC = () => {
    const { images, selectedImages, setSelectedImages, setImages } = useContext(ImageContext);
    const history = useHistory();
    const [selectionMode, setSelectionMode] = useState(false);
    const [isImageFullscreen, setIsImageFullscreen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [errorToast, setErrorToast] = useState<string>('');
    const [successToast, setSuccessToast] = useState<string>('');

    useEffect(() => {
        console.log('Imágenes recibidas:', images);
    }, [images]);

    const toggleImageSelection = (imageUrl: string) => {
        if (selectedImages.includes(imageUrl)) {
            setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
        } else {
            setSelectedImages([...selectedImages, imageUrl]);
        }
    };

    const removeSelectedImages = () => {
        setShowAlert(true);
    };

    const handleDeleteConfirmed = () => {
        try {
            const remainingImages = images.filter((img) => !selectedImages.includes(img));
            const deletedCount = selectedImages.length;
            setSelectedImages([]);
            setSelectionMode(false);
            setImages(remainingImages);
            setShowAlert(false);
            setSuccessToast(
                `${deletedCount} imagen${deletedCount > 1 ? 'es' : ''} eliminada${deletedCount > 1 ? 's' : ''} correctamente.`
            );
        } catch (error) {
            console.error('Error al eliminar imágenes:', error);
            setErrorToast('Error al eliminar imágenes. Por favor, intenta nuevamente.');
        }
    };

    const addImages = async () => {
        if (images.length >= 12) {
            setErrorToast('Has alcanzado el límite de 12 imágenes.');
            return;
        }
    
        try {
            const addImages = await Camera.pickImages({
                quality: 100,
                limit: 12 - images.length,
                height: 4080,
                width: 4080,
            });
    
            console.log('Imágenes seleccionadas:', addImages);
    
            let specificError = false; // Indicador para rastrear si se lanzó un error específico.
    
            if (addImages.photos.length > 0) {
                const validImageUrls = await Promise.all(
                    addImages.photos
                        .slice(0, 12 - images.length)
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
                                // Obtener la imagen para verificar su tamaño
                                const response = await fetch(photo.webPath);
                                const blob = await response.blob();
    
                                // Validar si la imagen excede los 5 MB
                                if (blob.size > 5 * 1024 * 1024) {
                                    setErrorToast('Una imagen supera el tamaño máximo permitido de 5 MB.');
                                    specificError = true; // Marcar que se lanzó un error específico.
                                    return null; // Retornar null si la imagen excede el peso permitido
                                }
    
                                // Crear un objeto de imagen para obtener las dimensiones
                                const img = new Image();
                                img.src = URL.createObjectURL(blob);
    
                                // Validar las dimensiones de la imagen
                                await new Promise((resolve, reject) => {
                                    img.onload = () => {
                                        const maxWidth = 4080;
                                        const maxHeight = 4080;
    
                                        if (img.width > maxWidth || img.height > maxHeight) {
                                            setErrorToast(
                                                `Una imagen supera las dimensiones máximas permitidas (${maxWidth}x${maxHeight} píxeles).`
                                            );
                                            specificError = true; // Marcar que se lanzó un error específico.
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
    
                                // Si todo es válido, retornar la URL de la imagen
                                return photo.webPath;
                            } catch (error) {
                                console.error('Error al verificar la imagen:', error);
                                specificError = true; // Marcar que se lanzó un error específico.
                                return null;
                            }
                        })
                );
    
                // Filtrar las imágenes válidas (no nulas)
                const filteredValidImages = validImageUrls.filter((url) => url !== null);
    
                if (filteredValidImages.length > 0) {
                    setImages((prevImages) => [...prevImages, ...filteredValidImages]);
                    setSuccessToast(
                        `Se subieron ${filteredValidImages.length} imagen${filteredValidImages.length > 1 ? 'es' : ''}.`
                    );
                } else if (!specificError) {
                    // Mostrar el mensaje general solo si no se mostró un error específico
                    setErrorToast('Los archivos seleccionados no son imágenes válidas o superan el tamaño o dimensiones permitidas.');
                }
            } else {
                setErrorToast('No se seleccionaron imágenes para subir.');
            }
        } catch (error) {
            console.error('Error al abrir la galería:', error);
            setErrorToast('Error al abrir la galería. Por favor, intenta nuevamente.');
        }
    };
    
    const handleImageFullscreen = (fullscreen: boolean) => {
        setIsImageFullscreen(fullscreen);
    };

    const handleContinue = () => {
        if (images.length < 8) {
            setErrorToast('Debes tener al menos 8 imágenes antes de continuar.');
        } else {
            // Redirige a la siguiente página
            history.push('/input-patient-information');
        }
    };

    const renderFloatingButton = () => {
        if (selectedImages.length > 0 && !isImageFullscreen) {
            return (
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={removeSelectedImages}>
                        <IonIcon icon={trashOutline} />
                    </IonFabButton>
                </IonFab>
            );
        } else if (!isImageFullscreen) {
            return (
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={addImages}>
                        <IonIcon icon={addOutline} />
                    </IonFabButton>
                </IonFab>
            );
        }
        return null;
    };

    return (
        <IonPage>
            <NavbarHeader title="Verificar fotos" />

            <IonContent className='ion-padding'>
                <p>Verifica tus fotos para asegurarte de que son las correctas antes de iniciar la búsqueda, puedes eliminar o subir más fotos.</p>

                <div className={styles.imageGrid}>
                    {images.map((image: string, index: Key | null | undefined) => (
                        <ImageSelectCard
                            key={index}
                            imageUrl={image}
                            isSelected={selectedImages.includes(image)}
                            onSelect={toggleImageSelection}
                            selectionMode={selectionMode}
                            onFullscreen={handleImageFullscreen}
                        />
                    ))}
                </div>

                {renderFloatingButton()}

                <IonButton mode='ios' expand="block" onClick={handleContinue} className='ion-margin-top'>
                    Continuar
                </IonButton>
            </IonContent>

            <IonAlert mode='ios'
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Eliminar imágenes"
                message="¿Estás seguro de que deseas eliminar las imágenes seleccionadas?"
                buttons={[
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            console.log('Canceló la eliminación');
                        }
                    },
                    {
                        text: 'Eliminar',
                        handler: handleDeleteConfirmed
                    }
                ]}
            />

            <IonToast mode='ios'
                isOpen={!!errorToast}
                position="top"
                message={errorToast}
                duration={3000}
                onDidDismiss={() => setErrorToast('')}
                color="danger"
            />

            <IonToast mode='ios'
                isOpen={!!successToast}
                position="top"
                message={successToast}
                duration={3000}
                onDidDismiss={() => setSuccessToast('')}
                color="success"
            />
        </IonPage>
    );
};

export default VerifyImages;
