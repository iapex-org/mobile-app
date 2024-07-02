import { IonButton, IonContent, IonPage } from '@ionic/react';
import ImageSelectCard from '../../components/ImageSelectCard/ImageSelectCard';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';

const VerifyImages: React.FC = () => {
    return (
        <IonPage>
            <NavbarHeader title="Verificar fotos" />

            <IonContent className='ion-padding'>
                <p>Verifica tus fotos para asegurarte de que son las correctas antes de iniciar la búsqueda, puedes eliminar o subir más fotos.</p>

                <ImageSelectCard imageUrl='src/assets/img/patient-1.jpg' imageName='IMG_2023_01_01.jpg' />
                <ImageSelectCard imageUrl='src/assets/img/patient-1.jpg' imageName='IMG_2023_01_01.jpg' />
                <ImageSelectCard imageUrl='src/assets/img/patient-1.jpg' imageName='IMG_2023_01_01.jpg' />
                <ImageSelectCard imageUrl='src/assets/img/patient-1.jpg' imageName='IMG_2023_01_01.jpg' />
                <ImageSelectCard imageUrl='src/assets/img/patient-1.jpg' imageName='IMG_2023_01_01.jpg' />
                <ImageSelectCard imageUrl='src/assets/img/patient-1.jpg' imageName='IMG_2023_01_01.jpg' />
                <ImageSelectCard imageUrl='src/assets/img/patient-1.jpg' imageName='IMG_2023_01_01.jpg' />
                <ImageSelectCard imageUrl='src/assets/img/patient-1.jpg' imageName='IMG_2023_01_01.jpg' />
                <ImageSelectCard imageUrl='src/assets/img/patient-1.jpg' imageName='IMG_2023_01_01.jpg' />
                <ImageSelectCard imageUrl='src/assets/img/patient-1.jpg' imageName='IMG_2023_01_01.jpg' />

                <IonButton mode='ios' expand="block" routerLink='/input-patient-information' className='ion-margin-top'>
                    Continuar
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default VerifyImages;