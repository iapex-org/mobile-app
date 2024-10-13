import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonToast } from '@ionic/react';
import { Patient } from '../../models/Patient';
import PatientService from '../../services/PatientService';
import InstitutionService from '../../services/InstitutionService';
import ErrorOrException from '../../components/Placeholders/ErrorOrException';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import CardPlaceholder from '../../components/Placeholders/CardPlaceholder';
import PatientCard from '../../components/PatientCard/PatientCard';
import InstitutionCard from '../../components/InstitutionCard/InstitutionCard';
import { Institution } from '../../models/Institution';

const IndividualResult: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [institution, setInstitution] = useState<Institution | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
    const [showFailedToast, setShowFailedToast] = useState<boolean>(false);
    const history = useHistory();

    const fetchPatientAndInstitution = async () => {
        try {
            setShowFailedToast(false);

            // Convierte el ID del paciente a número
            const patientId = Number(id);
            if (isNaN(patientId)) {
                throw new Error('ID del paciente no es un número válido');
            }

            // Obtiene la información del paciente
            const selectedPatient = await PatientService.getPatientById(patientId);
            if (!selectedPatient) {
                throw new Error('Paciente no encontrado');
            }
            setPatient(selectedPatient);
            console.log('Paciente encontrado:', selectedPatient);

            // Obtiene la institución asociada usando el ID dentro de 'patient.institution.id'
            const patientInstitution = await InstitutionService.getInstitutionById(selectedPatient.institution.id);
            
            if (!patientInstitution) {
                throw new Error('Institución asociada no encontrada');
            }

            setInstitution(patientInstitution);
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
        fetchPatientAndInstitution();
    }, [id]);

    const handleRetry = () => {
        setLoading(true);
        setErrorOccurred(false);
        fetchPatientAndInstitution();
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
                        message="Sucedió un error al cargar la información del paciente o la institución. Por favor, intente cargarla de nuevo o regrese al inicio."
                        customButtons={[
                            { text: "Reintentar", action: handleRetry },
                            { text: "Ir a inicio", action: handleGoToHome },
                        ]}
                    />
                )}

                {loading && (
                    <>
                        <h5>Detalles del paciente</h5>
                        <CardPlaceholder />

                        <h5>Detalles de la institución que lo alberga</h5>
                        <CardPlaceholder />
                    </>
                )}

                {!errorOccurred && !loading && (
                    <>
                        <h5>Detalles del paciente extraviado</h5>
                        {patient && (
                            <PatientCard
                                isDetailedView={true}
                                patient={patient}
                                buttonLabel='Contactar'
                                link={`/contact-institution/${patient.id}`}
                            />
                        )}

                        <h5>Detalles de la institución que lo resguarda</h5>
                        {institution && (
                            <InstitutionCard
                                institution={institution}
                            />
                        )}
                    </>
                )}

                <IonToast mode='ios'
                    isOpen={showFailedToast}
                    position='top'
                    message="Error al obtener la información del paciente o la institución. Por favor, inténtelo más tarde."
                    duration={3000}
                    onDidDismiss={() => setShowFailedToast(false)}
                    color="danger"
                />
            </IonContent>
        </IonPage>
    );
};

export default IndividualResult;
