import { IonButton, IonCard, IonCardContent } from '@ionic/react';
import './PatientCard.css';

interface PatientCard {
    imageUrl: string;
    content: string;
    button: string;
    link: string;
}

const PatientCard: React.FC<PatientCard> = ({ imageUrl, content, button, link}) => {
    return (
        <IonCard mode='ios' className='ion-no-padding ion-no-margin ion-margin-bottom'>
            <img className="patient-img"
                src={imageUrl} />
            <IonCardContent  mode='ios'>
                <p>{content}</p>
            </IonCardContent>
            <IonButton mode='ios' expand="block" className='ion-padding-bottom ion-padding-horizontal' routerLink={link}>
                {button}
            </IonButton>
        </IonCard>
    );
};

export default PatientCard;
