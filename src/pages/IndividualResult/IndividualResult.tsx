import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import PatientCard from '../../components/PatientCard/PatientCard';
import InstitutionCard from '../../components/InstitutionCard/InstitutionCard';
import ShowImagesToggle from '../../components/ShowImagesToggle/ShowImagesToggle';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import PatientService from '../../services/PatientService';
import InstitutionService from '../../services/InstitutionService';
import { Patient } from '../../models/Patient';
import { Institution } from '../../models/Institution';
import CardPlaceholder from '../../components/Placeholders/CardPlaceholder';
import ErrorOrException from '../../components/Placeholders/ErrorOrException';

const IndividualResult: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [institution, setInstitution] = useState<Institution | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();
    const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
    const [showFailedToast, setShowFailedToast] = useState<boolean>(false);

    const fetchPatient = async () => {
        try {
            // throw new Error('Error ficticio para probar el manejo de errores');

            setShowFailedToast(false);

            const selectedPatient = await PatientService.getPatientById(parseInt(id));
            if (!selectedPatient) {
                throw new Error('Patient not found');
            }
            setPatient(selectedPatient);

            const patientInstitution = await InstitutionService.getInstitutionById(selectedPatient.institutionId);
            setInstitution(patientInstitution || null);
            setLoading(false);
            setErrorOccurred(false);
        } catch (error) {
            console.error('Error al obtener el paciente o la institución:', error);
            setLoading(false);
            setErrorOccurred(true);
            setShowFailedToast(true);
        }
    };

    useEffect(() => {
        fetchPatient();
    }, [id]);

    const handleRetry = () => {
        setLoading(true);
        setErrorOccurred(false);
        fetchPatient();
    };

    const handleGoToHome = () => {
        history.push('/upload-images');
    };

    return (
        <IonPage>
            <NavbarHeader title={patient ? `Paciente No. ${patient.id}` : 'Cargando...'} />

            <IonContent className='ion-padding'>

                {!loading && errorOccurred && (
                    <ErrorOrException
                        title="Ocurrió un error"
                        message="Sucedio un error al cargar la información del paciente seleccionado. Por favor, intente cargarla de nuevo o regrese al inicio."
                        showRetryButton={true}
                        showHomeButton={true}
                        onRetry={handleRetry}
                        onHome={handleGoToHome}
                    />
                )}

                {loading && (
                    <>
                        <ShowImagesToggle />
                        <h5>Detalles del paciente</h5>
                        <CardPlaceholder />
                        <h5>Institución en la que se encuentra registrado</h5>
                        <CardPlaceholder />
                    </>
                )}

                {!errorOccurred && (
                    <>
                        <ShowImagesToggle />

                        <h5>Detalles del paciente</h5>

                        {patient && (
                            <PatientCard
                                patient={patient}
                                imageUrl={`src/assets/img/patient-${patient.id}.jpg`}
                                buttonLabel='Contactar'
                                link='/contact-institution'
                            />
                        )}

                        <h5>Institución en la que se encuentra registrado</h5>

                        {institution && (
                            <InstitutionCard
                                institution={institution}
                                showButton={true}
                            />
                        )}
                    </>
                )}

                <IonToast mode='ios'
                    isOpen={showFailedToast}
                    onDidDismiss={() => setShowFailedToast(false)}
                    message="Error al obtener la información del paciente o la institución. Por favor, inténtelo más tarde."
                    duration={3000}
                    color="danger"
                />

            </IonContent>
        </IonPage>
    );
};

export default IndividualResult;
