import React, { useEffect, useState } from 'react';
import { IonAlert, IonContent, IonPage } from '@ionic/react';
import InstitutionCard from '../../components/InstitutionCard/InstitutionCard';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import InstitutionService from '../../services/InstitutionService';
import { Institution } from '../../models/Institution';
import { useHistory } from 'react-router';

const InstitutionInformation: React.FC = () => {
    const [institution, setInstitution] = useState<Institution | null>(null);
    const history = useHistory();
    const [errorAlert, setErrorAlert] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const fetchInstitution = async () => {
        try {
            const fetchedInstitutions = await InstitutionService.getInstitutions();
            setInstitution(fetchedInstitutions[0]); // Obtener la primera institución para este ejemplo
        } catch (error) {
            console.error('Error fetching institution:', error);
        }
    }

    useEffect(() => {
        fetchInstitution();
    }, []);

    const handleRetry = () => {
        setShowAlert(false);
        setInstitution(null);
        setInstitution(null);
        setErrorAlert('');
        fetchInstitution();
    };

    if (!institution) {
        return null;
    }

    return (
        <IonPage>
            <NavbarHeader title={institution.name} />

            <IonContent className='ion-padding'>
                <InstitutionCard
                    institution={institution}
                    showButton={false}
                />
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

export default InstitutionInformation;
