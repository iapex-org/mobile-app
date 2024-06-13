import { IonButton, IonCard, IonCardContent } from '@ionic/react';
import './PatientCard.css';

interface PatientCardProps {
    imageUrl: string;
    content: string;
    button: string;
    link: string;
}

const PatientCard: React.FC<PatientCardProps> = ({ imageUrl, content, button, link}) => {
    return (
        <IonCard mode='ios' className='ion-no-padding ion-no-margin ion-margin-bottom'>
            <img className="patient-img"
                src={imageUrl} />
            <IonCardContent>
                <p>{content}</p>
            </IonCardContent>
            <IonButton mode='ios' expand="block" className='ion-padding' routerLink={link}>
                {button}
            </IonButton>
        </IonCard>
    );
};

export default PatientCard;
