// Importaciones de Ionic y React
import { IonContent, IonPage } from '@ionic/react';
import InstitutionCard from '../../components/InstitutionCard/InstitutionCard';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';

// Componente de información de la institución
const InstitutionBasicCard: React.FC = () => {
    return (
        <IonPage>
            <NavbarHeader title="Hospital IMSS Región Córdoba" />

            <IonContent className='ion-padding'>

                <InstitutionCard
                    imageUrl="src\assets\img\institution-1.jpg"
                    content='Ubicación: El IMSS en Córdoba está situado en una zona accesible de la ciudad, con conexiones viales que facilitan el acceso tanto a pie como en transporte público. La dirección exacta puede variar, pero generalmente se encuentra en una zona central o de fácil acceso para los residentes.
                    Personal médico y administrativo: El IMSS de Córdoba cuenta con un equipo multidisciplinario de profesionales de la salud, incluyendo médicos generales, especialistas, enfermeras, técnicos de laboratorio, y personal administrativo, todos dedicados a ofrecer una atención de calidad a los asegurados.
                    Servicios ofrecidos:
                    Consulta externa: Atención médica general y especializada.
                    Servicios de urgencias: Atención de emergencias médicas las 24 horas del día.
                    Hospitalización: Camas disponibles para pacientes que requieren internamiento.
                    Cirugía: Servicios quirúrgicos para diversas especialidades.
                    Laboratorio y rayos X: Servicios de análisis clínicos y estudios de imagenología.
                    Programas preventivos: Vacunación, control prenatal, detección de enfermedades crónicas, etc.
                    Rehabilitación: Servicios de fisioterapia y rehabilitación física.
                    Atención al paciente: El IMSS de Córdoba pone un fuerte énfasis en la atención al paciente, ofreciendo programas de orientación y apoyo para asegurados y sus familias, asegurando un proceso de atención médica más comprensible y accesible.
                    Infraestructura: El edificio suele estar equipado con accesos adecuados para personas con discapacidad, ascensores, y señalización clara para guiar a los pacientes a sus respectivos servicios.'
                    showButton={false}
                    title='Hospital IMSS Región Córdoba'
                />

                <InstitutionCard
                    content='Se enlistan datos adicionales de la
                            institución de salud, tales como número
                            total de camas, número de camas
                            disponibles, número de camas ocupadas,
                            requisitos de ingreso, así como otros datos
                            operativos escenciales acerca de cada
                            institución de salud.'
                    showButton={false}
                    title='Datos adicionales de la institución de salud'
                />

            </IonContent>

        </IonPage>
    );
};

export default InstitutionBasicCard;
