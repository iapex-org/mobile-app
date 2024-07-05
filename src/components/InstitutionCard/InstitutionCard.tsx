import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
} from '@ionic/react';
import './InstitutionCard.css';
import { Institution } from '../../models/Institution';

interface InstitutionCardProps {
    institution: Institution;
    showButton?: boolean;
}

const InstitutionCard: React.FC<InstitutionCardProps> = ({ institution, showButton = true }) => {
    return (
        <IonCard mode='ios' className='ion-no-padding ion-no-margin ion-margin-bottom'>
            <img className="institution-img" src={institution.imageUrl} alt={`Imagen de ${institution.name}`} />
            <IonCardHeader mode='ios'>
                <IonCardTitle>{institution.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent mode='ios'>
                <p><b>Dirección:</b> {institution.address}</p>
                <p><b>Teléfono:</b> {institution.phone}</p>
                <p><b>Descripción:</b> {institution.description}</p>
            </IonCardContent>
            {showButton && (
                <IonButton mode='ios' expand="block" className='ion-padding-bottom ion-padding-horizontal' routerLink={`/institution-information/${institution.id}`}>
                    Ver más
                </IonButton>
            )}
        </IonCard>
    );
};

export default InstitutionCard;
