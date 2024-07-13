import { IonCard, IonCardContent, IonButton } from '@ionic/react';
import { Patient } from '../../models/Patient';

interface PatientCardProps {
    patient: Patient;
    imageUrl: string;
    link: string;
    buttonLabel: string;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, imageUrl, link, buttonLabel }) => {
    return (
        <IonCard mode='ios' className='ion-no-margin ion-no-padding ion-margin-bottom'>
            <img src={imageUrl} className='size-img' />
            <IonCardContent mode='ios'>
                <p><b>Edad: </b>{patient.age} años</p>
                <p><b>Peso: </b>{patient.weight} kg</p>
                <p><b>Altura: </b>{patient.height} cm</p>
                <p><b>Descripción: </b>{patient.description}</p>
                <IonButton routerLink={link} expand='block' mode='ios' className='ion-margin-top' >{buttonLabel}</IonButton>
            </IonCardContent>
        </IonCard>
    );
};

export default PatientCard;
