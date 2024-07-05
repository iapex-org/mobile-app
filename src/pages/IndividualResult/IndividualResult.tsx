import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonContent, IonPage } from '@ionic/react';
import PatientCard from '../../components/PatientCard/PatientCard';
import InstitutionCard from '../../components/InstitutionCard/InstitutionCard';
import ShowImagesToggle from '../../components/ShowImagesToggle/ShowImagesToggle';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import PatientService from '../../services/PatientService';
import { Patient } from '../../models/Patient';

const IndividualResult: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        async function fetchPatient() {
            try {
                const fetchedPatients = await PatientService.getPatients();
                const selectedPatient = fetchedPatients.find(p => p.id === parseInt(id));
                setPatient(selectedPatient || null);
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        }
        fetchPatient();
    }, [id]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <IonPage>
            <NavbarHeader title={`Paciente No. ${patient.id}`} />

            <IonContent className='ion-padding'>
                <ShowImagesToggle />

                <h5>Detalles del paciente</h5>

                <PatientCard
                    patient={patient}
                    imageUrl={`src/assets/img/patient-${patient.id}.jpg`}
                    buttonLabel='Contactar'
                    link='/contact-institution'
                />

                <h5>Institución en la que se encuentra registrado</h5>

                <InstitutionCard
                    imageUrl="src/assets/img/institution-1.jpg"
                    title='Hospital IMSS Región Córdoba'
                    content='El IMSS en Córdoba se ubica en una zona accesible de la ciudad, con conexiones viales
                        convenientes tanto para peatones como para usuarios de transporte público… Ver más'
                />
            </IonContent>
        </IonPage>
    );
};

export default IndividualResult;
