import React, { useEffect, useState } from 'react';
import { IonContent, IonIcon, IonPage, IonToast } from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
import PatientCard from '../../components/PatientCard/PatientCard';
import ShowImagesToggle from '../../components/ShowImagesToggle/ShowImagesToggle';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import PatientService from '../../services/PatientService';
import { Patient } from '../../models/Patient';
import { useHistory } from 'react-router';
import CardPlaceholder from '../../components/Placeholders/CardPlaceholder';
import ErrorOrException from '../../components/Placeholders/ErrorOrException';
import './SearchResults.css';

const SearchResults: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();
    const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
    const [showFailedToast, setShowFailedToast] = useState<boolean>(false);

    const fetchPatients = async () => {
        try {
            // throw new Error('Error ficticio para probar el manejo de errores');

            setShowFailedToast(false);

            const fetchedPatients = await PatientService.getPatients();
            setPatients(fetchedPatients);
            setLoading(false);
            setErrorOccurred(false);
        } catch (error) {
            console.error('Error al obtener los pacientes:', error);
            setLoading(false);
            setErrorOccurred(true);
            setShowFailedToast(true);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleRetry = () => {
        setLoading(true);
        setErrorOccurred(false);
        fetchPatients();
    };

    const handleGoToHome = () => {
        history.push('/upload-images');
    };

    return (
        <IonPage>
            <NavbarHeader title="Resultados" />

            <IonContent className='ion-padding'>

                {errorOccurred && (
                    <ErrorOrException
                        title="Ocurrió un error"
                        message="Sucedio un error al cargar los resultados de los pacientes. Por favor, intente cargarlos de nuevo o regrese al inicio."
                        showRetryButton={true}
                        showHomeButton={true}
                        onRetry={handleRetry}
                        onHome={handleGoToHome}
                    />
                )}

                {!loading && patients.length === 0 && !errorOccurred && (
                    <div>
                        <ErrorOrException
                            title="Ningún resultado encontrado"
                            message="Lo sentimos, no se encontraron pacientes que coincidan con los parámetros de búsqueda que nos proporcionaste. Puedes intentar con otra información o imagenes diferentes."
                            showHomeButton={true}
                            onHome={handleGoToHome}
                        />
                    </div>
                )}

                {loading && (
                    <>
                        <p>Las siguientes imágenes pueden ser no aptas para cualquier tipo de público. Se recomienda discreción.</p>

                        <div className='filter-toggle'>
                            <IonIcon icon={filterOutline} size='large' className="ion-margin-end" />
                            <ShowImagesToggle />
                        </div>

                        {[...Array(5)].map((_, index) => (
                            <CardPlaceholder key={index} />
                        ))}
                    </>
                )}

                {!loading && patients.length > 0 && !errorOccurred && (
                    <>
                        <p>Las siguientes imágenes pueden ser no aptas para cualquier tipo de público. Se recomienda discreción.</p>

                        <div className='filter-toggle'>
                            <IonIcon icon={filterOutline} size='large' className="ion-margin-end" />
                            <ShowImagesToggle />
                        </div>

                        {!loading && patients.length > 0 && (
                            patients.map((patient, index) => (
                                <PatientCard
                                    key={patient.id}
                                    patient={patient}
                                    imageUrl={`src/assets/img/patient-${index + 1}.jpg`}
                                    buttonLabel='Ver resultado'
                                    link={`/individual-result/${patient.id}`}
                                />
                            ))
                        )}
                    </>
                )}

                {/* Toast for fetch failure */}
                <IonToast mode='ios'
                    isOpen={showFailedToast}
                    onDidDismiss={() => setShowFailedToast(false)}
                    message="Error al obtener los resultados de pacientes. Por favor, inténtelo más tarde."
                    duration={3000}
                    color="danger"
                />

            </IonContent>
        </IonPage>
    );
};

export default SearchResults;
