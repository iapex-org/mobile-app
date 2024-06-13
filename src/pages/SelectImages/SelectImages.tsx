import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCheckbox,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonPage,
    IonRow,
    IonToolbar
} from '@ionic/react';
import './SelectImages.css';
import ImageSelectCard from '../../components/ImageSelectCard/ImageSelectCard';

const SelectImages: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" className="ion-margin-horizontal">
                        <IonBackButton text="Confirmar fotos" color="medium" defaultHref="#" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className='ion-padding'>
                <p>Si te equivocaste al seleccionar tus fotos, puedes desmarcarlas tocando la casilla correspondiente al lado izquierdo.</p>

                <ImageSelectCard />
                <ImageSelectCard />
                <ImageSelectCard />
                <ImageSelectCard />
                <ImageSelectCard />
                <ImageSelectCard />
                <ImageSelectCard />
                <ImageSelectCard />
                <ImageSelectCard />
                <ImageSelectCard />

                <IonButton mode='ios' expand="block" routerLink='/loading-images'>
                    Continuar
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default SelectImages;