import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonToast } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import InstitutionCard from '../../components/InstitutionCard/InstitutionCard';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import InstitutionService from '../../services/InstitutionService';
import { Institution } from '../../models/Institution';
import CardPlaceholder from '../../components/Placeholders/CardPlaceholder';
import ErrorOrException from '../../components/Placeholders/ErrorOrException';
import PatientService from '../../services/PatientService';

const InstitutionInformation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [institution, setInstitution] = useState<Institution | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();
    const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
    const [showFailedToast, setShowFailedToast] = useState<boolean>(false);

    const fetchInstitution = async () => {
        try {
            // throw new Error('Error ficticio para probar el manejo de errores');

            setShowFailedToast(false);

            const patientInstitution = await InstitutionService.getInstitutionById(parseInt(id));
            setInstitution(patientInstitution || null);
            setLoading(false);
            setErrorOccurred(false);
        } catch (error) {
            console.error('Error al obtener la información de la institución:', error);
            setLoading(false);
            setErrorOccurred(true);
            setShowFailedToast(true);
        }
    };

    useEffect(() => {
        fetchInstitution();
    }, [id]);

    const handleRetry = () => {
        setLoading(true);
        setErrorOccurred(false);
        fetchInstitution();
    };

    const handleGoToHome = () => {
        history.push('/upload-images');
    };

    return (
        <IonPage>
            <NavbarHeader title={institution ? institution.name : ''} />

            <IonContent className='ion-padding'>

                {errorOccurred && (
                    <ErrorOrException
                        title="Ocurrió un error"
                        message="Sucedio un error al cargar la información de la institución. Por favor, intente cargarla de nuevo o regrese al inicio."
                        showRetryButton={true}
                        showHomeButton={true}
                        onRetry={handleRetry}
                        onHome={handleGoToHome}
                    />
                )}

                {!loading && !errorOccurred && institution && (
                    <InstitutionCard
                        institution={institution}
                        showButton={false}
                    />
                )}

                {loading && (
                    <>
                        {[...Array(2)].map((_, index) => (
                            <CardPlaceholder key={index} />
                        ))}
                    </>
                )}

                <IonToast mode='ios'
                    isOpen={showFailedToast}
                    onDidDismiss={() => setShowFailedToast(false)}
                    message="Error al obtener la infomación de la institución. Por favor, inténtelo más tarde."
                    duration={3000}
                    color="danger"
                />

            </IonContent>
        </IonPage>
    );
};

export default InstitutionInformation;
