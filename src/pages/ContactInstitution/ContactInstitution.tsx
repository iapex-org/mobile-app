import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage, IonSelect, IonSelectOption, IonText, IonTextarea, IonToast } from '@ionic/react';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createContactRequest } from '../../services/ContactRequestService';
import { ContactRequest } from '../../models/ContactRequest';

const ContactInstitution: React.FC = () => {
    const [errorToast, setErrorToast] = useState<string>('');
    const [successToast, setSuccessToast] = useState<string>('');
    const [showOtherRelationship, setShowOtherRelationship] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    // Definir los campos del formulario
    type FormField = "interestedPersonName" | "missingPersonName" | "relationship" | "otherRelationship" | "phoneNumber" | "email" | "message";

    // Configuración del useForm para el manejo del formulario
    const { register, handleSubmit, setError, trigger, setValue, setFocus, formState: { errors, touchedFields, dirtyFields }, getValues } = useForm({
        mode: 'all',
        defaultValues: {
            interestedPersonName: '',
            missingPersonName: 'Luis David Pérez García', // Valor por defecto para el nombre de la persona buscada
            relationship: '',
            otherRelationship: '',
            phoneNumber: '',
            email: '',
            message: '',
        }
    });

    // Función para manejar el cambio en el campo de parentesco
    const handleRelationshipChange = (value: string) => {
        setShowOtherRelationship(value === "otro");
        if (value !== "otro") setValue('otherRelationship', '');
    };

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
            await handleSubmit(onSubmit)();
        } else {
            setFocus(Object.keys(errors)[0] as FormField);
            setErrorToast('Complete correctamente todos los campos antes de continuar.');
        }
    };

    // Función para enviar la solicitud de contacto
    const onSubmit: SubmitHandler<ContactRequest> = async (data) => {
        try {
            // Crear una copia del objeto de datos con el tipo adecuado.
            const tempData = { ...data } as { relationship: string; otherRelationship?: string };

            const relationship = tempData.relationship === 'otro'
                ? tempData.otherRelationship ?? ''
                : tempData.relationship;

            // Crear un nuevo objeto sin `otherRelationship`.
            const cleanedData: ContactRequest = {
                ...data,
                relationship
            };

            const patient = parseInt(id, 10);
            if (isNaN(patient)) {
                setErrorToast('ID de paciente no válido.');
                return;
            }

            const contactData = { ...cleanedData, patient };
            console.log(contactData); // Verificar datos enviados.

            const responseData = await createContactRequest(contactData);
            if (responseData) {
                history.push(`/process-completed`);
                setSuccessToast('Solicitud enviada correctamente.');
            }
        } catch (error: any) {
            console.error(error);
            setErrorToast(error.message || 'Hubo un error al enviar los datos. Inténtalo de nuevo.');
        }
    };

    return (
        <IonPage>
            <NavbarHeader title="Contactar" />
            <IonContent className='ion-padding'>
                <form onSubmit={e => e.preventDefault()}>
                    <p>Llene los campos con los datos requeridos para concluir su solicitud de contacto con la institución que resguarda a la persona desaparecida.</p>
                    <IonList mode='ios'>
                        {/* Nombre del interesado */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Nombre completo"
                                inputmode="text"
                                labelPlacement="stacked"
                                clearInput
                                color={errors.interestedPersonName && (touchedFields.interestedPersonName || dirtyFields.interestedPersonName) ? "danger" : "primary"}
                                placeholder="Ingresa tu nombre completo"
                                {...register("interestedPersonName", {
                                    required: "El nombre completo es requerido",
                                    minLength: { value: 2, message: "El nombre completo no puede ser menor a 2 caracteres." },
                                    maxLength: { value: 100, message: "El nombre completo no puede ser mayor a 100 caracteres." }
                                })}
                            />
                        </IonItem>
                        {errors.interestedPersonName && (touchedFields.interestedPersonName || dirtyFields.interestedPersonName) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.interestedPersonName.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Nombre de la persona extraviada */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Nombre de la persona extraviada"
                                clearInput
                                labelPlacement="stacked"
                                readonly
                                {...register("missingPersonName")}
                            />
                        </IonItem>
                        {/* Parentesco con la persona extraviada */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Parentesco con la persona extraviada"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.relationship && (touchedFields.relationship || dirtyFields.relationship) ? "danger" : "primary"}
                                placeholder="Selecciona tu parentesco con la persona extraviada"
                                onIonChange={(e) => handleRelationshipChange(e.detail.value)}
                                {...register("relationship", {
                                    required: "El parentesco con la persona extraviada es requerido."
                                })}>
                                <IonSelectOption value="Madre">Madre</IonSelectOption>
                                <IonSelectOption value="Padre">Padre</IonSelectOption>
                                <IonSelectOption value="Hermano/a">Hermano/a</IonSelectOption>
                                <IonSelectOption value="Hijo/a">Hijo/a</IonSelectOption>
                                <IonSelectOption value="Esposo/a">Esposo/a</IonSelectOption>
                                <IonSelectOption value="Pareja">Pareja</IonSelectOption>
                                <IonSelectOption value="Abuelo/a">Abuelo/a</IonSelectOption>
                                <IonSelectOption value="Tío/a">Tío/a</IonSelectOption>
                                <IonSelectOption value="Primo/a">Primo/a</IonSelectOption>
                                <IonSelectOption value="Amigo/a">Amigo/a</IonSelectOption>
                                <IonSelectOption value="Conocido/a">Conocido/a</IonSelectOption>
                                <IonSelectOption value="otro">Otro</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.relationship && (touchedFields.relationship || dirtyFields.relationship) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.relationship.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Otro parentesco con la persona extraviada */}
                        {showOtherRelationship && (
                            <IonItem className='ion-margin-bottom'>
                                <IonInput label="Otro parentesco"
                                    mode='ios'
                                    labelPlacement="stacked"
                                    color={errors.otherRelationship && (touchedFields.otherRelationship || dirtyFields.otherRelationship) ? "danger" : "primary"}
                                    placeholder="Ingresa un parentesco"
                                    {...register("otherRelationship", {
                                        required: "El parentesco con la persona extraviada es requerido.",
                                        minLength: { value: 2, message: "El parentesco no puede ser menor a 2 caracteres." },
                                        maxLength: { value: 25, message: "El parentesco no puede ser mayor a 25 caracteres." }
                                    })}>
                                </IonInput>
                            </IonItem>
                        )}
                        {showOtherRelationship && errors.otherRelationship && (touchedFields.otherRelationship || dirtyFields.otherRelationship) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.otherRelationship.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Número de telefono del interesado */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Número de teléfono (opcional)"
                                clearInput
                                inputmode="tel"
                                minlength={10}
                                maxlength={10}
                                labelPlacement="stacked"
                                color={errors.phoneNumber && (touchedFields.phoneNumber || dirtyFields.phoneNumber) ? "danger" : "primary"}
                                placeholder="Ej. 2705006910"
                                {...register("phoneNumber", {
                                    pattern: { value: /^[0-9]{10}$/, message: "El número de teléfono debe tener 10 dígitos." },
                                    validate: validateContactInfo
                                })}
                            />
                        </IonItem>
                        {errors.phoneNumber && (touchedFields.phoneNumber || dirtyFields.phoneNumber) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.phoneNumber.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Correo electrónico del interesado */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput
                                label="Correo electrónico (opcional)"
                                clearInput
                                inputmode="email"
                                labelPlacement="stacked"
                                color={errors.email && (touchedFields.email || dirtyFields.email) ? "danger" : "primary"}
                                placeholder="Ej. contacto@dominio.com"
                                {...register("email", {
                                    maxLength: { value: 100, message: "El correo electrónico no puede ser mayor a 100 caracteres." },
                                    pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Ingrese una dirección de correo electrónico válida." },
                                    validate: validateContactInfo,
                                })}
                            />
                        </IonItem>
                        {errors.email && (touchedFields.email || dirtyFields.email) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.email.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Mensaje de la solicitud */}
                        <IonItem className='ion-margin-bottom'>
                            <IonTextarea
                                label="Mensaje (Opcional)"
                                labelPlacement="stacked"
                                placeholder="Algún mensaje o nota para la persona encargada de dar seguimiento a tu solicitud"
                                {...register("message", {
                                    maxLength: { value: 255, message: "El mensaje no puede ser mayor a 255 caracteres." }
                                })}
                            />
                        </IonItem>
                        {errors.message && (touchedFields.message || dirtyFields.message) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.message.message as string}
                                </IonText>
                            </div>
                        )}
                    </IonList>
                    <IonButton type='button' onClick={handleValidateAndSubmit} className='ion-margin-top' expand="block" mode='ios'>Enviar solicitud</IonButton>
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

                <IonToast mode='ios'
                    isOpen={!!successToast}
                    position="top"
                    message={successToast}
                    duration={3000}
                    onDidDismiss={() => setSuccessToast('')}
                    color="success"
                />

            </IonContent>
        </IonPage>
    );
};

export default ContactInstitution;