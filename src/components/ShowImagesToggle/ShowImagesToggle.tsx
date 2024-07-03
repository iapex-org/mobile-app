import {
    IonItem,
    IonToggle
} from '@ionic/react';

const ShowImagesToggle: React.FC = () => {
    return (
        <IonItem className='ion-no-padding' lines='none'>
            <IonToggle justify="space-between" checked={true} enableOnOffLabels={true}>
                Mostrar imagenes
            </IonToggle>
        </IonItem>
    );
};

export default ShowImagesToggle;
