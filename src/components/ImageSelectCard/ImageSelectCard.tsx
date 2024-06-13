import {
    IonCard,
    IonCardContent,
    IonCheckbox,
    IonCol,
    IonGrid,
    IonRow,
} from '@ionic/react';
import './ImageSelectCard.css';

const ImageSelectCard: React.FC = () => {
    return (
        <IonCard mode='ios' className='ion-no-padding ion-no-margin ion-margin-bottom'>
            <IonGrid className='ion-no-padding'>
                <IonRow className="ion-align-items-center">
                    <IonCol size="4" className='ion-no-padding'>
                        <img className="institution-img" src="src\assets\img\patient-1.jpg" />
                    </IonCol>

                    <IonCol size="4">
                        <IonCardContent className="ion-no-padding ion-margin-horizontal">
                            <p>IMG_2023_30_45.jpg</p>
                        </IonCardContent>
                    </IonCol>

                    <IonCol size="4" className="ion-text-end">
                        <IonCheckbox className="closeIcon ion-margin-right"></IonCheckbox>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonCard>
    );
};

export default ImageSelectCard;