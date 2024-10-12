import React, { useState } from 'react';
import { IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import { eyeOff, eye } from 'ionicons/icons';
import { Patient } from '../../models/Patient';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import styles from './PatientCard.module.css';

interface PatientCardProps {
  patient: Patient;
  link: string;
  buttonLabel: string;
  isDetailedView: boolean;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, link, buttonLabel, isDetailedView }) => {
  const [isBlurred, setIsBlurred] = useState(true);
  const imageUrl = patient.images.length > 0 ? patient.images[0].imageUrl : '';
  const formattedDate = format(new Date(patient.registrationDateTime), "dd 'de' MMMM 'de' yyyy", { locale: es });
  const heightInMeters = (patient.approximateHeight / 100).toFixed(2);

  const toggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <IonCard mode='ios' className='ion-no-margin ion-no-padding ion-margin-bottom'>
      <div className={styles['image-container']}>
        <img src={imageUrl} className={`${styles['size-img']} ${isBlurred ? styles['blurred'] : ''}`} alt="Patient" />
        <IonIcon icon={isBlurred ? eyeOff : eye} className={styles['toggle-icon']} onClick={toggleBlur} />
      </div>
      <IonCardContent mode='ios'>
        <div className={styles['card-info']}>
          <h2><b>Información personal</b></h2>

          {/* Mostrar información personal dependiendo del tipo de vista */}
          {isDetailedView ? (
            <>
              <div className='ion-padding-vertical'>
                <p><b>Fecha de registro: </b>{formattedDate}</p>
                {patient.name && <p><b>Nombre: </b>{capitalize(patient.name)}</p>}
                {patient.lastName && <p><b>Apellido paterno: </b>{capitalize(patient.lastName)}</p>}
                {patient.secondLastName && <p><b>Apellido materno: </b>{capitalize(patient.secondLastName)}</p>}
                <p><b>Sexo: </b>{capitalize(patient.gender)}</p>
                <p><b>Edad aproximada: </b>{patient.approximateAge}</p>
              </div>
            </>
          ) : (
            <p className='ion-padding-vertical'>
              {capitalize(patient.gender === 'masculino' ? 'Hombre' : 'Mujer')} de aproximadamente {patient.approximateAge} años,
              {patient.name ? ` identificado como ${capitalize(patient.name)} ${capitalize(patient.lastName || '')} ${capitalize(patient.secondLastName || '')}` : ' persona no identificada'},
              fue ingresado en el sistema el {formattedDate}.
            </p>
          )}
        </div>

        <div className={styles['card-info']}>
          <h2><b>Descripción morfológica</b></h2>

          {/* Mostrar descripción dependiendo del tipo de vista */}
          {isDetailedView ? (
            <>
              <div className='ion-padding-vertical'>
                <p><b>Color de piel: </b>{capitalize(patient.skinColor)}</p>
                <p><b>Color de ojos: </b>{capitalize(patient.eyeColor)}</p>
                <p><b>Cabello: </b>{capitalize(patient.hair)}</p>
                <p><b>Complexión: </b>{capitalize(patient.complexion)}</p>
                <p><b>Estatura aproximada: </b>{heightInMeters} metros</p>
                {patient.medicalConditions && <p><b>Condiciones médicas: </b>{capitalize(patient.medicalConditions)}</p>}
                {patient.distinctiveFeatures && <p><b>Características distintivas: </b>{capitalize(patient.distinctiveFeatures)}</p>}
              </div>
            </>
          ) : (
            <p className='ion-padding-vertical'>{`Paciente con piel ${patient.skinColor}, cabello ${patient.hair}, complexión ${patient.complexion}, ojos ${patient.eyeColor}, y una estatura aproximada de ${heightInMeters} metros.`}</p>
          )}
        </div>

        {/* Mostrar descripción dependiendo del tipo de vista */}
        {isDetailedView ? (
          <>
            <div className={styles['card-info']}>
              {patient.additionalNotes && (
                <>
                  <h2><b>Notas adicionales</b></h2>
                  <div className='ion-padding-vertical'>
                    <p>{capitalize(patient.additionalNotes)}</p>
                  </div>
                </>
              )}
            </div>
          </>
        ) : null}

        <IonButton routerLink={link} expand='block' mode='ios'>{buttonLabel}</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default PatientCard;
