import React, { useEffect, useState } from 'react';
import { IonAlert, IonContent, IonIcon, IonPage } from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
import PatientCard from '../../components/PatientCard/PatientCard';
import ShowImagesToggle from '../../components/ShowImagesToggle/ShowImagesToggle';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import PatientService from '../../services/PatientService';
import { Patient } from '../../models/Patient';
import { useHistory } from 'react-router';
import './SearchResults.css';

const SearchResults: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const history = useHistory();
    const [errorAlert, setErrorAlert] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const fetchPatients = async () => {
        try {
            const fetchedPatients = await PatientService.getPatients();
            setPatients(fetchedPatients);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setErrorAlert('Error al cargar la información de los pacientes.');
            setShowAlert(true);
        }
    }

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleRetry = () => {
        setShowAlert(false);
        fetchPatients();
    };

    return (
        <IonPage>
            <NavbarHeader title="Resultados" />

            <IonContent className='ion-padding'>
                <p>Las siguientes imágenes pueden ser no aptas para cualquier tipo de público. Se recomienda discreción.</p>

                <div className='filter-toggle'>
                    <IonIcon icon={filterOutline} size='large' className="ion-margin-end" />
                    <ShowImagesToggle />
                </div>

                {patients.length > 0 ? (
                    patients.map((patient, index) => (
                        <PatientCard
                            key={patient.id}
                            patient={patient}
                            imageUrl={`src/assets/img/patient-${index + 1}.jpg`}
                            buttonLabel='Ver resultado'
                            link={`/individual-result/${patient.id}`}
                        />
                    ))
                ) : (
                    <p>No hay pacientes disponibles.</p>
                )}
            </IonContent>

            <IonAlert mode='ios'
                header="Ocurrió un error"
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

export default SearchResults;
