import React from 'react';
import { useParams } from 'react-router-dom';
import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage, IonTextarea } from '@ionic/react';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';

const ContactInstitution: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <IonPage>
            <NavbarHeader title="Contactar" />

            <IonContent className='ion-padding'>
                <p>¡Estas a un paso de reunirte con esa persona querida! Llena los campos con los datos requeridos para concluir tu solicitud.</p>

                <h4>Tu información de contacto</h4>
                <IonList>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Nombre(s)" labelPlacement="stacked" placeholder="Ingresa tu nombre"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Apellido materno" labelPlacement="stacked" placeholder="Ingresa tu apellido materno"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Apellido paterno" labelPlacement="stacked" placeholder="Ingresa tu apellido paterno"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Número de teléfono" labelPlacement="stacked" placeholder="Ej. 221-236-2345"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Correo electrónico (opcional)" labelPlacement="stacked" placeholder="correo@ejemplo.com"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonTextarea label="Mensaje (Opcional)" labelPlacement="stacked" placeholder="Algún mensaje o nota para la persona encargada de dar seguimiento a tu solicitud"></IonTextarea>
                    </IonItem>
                </IonList>

                <IonButton className='ion-margin-top' expand="block" mode='ios' routerLink={`/process-completed/${id}`}>Contactar</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default ContactInstitution;
