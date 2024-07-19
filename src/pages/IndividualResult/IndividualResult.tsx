import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonToast } from '@ionic/react';
import { Patient } from '../../models/Patient';
import PatientService from '../../services/PatientService';
import ErrorOrException from '../../components/Placeholders/ErrorOrException';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import CardPlaceholder from '../../components/Placeholders/CardPlaceholder';
import PatientCard from '../../components/PatientCard/PatientCard';

const IndividualResult: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();
    const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
    const [showFailedToast, setShowFailedToast] = useState<boolean>(false);

    const fetchPatient = async () => {
        try {
            setShowFailedToast(false);

            // Convierte el ID a número
            const patientId = Number(id);
            if (isNaN(patientId)) {
                throw new Error('ID del paciente no es un número válido');
            }

            // Obtiene la información del paciente por ID
            const selectedPatient = await PatientService.getPatientById(patientId);
            if (!selectedPatient) {
                throw new Error('Paciente no encontrado');
            }
            setPatient(selectedPatient);

            setLoading(false);
            setErrorOccurred(false);
        } catch (error) {
            console.error('Error al obtener el paciente:', error);
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
                        message="Sucedió un error al cargar la información del paciente seleccionado. Por favor, intente cargarla de nuevo o regrese al inicio."
                        showRetryButton={true}
                        showHomeButton={true}
                        onRetry={handleRetry}
                        onHome={handleGoToHome}
                    />
                )}

                {loading && (
                    <>
                        <h5>Detalles del paciente</h5>
                        <CardPlaceholder />
                    </>
                )}

                {!errorOccurred && (
                    <>
                        <h5>Detalles del paciente</h5>
                        {patient && (
                            <PatientCard
                                patient={patient}
                                buttonLabel='Contactar'
                                link={`/contact-institution/${patient.id}`}
                            />
                        )}
                    </>
                )}

                <IonToast
                    mode='ios'
                    isOpen={showFailedToast}
                    onDidDismiss={() => setShowFailedToast(false)}
                    message="Error al obtener la información del paciente. Por favor, inténtelo más tarde."
                    duration={3000}
                    color="danger"
                />
            </IonContent>
        </IonPage>
    );
};

export default IndividualResult;
