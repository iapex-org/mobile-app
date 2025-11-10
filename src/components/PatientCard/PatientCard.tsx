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
  onSelect: () => void;
  buttonLabel: string;
  isDetailedView: boolean;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onSelect, buttonLabel, isDetailedView }) => {
  const [blurStates, setBlurStates] = useState<boolean[]>(patient.images.map(() => true));
  const formatted1Date = format(new Date(patient.registrationDateTime), "dd/MM/yyyy", { locale: es });
  // const formatted2Date = format(new Date(patient.registrationDateTime), "EEEE dd 'de' MMMM 'de' yyyy 'a las' hh:mm a", { locale: es });
  const heightInMeters = (patient.approximateHeight / 100).toFixed(2);

  const capitalize = (str: string | null | undefined) => {
    if (!str) return 'N/A';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

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
                    alt={`Foto número ${index + 1} del paciente ${patient.id || `${patient.name} ${patient.lastName} ${patient.secondLastName}`}`}
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
          <div>
            <h2 className={styles['bold']}>Fecha y lugar de registro</h2>
            <div className="ion-padding-vertical">
              <p>
                Fue registrado en el sistema el <b>{formatted1Date}</b>, en las instalaciones del <b>{patient.institution.name}</b>, ubicado en <b>{capitalize(patient.institution.direction.city)} {capitalize(patient.institution.direction.state)}</b>.
              </p>
            </div>
          </div>
        )}

        <div>
          <h2 className={styles['bold']}>Información personal</h2>
          {isDetailedView ? (
            <>
              <div className="ion-padding-vertical">
                <p><b>Nombre:</b> {patient.name ? capitalize(patient.name) : 'No especificado'} {patient.lastName ? `${capitalize(patient.lastName).charAt(0)}.` : ''}</p>
                <p><b>Sexo:</b> {capitalize(patient.gender)}</p>
                <p><b>Edad aproximada:</b> {patient.approximateAge}</p>
              </div>
            </>
          ) : (
            <p className="ion-padding-vertical">
              {capitalize(patient.gender === 'masculino' ? 'Hombre' : 'Mujer')} de aproximadamente {patient.approximateAge} años,
              {patient.name ? ` identificado como ${capitalize(patient.name)}${patient.lastName ? ` ${capitalize(patient.lastName).charAt(0)}.` : ''}` : ' persona no identificada'} registrado el {formatted1Date} en {capitalize(patient.institution.direction.city)}, {capitalize(patient.institution.direction.state)}.
            </p>
          )}
        </div>

        <div >
          <h2 className={styles['bold']}>Descripción morfológica</h2>
          {isDetailedView ? (
            <>
              <div className="ion-padding-vertical">
                <p><b>Color de piel:</b> {capitalize(patient.skinColor)}</p>
                <p><b>Color de ojos:</b> {capitalize(patient.eyeColor)}</p>
                <p><b>Cabello:</b> {capitalize(patient.hair)}</p>
                <p><b>Complexión:</b> {capitalize(patient.complexion)}</p>
                <p><b>Estatura aproximada:</b> {heightInMeters} metros</p>
              </div>
            </>
          ) : (
            <p className="ion-padding-vertical">
              Paciente con piel {patient.skinColor}, cabello {patient.hair}, complexión {patient.complexion},
              ojos {patient.eyeColor}, y una estatura aproximada de {heightInMeters} metros.
            </p>
          )}
        </div>

        {isDetailedView && (patient.distinctiveFeatures) && (
          <div >
            <h2><b>Información adicional</b></h2>
            <div className="ion-padding-vertical">
              {patient.distinctiveFeatures && <p><b>Señas particulares:</b> {capitalize(patient.distinctiveFeatures)}</p>}
            </div>
          </div>
        )}

        <IonButton onClick={onSelect} expand="block" mode="ios">
          {buttonLabel}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default PatientCard;
