// Importaciones de Ionic y React
import {
    IonContent,
    IonPage,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButtons,
    IonBackButton,
    IonToolbar
} from '@ionic/react';
import './InstitutionInformation.css';

// Componente de información de la institución
const InstitutionInformation: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start" className='ion-margin-horizontal'>
                    <IonBackButton text="Hospital IMSS Región Córdoba" color='medium' defaultHref="#" />
                </IonButtons>
            </IonToolbar>

            <IonContent className='ion-padding'>
                <IonCard>
                    <img src="src\assets\img\institution-1.jpg" />
                    <IonCardContent>
                        <p><strong>Ubicación:</strong> El IMSS en Córdoba está situado en una zona accesible de la ciudad, con conexiones viales que facilitan el acceso tanto a pie como en transporte público. La dirección exacta puede variar, pero generalmente se encuentra en una zona central o de fácil acceso para los residentes.</p>
                        <p><strong>Personal médico y administrativo:</strong> El IMSS de Córdoba cuenta con un equipo multidisciplinario de profesionales de la salud, incluyendo médicos generales, especialistas, enfermeras, técnicos de laboratorio, y personal administrativo, todos dedicados a ofrecer una atención de calidad a los asegurados.</p>
                        <p><strong>Servicios ofrecidos:</strong></p>
                        <ul>
                            <li>Consulta externa: Atención médica general y especializada.</li>
                            <li>Servicios de urgencias: Atención de emergencias médicas las 24 horas del día.</li>
                            <li>Hospitalización: Camas disponibles para pacientes que requieren internamiento.</li>
                            <li>Cirugía: Servicios quirúrgicos para diversas especialidades.</li>
                            <li>Laboratorio y rayos X: Servicios de análisis clínicos y estudios de imagenología.</li>
                            <li>Programas preventivos: Vacunación, control prenatal, detección de enfermedades crónicas, etc.</li>
                            <li>Rehabilitación: Servicios de fisioterapia y rehabilitación física.</li>
                        </ul>
                        <p><strong>Atención al paciente:</strong> El IMSS de Córdoba pone un fuerte énfasis en la atención al paciente, ofreciendo programas de orientación y apoyo para asegurados y sus familias, asegurando un proceso de atención médica más comprensible y accesible.</p>
                        <p><strong>Infraestructura:</strong> El edificio suele estar equipado con accesos adecuados para personas con discapacidad, ascensores, y señalización clara para guiar a los pacientes a sus respectivos servicios.</p>
                    </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Datos adicionales de la institución de salud</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <p>Se enlistan datos adicionales de la
                            institución de salud, tales como número
                            total de camas, número de camas
                            disponibles, número de camas ocupadas,
                            requisitos de ingreso, así como otros datos
                            operativos escenciales acerca de cada
                            institución de salud.</p>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default InstitutionInformation;
