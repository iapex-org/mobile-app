// pages/SearchResults/SearchResults.tsx
import React, { useEffect, useState } from 'react';
import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
import PatientCard from '../../components/PatientCard/PatientCard';
import ShowImagesToggle from '../../components/ShowImagesToggle/ShowImagesToggle';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import PatientService from '../../services/PatientService';
import { Patient } from '../../models/Patient';
import './SearchResults.css';

const SearchResults: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        async function fetchPatients() {
            try {
                const fetchedPatients = await PatientService.getPatients();
                setPatients(fetchedPatients);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        }
        fetchPatients();
    }, []);

    return (
        <IonPage>
            <NavbarHeader title="Resultados" />

            <IonContent className='ion-padding'>
                <p>Las siguientes imágenes pueden ser no aptas para cualquier tipo de público. Se recomienda discreción.</p>

                <div className='filter-toggle'>
                    <IonIcon icon={filterOutline} size='large' className="ion-margin-end" />
                    <ShowImagesToggle />
                </div>

                {patients.map((patient, index) => (
                    <PatientCard
                        key={patient.id}
                        patient={patient}
                        imageUrl={`src/assets/img/patient-${index + 1}.jpg`}
                        buttonLabel='Ver resultado'
                        link='/individual-result'
                    />
                ))}
            </IonContent>
        </IonPage>
    );
};

export default SearchResults;
