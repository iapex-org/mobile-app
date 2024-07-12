import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage, IonTextarea, IonToast } from '@ionic/react';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import { useForm } from 'react-hook-form';

const ContactInstitution: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
    const {register, handleSubmit, formState: { errors }} = useForm();
    
    const [showToast, setShowToast] = useState<string>('');

    const [toastMessage, setToastMessage] = useState('');

    const handleContinue = () => {
        console.log('Continuar...');
    }


    const onError = (error: any) => {
        if (error.nombre) {
            setToastMessage(error.nombre.message);
            setShowToast('error');
        } else if (error.apellidoMaterno) {
            setToastMessage(error.apellidoMaterno.message);
            setShowToast('error');
        } else if (error.apellidoPaterno) {
            setToastMessage(error.apellidoPaterno.message);
            setShowToast('error');
        } else if (error.telefono) {
            setToastMessage(error.telefono.message);
            setShowToast('error');
        } else if (error.email) {
            setToastMessage(error.email.message);
            setShowToast('error');
        } else if (error.mensaje) {
            setToastMessage(error.mensaje.message);
            setShowToast('error');
        }
    }


    return (
        <IonPage>
            <NavbarHeader title="Contactar" />

            <IonContent className='ion-padding'>
                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <p>¡Estas a un paso de reunirte con esa persona querida! Llena los campos con los datos requeridos para concluir tu solicitud.</p>

                    <h4>Tu información de contacto</h4>
                    <IonList>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Nombre(s)" labelPlacement="stacked" placeholder="Ingresa tu nombre"
                            {...register("nombre",{required:true, pattern: {value: /^[A-Za-z]+$/i, message: "Solo se aceptan letras"}})}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Apellido materno" labelPlacement="stacked" placeholder="Ingresa tu apellido materno"
                            {...register("apellidoMaterno",{required:true, pattern: {value: /^[A-Za-z]+$/i, message: "Solo se aceptan letras"}})}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Apellido paterno" labelPlacement="stacked" placeholder="Ingresa tu apellido paterno"
                            {...register("apellidoPaterno",{required:true, pattern: {value: /^[A-Za-z]+$/i, message: "Solo se aceptan letras"}})}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Número de teléfono" labelPlacement="stacked" placeholder="Ej. 221-236-2345"
                            {...register("tel",{required:true, pattern: {value: /^[0-9]+$/i, message: "Solo se aceptan numeros"}, maxLength: {value: 10, message: "Solo se aceptan 10 digitos"}, minLength: {value: 10, message: "Solo se aceptan 10 digitos"}})}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Correo electrónico (opcional)" labelPlacement="stacked" placeholder="correo@ejemplo.com"
                            {...register("email",{pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Ingresa un correo valido"}})}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonTextarea label="Mensaje (Opcional)" labelPlacement="stacked" placeholder="Algún mensaje o nota para la persona encargada de dar seguimiento a tu solicitud"></IonTextarea>
                        </IonItem>
                    </IonList>


                    <IonButton className='ion-margin-top' expand="block" mode='ios' routerLink={`/process-completed/${id}`}>Contactar</IonButton>
                </form>

                <IonToast
                    isOpen={showToast === 'error'}
                    onDidDismiss={() => setShowToast('')}
                    message={toastMessage}
                    duration={2000}
                ></IonToast>

            </IonContent>

        </IonPage>
    );
};

export default ContactInstitution;
