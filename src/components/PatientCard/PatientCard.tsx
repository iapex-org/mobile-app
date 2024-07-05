import React from 'react';
import { IonCard, IonCardHeader, IonCardContent, IonButton } from '@ionic/react';

interface PatientCardProps {
    patient: {
        id: number;
        age: number;
        height: number;
        weight: number;
        body: string;
        description: string;
    };
    imageUrl: string;
    link: string;
    buttonLabel: string;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, imageUrl, link, buttonLabel }) => {
    return (
        <IonCard>
            <IonCardHeader className='custom-ion-card-header'>
                <img src={imageUrl} alt="Patient" />
            </IonCardHeader>
            <IonCardContent>
                <p><b>Edad: </b>{patient.age} años</p>
                <p><b>Peso: </b>{patient.weight} kg</p>
                <p><b>Altura: </b>{patient.height} cm</p>
                <p><b>Descripción: </b>{patient.description}</p>
                <IonButton href={`${link}/${patient.id}`} expand='block' mode='ios'>{buttonLabel}</IonButton>
            </IonCardContent>
        </IonCard>
    );
};

export default PatientCard;
