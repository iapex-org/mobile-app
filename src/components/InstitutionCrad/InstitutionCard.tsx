import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
} from '@ionic/react';
import './InstitutionCard.css';

interface InstitutionCardProps {
    imageUrl: string;
    title: string;
    content: string;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({ imageUrl, title, content }) => {
    return (
        <IonCard mode='ios' className='ion-no-padding ion-no-margin ion-margin-bottom'>
            <img className="institution-img"
                src={imageUrl} />
            <IonCardHeader>
                <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <p>{content}</p>
            </IonCardContent>
            <IonButton mode='ios' expand="block" className='ion-padding' routerLink='/institution-information'>
                Ver más
            </IonButton>
        </IonCard>
    );
};

export default InstitutionCard;
