import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonToast } from '@ionic/react';
import { Patient } from '../../models/Patient';
import ErrorOrException from '../../components/Placeholders/ErrorOrException';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import CardPlaceholder from '../../components/Placeholders/CardPlaceholder';
import PatientCard from '../../components/PatientCard/PatientCard';
import InstitutionCard from '../../components/InstitutionCard/InstitutionCard';
import { Institution } from '../../models/Institution';
import useTextToSpeechClick from '../../hooks/UseTextToSpeechClick';
import { useSearchContext } from '../../contexts/SearchContext';

const IndividualResult: React.FC = () => {
    useTextToSpeechClick();

    const { searchResults, selectedPatientId, setSelectedPatientId } = useSearchContext();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [institution, setInstitution] = useState<Institution | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
    const [showFailedToast, setShowFailedToast] = useState<boolean>(false);
    const history = useHistory();

    const fetchPatientAndInstitution = async () => {
        try {

            // Asegúrate de que haya un paciente seleccionado
            if (!selectedPatientId) {
                throw new Error('No se ha seleccionado ningún paciente');
            }

            // Busca el paciente en `searchResults` utilizando el `selectedPatientId` del contexto
            const selectedPatient = searchResults.find(patient => patient.id === selectedPatientId);
            if (!selectedPatient) {
                throw new Error('Paciente no encontrado en los resultados de búsqueda');
            }

            // Asigna el paciente y su institución directamente desde `searchResults`
            setPatient(selectedPatient);
            setInstitution(selectedPatient.institution);
            console.log('Paciente encontrado:', selectedPatient);

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
    });

    const handleRetry = () => {
        setLoading(true);
        setErrorOccurred(false);
        fetchPatientAndInstitution();
    };

    const handleGoToHome = () => {
        history.push('/upload-images');
    };

    const handleSelectPatient = () => {
        history.push(`/contact-institution`);
    };

    return (
        <IonPage>
            <NavbarHeader title="Ficha del paciente" />

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
                                onSelect={() => handleSelectPatient()}
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
