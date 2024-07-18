import React, { useState } from 'react';
import { IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import { eyeOff, eye } from 'ionicons/icons';
import { Patient } from '../../models/Patient';
import { format } from 'date-fns';
import './PatientCard.css';

interface PatientCardProps {
  patient: Patient;
  link: string;
  buttonLabel: string;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, link, buttonLabel }) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const imageUrl = patient.images.length > 0 ? patient.images[0].imageUrl : '';
  const formattedDate = format(new Date(patient.registrationDateTime), 'dd/MM/yyyy');
  const heightInMeters = (patient.approximateHeight / 100).toFixed(2);

  const toggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  return (
    <IonCard mode='ios' className='ion-no-margin ion-no-padding ion-margin-bottom'>
      <div className="image-container">
        <img src={imageUrl} className={`size-img ${isBlurred ? 'blurred' : ''}`} alt="Patient" />
        <IonIcon icon={isBlurred ? eyeOff : eye} className="toggle-icon" onClick={toggleBlur} />
      </div>
      <IonCardContent mode='ios'>
        <div className="card-info">
          <h2><b>Información personal</b></h2>
          <p><b>• Fecha de registro: </b>{formattedDate}</p>
          {patient.name && <p><b>• Nombre: </b>{patient.name}</p>}
          {patient.lastName && <p><b>• Apellido paterno: </b>{patient.lastName}</p>}
          {patient.secondLastName && <p><b>• Apellido materno: </b>{patient.secondLastName}</p>}
          <p><b>• Sexo: </b>{patient.gender}</p>
          <p><b>• Edad aproximada: </b>{patient.approximateAge}</p>
        </div>

        <div className="card-info">
          <h2><b>Descripción</b></h2>
          <p><b>• Color de piel: </b>{patient.skinColor}</p>
          <p><b>• Color de ojos: </b>{patient.eyeColor}</p>
          <p><b>• Cabello: </b>{patient.hair}</p>
          <p><b>• Complexión: </b>{patient.complexion}</p>
          {patient.medicalConditions && <p><b>Condiciones Médicas: </b>{patient.medicalConditions}</p>}
          {patient.distinctiveFeatures && <p><b>• Características distintivas: </b>{patient.distinctiveFeatures}</p>}
          <p><b>• Estatura aproximada: </b>{heightInMeters} m</p>
          {patient.additionalNotes && <p><b>• Notas: </b>{patient.additionalNotes}</p>}
        </div>

        <IonButton routerLink={link} expand='block' mode='ios' className='ion-margin-top'>{buttonLabel}</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default PatientCard;
