import React, { Key, useContext, useState, useEffect } from 'react';
import { IonAlert, IonButton, IonContent, IonFab, IonFabButton, IonIcon, IonPage, IonToast } from '@ionic/react';
import { addOutline, trashOutline } from 'ionicons/icons';
import ImageSelectCard from '../../components/ImageSelectCard/ImageSelectCard';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import { ImageContext } from '../../contexts/ImageContext';
import './VerifyImages.css';
import { Camera } from '@capacitor/camera';
import { useHistory } from 'react-router-dom';

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
            setSelectedImages(selectedImages.filter(img => img !== imageUrl));
        } else {
            setSelectedImages([...selectedImages, imageUrl]);
        }
    };

    const removeSelectedImages = () => {
        setShowAlert(true);
    };

    const handleDeleteConfirmed = () => {
        try {
            const remainingImages = images.filter(img => !selectedImages.includes(img));
            const deletedCount = selectedImages.length;
            setSelectedImages([]);
            setSelectionMode(false);
            setImages(remainingImages);
            setShowAlert(false);
            setSuccessToast(`${deletedCount} imagen${deletedCount > 1 ? 'es' : ''} eliminada${deletedCount > 1 ? 's' : ''} correctamente.`);
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
                height: 1024,
                width: 768
            });

            console.log('Imágenes seleccionadas', addImages);

            if (addImages.photos.length > 0) {
                const validImageUrls = addImages.photos
                    .slice(0, 12 - images.length)
                    .filter(photo => photo.format && photo.format.includes('jpeg'))
                    .map(photo => photo.webPath);

                if (validImageUrls.length > 0) {
                    setImages(prevImages => [...prevImages, ...validImageUrls]);
                    setSuccessToast(`Se subieron ${validImageUrls.length} imagen${validImageUrls.length > 1 ? 'es' : ''}.`);
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

    const handleImageFullscreen = (fullscreen: boolean) => {
        setIsImageFullscreen(fullscreen);
    };

    const handleContinue = () => {
        if (images.length < 10) {
            setErrorToast('Debes tener al menos 10 imágenes antes de continuar.');
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

                <div className="image-grid">
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
