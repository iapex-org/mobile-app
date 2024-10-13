import React, { useState } from 'react';
import { IonCard, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import { eyeOff, eye } from 'ionicons/icons';
import { Patient } from '../../models/Patient';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import styles from './PatientCard.module.css';

interface PatientCardProps {
  patient: Patient;
  link: string;
  buttonLabel: string;
  isDetailedView: boolean;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, link, buttonLabel, isDetailedView }) => {
  const [blurStates, setBlurStates] = useState<boolean[]>(patient.images.map(() => true));
  const formatted1Date = format(new Date(patient.registrationDateTime), "dd/MM/yyyy", { locale: es });
  const formatted2Date = format(new Date(patient.registrationDateTime), "EEEE dd 'de' MMMM 'de' yyyy 'a las' hh:mm a", { locale: es });
  const heightInMeters = (patient.approximateHeight / 100).toFixed(2);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // Función para alternar el blur de todas las imágenes
  const toggleBlur = () => {
    setBlurStates((prevStates) => prevStates.map((blur) => !blur));
  };

  return (
    <IonCard mode="ios" className="ion-no-margin ion-no-padding ion-margin-bottom">
      <div className={styles['image-container']}>
        {isDetailedView ? (
          <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={10} slidesPerView={1}>
            {patient.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className={styles['image-wrapper']}>
                  <img
                    src={img.imageUrl}
                    className={`${styles['size-img']} ${blurStates[index] ? styles['blurred'] : ''}`}
                    alt={`Paciente ${index + 1}`}
                  />
                  {/* Botón para alternar el blur */}
                  <IonIcon
                    icon={blurStates[index] ? eyeOff : eye}
                    className={styles['toggle-icon']}
                    onClick={() => toggleBlur()}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // Mostrar solo la primera imagen si isDetailedView es false
          <div className={styles['image-wrapper']}>
            <img
              src={patient.images[0]?.imageUrl || 'placeholder.jpg'}
              className={`${styles['size-img']} ${blurStates[0] ? styles['blurred'] : ''}`}
              alt="Imagen del paciente"
            />
          </div>
        )}
        <div className={styles['toggle-container']}>
          {/* Botón para alternar el blur */}
          <IonIcon
            icon={blurStates[0] ? eyeOff : eye}
            className={styles['toggle-icon']}
            onClick={() => toggleBlur()}
          />
        </div>
      </div>

      <IonCardContent mode="ios">
        {isDetailedView && (
          <div className={styles['card-info']}>
            <h2><b>Fecha y lugar de registro</b></h2>
            <div className="ion-padding-vertical">
              <p>
                Fue registrado en el sistema el <b>{formatted2Date}</b>, en las instalaciones del <b>{patient.institution.name}</b>, ubicado en <b>{capitalize(patient.institution.direction.city)} {capitalize(patient.institution.direction.state)}</b>.
              </p>
            </div>
          </div>
        )}

        <div className={styles['card-info']}>
          <h2><b>Información personal</b></h2>
          {isDetailedView ? (
            <>
              <div className="ion-padding-vertical">
                {patient.name && <p><b>Nombre:</b> {capitalize(patient.name)}</p>}
                {patient.lastName && <p><b>Apellido paterno:</b> {capitalize(patient.lastName)}</p>}
                {patient.secondLastName && <p><b>Apellido materno:</b> {capitalize(patient.secondLastName)}</p>}
                <p><b>Sexo:</b> {capitalize(patient.gender)}</p>
                <p><b>Edad aproximada:</b> {patient.approximateAge}</p>
              </div>
            </>
          ) : (
            <p className="ion-padding-vertical">
              {capitalize(patient.gender === 'masculino' ? 'Hombre' : 'Mujer')} de aproximadamente {patient.approximateAge} años,
              {patient.name ? ` identificado como ${capitalize(patient.name)} ${capitalize(patient.lastName || '')} ${capitalize(patient.secondLastName || '')}` : ' persona no identificada'},
              fue ingresado en el sistema el {formatted1Date} en {capitalize(patient.institution.direction.city)}, {capitalize(patient.institution.direction.state)}.
            </p>
          )}
        </div>

        <div className={styles['card-info']}>
          <h2><b>Descripción morfológica</b></h2>
          {isDetailedView ? (
            <>
              <div className="ion-padding-vertical">
                <p><b>Color de piel:</b> {capitalize(patient.skinColor)}</p>
                <p><b>Color de ojos:</b> {capitalize(patient.eyeColor)}</p>
                <p><b>Cabello:</b> {capitalize(patient.hair)}</p>
                <p><b>Complexión:</b> {capitalize(patient.complexion)}</p>
                <p><b>Estatura aproximada:</b> {heightInMeters} metros</p>
                {patient.medicalConditions && <p><b>Condiciones médicas:</b> {capitalize(patient.medicalConditions)}</p>}
                {patient.distinctiveFeatures && <p><b>Señas particulares:</b> {capitalize(patient.distinctiveFeatures)}</p>}
              </div>
            </>
          ) : (
            <p className="ion-padding-vertical">
              Paciente con piel {patient.skinColor}, cabello {patient.hair}, complexión {patient.complexion},
              ojos {patient.eyeColor}, y una estatura aproximada de {heightInMeters} metros.
            </p>
          )}
        </div>

        {isDetailedView && patient.additionalNotes && (
          <div className={styles['card-info']}>
            <h2><b>Notas adicionales</b></h2>
            <div className="ion-padding-vertical">
              <p>{capitalize(patient.additionalNotes)}</p>
            </div>
          </div>
        )}

        <IonButton routerLink={link} expand="block" mode="ios">
          {buttonLabel}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default PatientCard;
