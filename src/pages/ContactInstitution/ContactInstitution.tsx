import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage, IonSelect, IonSelectOption, IonText, IonTextarea, IonToast } from '@ionic/react';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import { useForm } from 'react-hook-form';
import { createContact } from '../../services/ContactService';

const ContactInstitution: React.FC = () => {
    // Definición de tipos y estado
    type FormField = "missingPersonName" | "email" | "phoneNumber" | "name" | "firstLastName" | "secondLastName" | "relationship" | "message";
    const [errorToast, setErrorToast] = useState<string>('');
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    // Configuración del useForm para el manejo del formulario
    const { register, handleSubmit, setError, trigger, setValue, setFocus, formState: { errors, touchedFields, dirtyFields }, getValues } = useForm({
        mode: 'all',
        defaultValues: {
            missingPersonName: 'Luis David Pérez García', // Valor por defecto para el nombre de la persona buscada
            email: '',
            phoneNumber: '',
            name: '',
            firstLastName: '',
            secondLastName: '',
            relationship: '',
            message: '',
        }
    });

    // Validación personalizada para asegurarse de que al menos se proporcione un número de teléfono o correo electrónico
    const validateContactInfo = () => {
        const values = getValues();
        if (!values.phoneNumber && !values.email) {
            setError('phoneNumber', { type: 'validate', message: 'Debes proporcionar al menos un número de teléfono o correo electrónico' });
            return false;
        }
        return true;
    };

    // Marcar todos los campos como "touched" para mostrar errores al usuario
    const markAllFieldsAsTouched = () => {
        (Object.keys(getValues()) as FormField[]).forEach((key) => {
            setValue(key, getValues()[key], { shouldValidate: true, shouldTouch: true });
        });
    };

    // Función para manejar la presentación de errores y enviar el formulario si es válido
    const handleValidateAndSubmit = async () => {
        await markAllFieldsAsTouched();
        const isValid = await trigger();
        if (isValid) {
            const data = await handleSubmit(onSubmit)(); // Enviar el formulario si es válido
            history.push(`/process-completed/${id}`); // Redirigir a la página de proceso completado con el ID
        } else {
            setFocus(Object.keys(errors)[0] as FormField); // Enfocar el primer campo con error
            setErrorToast('Por favor, corrija los campos incorrectos antes de continuar.'); // Mostrar un mensaje de error
        }
    };

    // Función para manejar la presentación del mensaje de confirmación
    const onSubmit = async (data: any) => {
        try {
            console.log(data); // Verifica que los datos se estén enviando correctamente
            await createContact(data); // Llama a tu función para enviar los datos a la API
            history.push(`/process-completed/${id}`); // Redirige al usuario a la página de proceso completado
        } catch (error) {
            console.error(error);
            setErrorToast('Hubo un error al enviar los datos. Inténtalo de nuevo.'); // Muestra un mensaje de error si falla la solicitud
        }
    };
    

    

    return (
        <IonPage>
            <NavbarHeader title="Contactar" />
            <IonContent className='ion-padding'>
                <form onSubmit={e => e.preventDefault()}>
                    <p>¡Estás a un paso de reunirte con esa persona querida! Llena los campos con los datos requeridos para concluir tu solicitud.</p>
                    <IonList mode='ios'>
                        {/* Campos del formulario */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput
                                label="Nombre(s)"
                                inputmode="text"
                                labelPlacement="stacked"
                                clearInput
                                color={errors.name && (touchedFields.name || dirtyFields.name) ? "danger" : "primary"}
                                placeholder="Ingresa tu nombre"
                                {...register("name", {
                                    required: "El nombre es requerido",
                                    minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
                                    maxLength: { value: 200, message: "El nombre no puede tener más de 200 caracteres" }
                                })}
                            />
                        </IonItem>
                        {/* Manejo de errores solo en este campo */}
                        {errors.name && (touchedFields.name || dirtyFields.name) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.name.message as string}
                            </IonText>
                        )}
                        
                        <IonItem className='ion-margin-bottom'>
                            <IonInput
                                label="Nombre de la persona que buscas"
                                clearInput
                                labelPlacement="stacked"
                                readonly
                                color={errors.missingPersonName && (touchedFields.missingPersonName || dirtyFields.missingPersonName) ? "danger" : "primary"}
                                placeholder="Nombre completo de la persona que buscas"
                                {...register("missingPersonName", {
                                    required: "El nombre de la persona que buscas es requerido",
                                })}
                            />
                        </IonItem>
                        {errors.missingPersonName && (touchedFields.missingPersonName || dirtyFields.missingPersonName) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.missingPersonName.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect mode='ios'
                                label="Parentesco con la persona a contactar"
                                labelPlacement="stacked"
                                color={errors.relationship && (touchedFields.relationship || dirtyFields.relationship) ? "danger" : "primary"}
                                placeholder="Ingresa tu parentesco con la persona a contactar"
                                {...register("relationship", {
                                    required: "El parentesco es requerido"
                                })}
                            >
                                <IonSelectOption value="Padre">Padre/Madre</IonSelectOption>
                                <IonSelectOption value="Hermano">Hermano/Hermana</IonSelectOption>
                                <IonSelectOption value="Abuelo">Abuelo/Abuela</IonSelectOption>
                                <IonSelectOption value="Tio">Tío/Tía</IonSelectOption>
                                <IonSelectOption value="Primo">Primo/Prima</IonSelectOption>
                                <IonSelectOption value="Amigo">Amigo/Amiga</IonSelectOption>
                                
                            </IonSelect>
                        </IonItem>
                        {errors.relationship && (touchedFields.relationship || dirtyFields.relationship) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.relationship.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput
                                label="Número de teléfono (opcional)"
                                clearInput
                                labelPlacement="stacked"
                                color={errors.phoneNumber && (touchedFields.phoneNumber || dirtyFields.phoneNumber) ? "danger" : "primary"}
                                placeholder="Ej. 221-236-2345"
                                {...register("phoneNumber", {
                                    pattern: { value: /^[0-9]{10}$/, message: "El número de teléfono debe tener 10 dígitos" },
                                    validate: validateContactInfo,
                                })}
                            />
                        </IonItem>
                        {errors.phoneNumber && (touchedFields.phoneNumber || dirtyFields.phoneNumber) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.phoneNumber.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput
                                label="Correo electrónico (opcional)"
                                clearInput
                                labelPlacement="stacked"
                                color={errors.email && (touchedFields.email || dirtyFields.email) ? "danger" : "primary"}
                                placeholder="Ej. contacto@dominio.com"
                                {...register("email", {
                                    pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "El correo electrónico no es válido" },
                                    validate: validateContactInfo,
                                })}
                            />
                        </IonItem>
                        {errors.email && (touchedFields.email || dirtyFields.email) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.email.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonTextarea
                                label="Mensaje (Opcional)"
                                labelPlacement="stacked"
                                placeholder="Algún mensaje o nota para la persona encargada de dar seguimiento a tu solicitud"
                                {...register("message")}
                            />
                        </IonItem>
                    </IonList>
                    <IonButton type='button' onClick={handleValidateAndSubmit} className='ion-margin-top' expand="block" mode='ios'>Contactar</IonButton>
                </form>

                {/* Manejo de errores en todo el formulario */}
                <IonToast mode='ios'
                    isOpen={!!errorToast}
                    position="top"
                    message={errorToast}
                    duration={3000}
                    onDidDismiss={() => setErrorToast('')}
                    color={'danger'}
                />

            </IonContent>
        </IonPage>
    );
};

export default ContactInstitution;


