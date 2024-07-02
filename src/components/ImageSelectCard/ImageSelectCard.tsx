import { IonCard, IonIcon, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import './ImageSelectCard.css';

interface ImageSelectCardProps {
    imageUrl: string;
    imageName: string;
}

const ImageSelectCard: React.FC<ImageSelectCardProps> = ({ imageUrl, imageName }) => {
    return (
        <IonList mode='ios' className='ion-no-padding'>
            <IonItem className='custom-item'>
                <IonThumbnail slot="start" className="custom-thumbnail">
                    <img src={imageUrl} alt={imageName} />
                </IonThumbnail>
                <IonLabel>{imageName}</IonLabel>
                <IonIcon icon={trashOutline} slot="end" color='danger' />
            </IonItem>
        </IonList>

        // <IonCard mode='ios' className='ion-no-padding ion-no-margin ion-margin-bottom'>
        //     <IonList mode='ios' lines='none' className='ion-no-padding'>
        //         <IonItem className='custom-item'>
        //             <IonThumbnail slot="start" className="custom-thumbnail">
        //                 <img src={imageUrl} alt={imageName} />
        //             </IonThumbnail>
        //             <IonLabel>{imageName}</IonLabel>
        //             <IonIcon icon={trashOutline} slot="end" color='danger' />
        //         </IonItem>
        //     </IonList>
        // </IonCard>
    );
};

export default ImageSelectCard;
