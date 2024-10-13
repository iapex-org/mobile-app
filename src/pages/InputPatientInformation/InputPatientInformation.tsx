import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonText, IonToast } from '@ionic/react';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useHistory } from 'react-router';

const InputPatientInformation: React.FC = () => {
    const [errorToast, setErrorToast] = useState<string>('');
    const [successToast, setSuccessToast] = useState<string>('');
    const [showOtherFields, setShowOtherFields] = useState({ hairColor: false });
    const [hideHairFields, setHideHairFields] = useState<boolean>(false);
    const history = useHistory();

    // Definición de tipos y estado
    type FormField = "dateOfDisappearance" | "name" | "lastName" | "secondLastName" | "gender" | "age" | "skinColor" | "eyeColor" | "hairColor" | "otherHairColor" | "hairType" | "hairLength" | "complexion" | "height" | "medicalConditions" | "distinctiveFeatures" | "additionalNotes";

    // Configuración del useForm para el manejo del formulario
    const { register, handleSubmit, trigger, setValue, setFocus, watch, formState: { errors, touchedFields, dirtyFields }, getValues } = useForm({
        mode: 'all',
        defaultValues: {
            dateOfDisappearance: '',
            name: '',
            lastName: '',
            secondLastName: '',
            gender: '',
            age: '',
            skinColor: '',
            eyeColor: '',
            hairColor: '',
            otherHairColor: '',
            hairType: '',
            hairLength: '',
            complexion: '',
            height: '',
            medicalConditions: '',
            distinctiveFeatures: '',
            additionalNotes: ''
        }
    });

    const handleFieldChange = (field: string, value: string) => {
        console.log(`Cambiando el campo ${field} a ${value}`);

        const otherField = `other${field.charAt(0).toUpperCase() + field.slice(1)}`;
        console.log(`Campo alternativo determinado: ${otherField}`);

        setShowOtherFields(prevState => ({
            ...prevState,
            [field]: value === "otro",
        }));

        // Ocultar campos de tipo y color si se selecciona "Calvo"
        if (field === "hairLength") {
            setHideHairFields(value === "calvo");
        }

        console.log(`Campo adicional ${field} ${value === "otro" ? 'mostrado' : 'ocultado'}`);

        if (value !== "otro") {
            setValue(otherField as FormField, '');
            console.log(`Campo alternativo ${otherField} limpiado`);
        }
    };

    const markAllFieldsAsTouched = () => {
        (Object.keys(getValues()) as FormField[]).forEach((key) => {
            setValue(key, getValues()[key], { shouldValidate: true, shouldTouch: true });
        });
    };

    const handleValidateAndSubmit = async () => {
        await markAllFieldsAsTouched();
        const isValid = await trigger();

        // Validar solo los campos que no están ocultos
        const fieldsToValidate: FormField[] = ['hairLength', 'hairColor', 'otherHairColor', 'hairType'];
        const filteredErrors = await trigger(fieldsToValidate.filter(field => !hideHairFields || (field !== "hairType" && field !== "hairColor")));

        if (filteredErrors) {
            await handleSubmit(onSubmit)();
        } else {
            setFocus(Object.keys(errors)[0] as FormField);
            setErrorToast('Complete correctamente todos los campos antes de continuar.');
        }
    };

    const onSubmit = async (data: any) => {
        try {
            const fieldsWithOther = ['hairColor']; // Campos con opción "Otro"

            // Transformamos los campos dinámicamente usando reduce.
            const cleanedData = fieldsWithOther.reduce((acc, field) => {
                const otherField = `other${field.charAt(0).toUpperCase() + field.slice(1)}`;
                acc[field] = data[field] === 'otro' ? data[otherField] ?? '' : data[field]; // Usar valor alternativo si es "Otro".
                return acc;
            }, { ...data }); // Copia inicial de todos los datos.

            // Mostrar los datos en la consola.
            console.log('Datos enviados:', cleanedData);
            history.push(`/processing-information`);
            setSuccessToast('Solicitud enviada correctamente.');
        } catch (error: any) {
            console.error('Error:', error.message);
            setErrorToast('Hubo un error al procesar los datos.');
        }
    };

    return (
        <IonPage>
            <NavbarHeader title="Información de la persona" />

            <IonContent className='ion-padding'>

                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <p>Llena el siguiente formulario con la información de la persona desaparecida para mejores coincidencias.</p>

                    <h4>Información personal</h4>
                    <IonList>
                        {/* Fecha de extravio de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonLabel className='ion-margin-end'>Fecha de desaparición</IonLabel>
                            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                            <IonModal keepContentsMounted={true}>
                                <IonDatetime
                                    id="datetime"
                                    mode='ios'
                                    presentation="date"
                                    {...register('dateOfDisappearance', {
                                        required: 'La fecha de desaparición es requerida.',
                                        validate: (value) => {
                                            const selectedDate = new Date(value);
                                            const currentDate = new Date();

                                            if (selectedDate > currentDate) {
                                                return 'La fecha de desaparición no puede ser posterior a la fecha actual.';
                                            }
                                            return true;
                                        },
                                    })}
                                    min="1900-01-01"
                                    max={new Date().toISOString()}
                                    value={new Date().toISOString()}
                                />
                            </IonModal>
                        </IonItem>
                        {errors.dateOfDisappearance && (touchedFields.dateOfDisappearance || dirtyFields.dateOfDisappearance) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.dateOfDisappearance.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Nombre del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Nombre(s)"
                                mode='ios'
                                clearInput
                                labelPlacement="stacked"
                                placeholder="Ingresa el nombre del paciente"
                                {...register("name", {
                                    required: 'El nombre es requerido.',
                                    minLength: { value: 2, message: "El nombre no puede ser menor a 2 caracteres." },
                                    maxLength: { value: 50, message: "El nombre no puede ser mayor a 50 caracteres." }
                                })}></IonInput>
                        </IonItem>
                        {errors.name && (touchedFields.name || dirtyFields.name) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.name.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Apellido paterno del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Apellido paterno"
                                mode='ios'
                                clearInput
                                labelPlacement="stacked"
                                placeholder="Ingresa el apellido paterno del paciente"
                                {...register("lastName", {
                                    required: 'El apellido paterno es requerido.',
                                    minLength: { value: 2, message: "El apellido paterno debe tener al menos 2 caracteres." },
                                    maxLength: { value: 50, message: "El apellido paterno no puede tener más de 50 caracteres." }
                                })}></IonInput>
                        </IonItem>
                        {errors.lastName && (touchedFields.lastName || dirtyFields.lastName) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.lastName.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Apellido materno del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Apellido materno (opcional)"
                                mode='ios'
                                clearInput
                                labelPlacement="stacked"
                                placeholder="Ingresa el apellido materno del paciente"
                                {...register("secondLastName", {
                                    minLength: { value: 2, message: "El apellido materno no puede ser menor a 2 caracteres." },
                                    maxLength: { value: 50, message: "El apellido materno no puede ser mayor a 50 caracteres." }
                                })}></IonInput>
                        </IonItem>
                        {errors.secondLastName && (touchedFields.secondLastName || dirtyFields.secondLastName) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.secondLastName.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Sexo del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Sexo"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.gender && (touchedFields.gender || dirtyFields.gender) ? "danger" : "primary"}
                                placeholder="Selecciona un sexo"
                                {...register("gender", {
                                    required: "El sexo es requerido."
                                })}>
                                <IonSelectOption value="masculino">Masculino</IonSelectOption>
                                <IonSelectOption value="femenino">Femenino</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.gender && (touchedFields.gender || dirtyFields.gender) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.gender.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Edad del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Edad"
                                mode='ios'
                                clearInput
                                labelPlacement="stacked"
                                type='number'
                                placeholder="Ingresa la edad del paciente"
                                {...register("age", {
                                    required: 'La edad es requerida.',
                                    min: { value: 0, message: "La edad no puede ser menor a 0 años." },
                                    max: { value: 150, message: "La edad no puede ser mayor a 150 años." },
                                    validate: value => Number.isInteger(Number(value)) || "La edad debe ser un número entero."
                                })}></IonInput>
                        </IonItem>
                        {errors.age && (touchedFields.age || dirtyFields.age) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.age.message as string}
                                </IonText>
                            </div>
                        )}
                    </IonList>

                    <h4>Información morfológica</h4>
                    <IonList>
                        {/* Color de piel del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Color de piel"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.skinColor && (touchedFields.skinColor || dirtyFields.skinColor) ? "danger" : "primary"}
                                placeholder="Selecciona un color de piel"
                                {...register("skinColor", {
                                    required: "El color de piel es requerido."
                                })}>
                                <IonSelectOption value="clara">Clara</IonSelectOption>
                                <IonSelectOption value="morena">Morena</IonSelectOption>
                                <IonSelectOption value="oscura">Oscura</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.skinColor && (touchedFields.skinColor || dirtyFields.skinColor) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.skinColor.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Color de ojos del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Color de ojos"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.eyeColor && (touchedFields.eyeColor || dirtyFields.eyeColor) ? "danger" : "primary"}
                                placeholder="Selecciona un color de ojos"
                                {...register("eyeColor", {
                                    required: "El color de ojos es requerido."
                                })}>
                                <IonSelectOption value="cafe">Café</IonSelectOption>
                                <IonSelectOption value="negro">Negro</IonSelectOption>
                                <IonSelectOption value="azul">Azul</IonSelectOption>
                                <IonSelectOption value="verde">Verde</IonSelectOption>
                                <IonSelectOption value="gris">Gris</IonSelectOption>
                                <IonSelectOption value="avellana">Avellana</IonSelectOption>
                                <IonSelectOption value="ambar">Ámbar</IonSelectOption>
                                <IonSelectOption value="heterocromia">Heterocromía</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.eyeColor && (touchedFields.eyeColor || dirtyFields.eyeColor) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.eyeColor.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Largo del cabello del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Largo de cabello"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.hairLength && (touchedFields.hairLength || dirtyFields.hairLength) ? "danger" : "primary"}
                                placeholder="Selecciona el largo de cabello"
                                {...register("hairLength", {
                                    required: "El largo de cabello es requerido."
                                })}
                                onIonChange={(e) => handleFieldChange('hairLength', e.detail.value)}>
                                <IonSelectOption value="calvo">Calvo</IonSelectOption>
                                <IonSelectOption value="corto">Corto (Por encima de los hombros)</IonSelectOption>
                                <IonSelectOption value="medio">Medio (Hasta los hombros)</IonSelectOption>
                                <IonSelectOption value="largo">Largo (Más allá de los hombros)</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.hairLength && (touchedFields.hairLength || dirtyFields.hairLength) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.hairLength.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Tipo de cabello del paciente - Ocultar si es calvo */}
                        {!hideHairFields && (
                            <IonItem className='ion-margin-bottom'>
                                <IonSelect label="Tipo de cabello"
                                    mode='ios'
                                    labelPlacement="stacked"
                                    color={errors.hairType && (touchedFields.hairType || dirtyFields.hairType) ? "danger" : "primary"}
                                    placeholder="Selecciona un tipo de cabello"
                                    {...register("hairType", {
                                        required: "El tipo de cabello es requerido."
                                    })}>
                                    <IonSelectOption value="liso">Liso</IonSelectOption>
                                    <IonSelectOption value="ondulado">Ondulado</IonSelectOption>
                                    <IonSelectOption value="rizado">Rizado</IonSelectOption>
                                    <IonSelectOption value="crespo">Crespo</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        )}
                        {errors.hairType && !hideHairFields && (touchedFields.hairType || dirtyFields.hairType) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.hairType.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Color de cabello del paciente - Ocultar si es calvo */}
                        {!hideHairFields && (
                            <IonItem className='ion-margin-bottom'>
                                <IonSelect label="Color de cabello"
                                    mode='ios'
                                    labelPlacement="stacked"
                                    color={errors.hairColor && (touchedFields.hairColor || dirtyFields.hairColor) ? "danger" : "primary"}
                                    placeholder="Selecciona un color de cabello"
                                    onIonChange={(e) => handleFieldChange('hairColor', e.detail.value)}
                                    {...register("hairColor", {
                                        required: "El color de cabello es requerido."
                                    })}>
                                    <IonSelectOption value="negro">Negro</IonSelectOption>
                                    <IonSelectOption value="castaño">Castaño</IonSelectOption>
                                    <IonSelectOption value="rubio">Rubio</IonSelectOption>
                                    <IonSelectOption value="pelirrojo">Pelirrojo</IonSelectOption>
                                    <IonSelectOption value="canoso">Canoso</IonSelectOption>
                                    <IonSelectOption value="otro">Otro</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                        )}
                        {errors.hairColor && !hideHairFields && (touchedFields.hairColor || dirtyFields.hairColor) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.hairColor.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Otro color de cabello */}
                        {showOtherFields.hairColor && (
                            <IonItem className='ion-margin-bottom'>
                                <IonInput label="Otro color de cabello"
                                    mode='ios'
                                    clearInput
                                    labelPlacement="stacked"
                                    placeholder="Ingresa un color de cabello"
                                    {...register("otherHairColor", {
                                        required: 'El color de cabello es requerido.',
                                        minLength: { value: 2, message: "El color de cabello no puede ser menor a 2 caracteres." },
                                        maxLength: { value: 25, message: "El color de cabello no puede ser mayor a 25 caracteres." }
                                    })} />
                            </IonItem>
                        )}
                        {errors.otherHairColor && showOtherFields.hairColor && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.otherHairColor.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Complexión del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Complexión"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.complexion && (touchedFields.complexion || dirtyFields.complexion) ? "danger" : "primary"}
                                placeholder="Selecciona una complexion"
                                {...register("complexion", {
                                    required: "La complexion es requerida."
                                })}>
                                <IonSelectOption value="delgada">Delgada</IonSelectOption>
                                <IonSelectOption value="media">Media</IonSelectOption>
                                <IonSelectOption value="robusta">Robusta</IonSelectOption>
                                <IonSelectOption value="sobrepeso">Sobrepeso</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.complexion && (touchedFields.complexion || dirtyFields.complexion) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.complexion.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Altura del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Altura (cm)"
                                mode='ios'
                                clearInput
                                labelPlacement="stacked"
                                placeholder="Ingresa la altura en centímetros"
                                type="number"
                                {...register("height", {
                                    required: 'La altura es requerida.',
                                    min: { value: 50, message: "La altura no puede se menor a 50 cm" },
                                    max: { value: 300, message: "La altura no puede ser mayor a 300 cm" },
                                    validate: value => Number.isInteger(Number(value)) || "La altura debe ser un número entero."
                                })}
                            ></IonInput>
                        </IonItem>
                        {errors.height && (touchedFields.height || dirtyFields.height) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.height.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Condiciones médicas del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Condiciones médicas (opcional)"
                                mode='ios'
                                labelPlacement="stacked"
                                placeholder="Describir cualquier condición médica relevante que el paciente pueda tener"
                                {...register("medicalConditions", {
                                    maxLength: { value: 255, message: "Las condiciones médicas no pueden ser mayores a 255 caracteres." }
                                })}
                            ></IonInput>
                        </IonItem>
                        {/* Señas particulares del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Señas particulares (opcional)"
                                mode='ios'
                                clearInput
                                labelPlacement="stacked"
                                placeholder="Describir cualquier lesión, cicatriz o marca distintiva"
                                {...register("distinctiveFeatures", {
                                    maxLength: { value: 255, message: "Las señas particulares no pueden ser mayores a 255 caracteres." }
                                })}
                            ></IonInput>
                        </IonItem>
                        {/* Notas adicionales */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Notas adicionales (opcional)"
                                mode='ios'
                                clearInput
                                labelPlacement="stacked"
                                placeholder="Cualquier información adicional relevante sobre el paciente que pueda ayudar en su identificación"
                                {...register("additionalNotes", {
                                    maxLength: { value: 255, message: "Las notas adicionales no pueden ser mayores a 255 caracteres." }
                                })}
                            ></IonInput>
                        </IonItem>
                    </IonList>

                    <IonButton className='ion-margin-top' onClick={handleValidateAndSubmit} expand="block" mode='ios'>Continuar</IonButton>
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
        </IonPage >
    );
};

export default InputPatientInformation;
