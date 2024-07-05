import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonAlert, IonContent, IonPage } from '@ionic/react';
import PatientCard from '../../components/PatientCard/PatientCard';
import InstitutionCard from '../../components/InstitutionCard/InstitutionCard';
import ShowImagesToggle from '../../components/ShowImagesToggle/ShowImagesToggle';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import PatientService from '../../services/PatientService';
import InstitutionService from '../../services/InstitutionService';
import { Patient } from '../../models/Patient';
import { Institution } from '../../models/Institution';

const IndividualResult: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [institution, setInstitution] = useState<Institution | null>(null);
    const history = useHistory();
    const [errorAlert, setErrorAlert] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const fetchPatient = async () => {
        try {
            const fetchedPatients = await PatientService.getPatients();
            const selectedPatient = fetchedPatients.find(p => p.id === parseInt(id));
            if (!selectedPatient) {
                throw new Error('Patient not found');
            }
            setPatient(selectedPatient);

            const institutions = await InstitutionService.getInstitutions();
            const patientInstitution = institutions.find(inst => inst.id === selectedPatient.institutionId);
            setInstitution(patientInstitution || null);
        } catch (error) {
            console.error('Error fetching patient or institution:', error);
            setErrorAlert('Error al cargar la información del paciente seleccionado');
            setShowAlert(true);
        }
    };

    useEffect(() => {
        fetchPatient();
    }, [id]);

    const handleRetry = () => {
        setShowAlert(false);
        setPatient(null);
        setInstitution(null);
        setErrorAlert('');
        fetchPatient();
    };

    if (!patient) {
        return null;
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

                {institution ? (
                    <InstitutionCard
                        institution={institution}
                        showButton={true}
                    />
                ) : (
                    <p>La institución no está disponible.</p>
                )}
            </IonContent>

            <IonAlert mode='ios'
                header="Ocurrio un error"
                message={errorAlert}
                isOpen={showAlert}
                buttons={[
                    {
                        text: 'Ir a inicio',
                        handler: () => {
                            history.push('/upload-images')
                        },
                    },
                    {
                        text: 'Reintentar',
                        handler: handleRetry,
                    },
                ]}
            ></IonAlert>

        </IonPage>
    );
};

export default IndividualResult;
