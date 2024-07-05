// Importaciones de Ionic y React
import React, { useEffect, useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import InstitutionCard from '../../components/InstitutionCard/InstitutionCard';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import InstitutionService from '../../services/InstitutionService';
import { Institution } from '../../models/Institution';
// import './InstitutionInformation.css';

const InstitutionInformation: React.FC = () => {
    const [institution, setInstitution] = useState<Institution | null>(null);

    useEffect(() => {
        async function fetchInstitution() {
            try {
                const fetchedInstitutions = await InstitutionService.getInstitutions();
                setInstitution(fetchedInstitutions[0]); // Obtener la primera institución para este ejemplo
            } catch (error) {
                console.error('Error fetching institution:', error);
            }
        }
        fetchInstitution();
    }, []);

    if (!institution) {
        return <div>Loading...</div>;
    }

    return (
        <IonPage>
            <NavbarHeader title={institution.name} />

            <IonContent className='ion-padding'>
                <InstitutionCard
                    institution={institution}
                    showButton={false}
                />
                <InstitutionCard
                    institution={{
                        ...institution,
                        description: 'Se enlistan datos adicionales de la institución de salud, tales como número total de camas, número de camas disponibles, número de camas ocupadas, requisitos de ingreso, así como otros datos operativos esenciales acerca de cada institución de salud.'
                    }}
                    showButton={false}
                />
            </IonContent>
        </IonPage>
    );
};

export default InstitutionInformation;
