import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonText, IonToast } from '@ionic/react';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useHistory } from 'react-router';

const InputPatientInformation: React.FC = () => {
    const [errorToast, setErrorToast] = useState<string>('');
    const [successToast, setSuccessToast] = useState<string>('');
    const [showOtherFields, setShowOtherFields] = useState({
        skinColor: false,
        eyeColor: false,
        hairColor: false,
        hairType: false,
        hairLength: false,
        complexion: false,
    });
    const history = useHistory();

    // Definición de tipos y estado
    type FormField = "dateOfDisappearance" | "name" | "lastName" | "secondLastName" | "gender" | "age" | "skinColor" | "otherSkinColor" | "eyeColor" | "otherEyeColor" | "hairColor" | "otherHairColor" | "hairType" | "otherHairType" | "hairLength" | "otherHairLength" | "complexion" | "otherComplexion" | "height" | "medicalConditions" | "distinctiveFeatures" | "additionalNotes";

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
            otherSkinColor: '',
            eyeColor: '',
            otherEyeColor: '',
            hairColor: '',
            otherHairColor: '',
            hairType: '',
            otherHairType: '',
            hairLength: '',
            otherHairLength: '',
            complexion: '',
            otherComplexion: '',
            height: '',
            medicalConditions: '',
            distinctiveFeatures: '',
            additionalNotes: ''
        }
    });

    const handleFieldChange = (field: string, value: string) => {
        console.log(`Cambiando el campo ${field} a ${value}`);

        // Determinar el nombre del campo alternativo (ej: otherSkinColor, otherEyeColor).
        const otherField = `other${field.charAt(0).toUpperCase() + field.slice(1)}`;
        console.log(`Campo alternativo determinado: ${otherField}`);

        // Mostrar o ocultar el campo adicional según el valor seleccionado.
        setShowOtherFields(prevState => ({
            ...prevState,
            [field]: value === "otro", // Esto determina si el campo alternativo debe mostrarse
        }));

        console.log(`Campo adicional ${field} ${value === "otro" ? 'mostrado' : 'ocultado'}`);

        // Limpiar el campo alternativo si se selecciona otra opción distinta de "otro".
        if (value !== "otro") {
            setValue(otherField as FormField, '');
            console.log(`Campo alternativo ${otherField} limpiado`);
        }
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

    const onSubmit = async (data: any) => {
        try {
            const fieldsWithOther = ['skinColor', 'eyeColor', 'hairColor', 'hairType', 'hairLength', 'complexion']; // Campos con opción "Otro"

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
                                onIonChange={(e) => handleFieldChange('skinColor', e.detail.value)}
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
                        {/* Otro color de piel */}
                        {showOtherFields.skinColor && (
                            <IonItem className='ion-margin-bottom'>
                                <IonInput label="Otro color de piel"
                                    mode='ios'
                                    clearInput
                                    labelPlacement="stacked"
                                    placeholder="Ingresa un color de piel"
                                    {...register("otherSkinColor", {
                                        required: 'El color de piel es requerido.',
                                        minLength: { value: 2, message: "El color de piel no puede ser menor a 2 caracteres." },
                                        maxLength: { value: 50, message: "El color de piel no puede ser mayor a 50 caracteres." }
                                    })}>

                                </IonInput>
                            </IonItem>
                        )}
                        {showOtherFields.skinColor && errors.otherSkinColor && (touchedFields.otherSkinColor || dirtyFields.otherSkinColor) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.otherSkinColor.message as string}
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
                                onIonChange={(e) => handleFieldChange('eyeColor', e.detail.value)}
                                {...register("eyeColor", {
                                    required: "El color de ojos es requerido."
                                })}>
                                <IonSelectOption value="azul">Azul</IonSelectOption>
                                <IonSelectOption value="verde">Verde</IonSelectOption>
                                <IonSelectOption value="cafe">Café</IonSelectOption>
                                <IonSelectOption value="gris">Gris</IonSelectOption>
                                <IonSelectOption value="negro">Negro</IonSelectOption>
                                <IonSelectOption value="avellana">Avellana</IonSelectOption>
                                <IonSelectOption value="ambar">Ámbar</IonSelectOption>
                                <IonSelectOption value="heterocromia">Heterocromía</IonSelectOption>
                                <IonSelectOption value="otro">Otro</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.eyeColor && (touchedFields.eyeColor || dirtyFields.eyeColor) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.eyeColor.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Otro color de ojos */}
                        {showOtherFields.eyeColor && (
                            < IonItem className='ion-margin-bottom'>
                                <IonInput label="Otro color de ojos"
                                    mode='ios'
                                    clearInput
                                    labelPlacement="stacked"
                                    placeholder="Ingresa un color de ojos"
                                    {...register("otherEyeColor", {
                                        required: 'El color de ojos es requerido.',
                                        minLength: { value: 2, message: "El color de ojos no puede ser menor a 2 caracteres." },
                                        maxLength: { value: 50, message: "El color de ojos no puede ser mayor a 50 caracteres." }
                                    })}>
                                </IonInput>
                            </IonItem>
                        )}
                        {showOtherFields.eyeColor && errors.otherEyeColor && (touchedFields.otherEyeColor || dirtyFields.otherEyeColor) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.otherEyeColor.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Color de cabello del paciente */}
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
                                <IonSelectOption value="castanoOscuro">Castaño oscuro</IonSelectOption>
                                <IonSelectOption value="castanoClaro">Castaño claro</IonSelectOption>
                                <IonSelectOption value="rubioOscuro">Rubio oscuro</IonSelectOption>
                                <IonSelectOption value="rubioClaro">Rubio claro</IonSelectOption>
                                <IonSelectOption value="pelorrojo">Pelirrojo</IonSelectOption>
                                <IonSelectOption value="gris">Gris</IonSelectOption>
                                <IonSelectOption value="blanco">Blanco</IonSelectOption>
                                <IonSelectOption value="otro">Otro</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.hairColor && (touchedFields.hairColor || dirtyFields.hairColor) && (
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
                                        maxLength: { value: 50, message: "El color de cabello no puede ser mayor a 50 caracteres." }
                                    })}>
                                </IonInput>
                            </IonItem>
                        )}
                        {showOtherFields.hairColor && errors.otherHairColor && (touchedFields.otherHairColor || dirtyFields.otherHairColor) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.otherHairColor.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Tipo de cabello del paciente */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Tipo de cabello"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.hairType && (touchedFields.hairType || dirtyFields.hairType) ? "danger" : "primary"}
                                placeholder="Selecciona un tipo de cabello"
                                onIonChange={(e) => handleFieldChange('hairType', e.detail.value)}
                                {...register("hairType", {
                                    required: "El tipo de cabello es requerido."
                                })}>
                                <IonSelectOption value="liso">Liso</IonSelectOption>
                                <IonSelectOption value="ondulado">Ondulado</IonSelectOption>
                                <IonSelectOption value="rizado">Rizado</IonSelectOption>
                                <IonSelectOption value="crespo">Crespo</IonSelectOption>
                                <IonSelectOption value="calvo">Calvo</IonSelectOption>
                                <IonSelectOption value="otro">Otro</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.hairType && (touchedFields.hairType || dirtyFields.hairType) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.hairType.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Otro tipo de cabello */}
                        {showOtherFields.hairType && (
                            <IonItem className='ion-margin-bottom'>
                                <IonInput label="Otro tipo de cabello"
                                    mode='ios'
                                    clearInput
                                    labelPlacement="stacked"
                                    placeholder="Ingresa un tipo de cabello"
                                    {...register("otherHairType", {
                                        required: 'El tipo de cabello es requerido.',
                                        minLength: { value: 2, message: "El tipo de cabello no puede ser menor a 2 caracteres." },
                                        maxLength: { value: 50, message: "El tipo de cabello no puede ser mayor a 50 caracteres." }
                                    })}>
                                </IonInput>
                            </IonItem>
                        )}
                        {showOtherFields.hairType && errors.otherHairType && (touchedFields.otherHairType || dirtyFields.otherHairType) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.otherHairType.message as string}
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
                                onIonChange={(e) => handleFieldChange('hairLength', e.detail.value)}
                                {...register("hairLength", {
                                    required: "El largo de cabello es requerido."
                                })}>
                                <IonSelectOption value="corto">Corto(Por encima de los hombros)</IonSelectOption>
                                <IonSelectOption value="medio">Medio(Hasta los hombros)</IonSelectOption>
                                <IonSelectOption value="largo">Largo</IonSelectOption>
                                <IonSelectOption value="rapado">Rapado</IonSelectOption>
                                <IonSelectOption value="calvo">Calvo</IonSelectOption>
                                <IonSelectOption value="otro">Otro</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.hairLength && (touchedFields.hairLength || dirtyFields.hairLength) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.hairLength.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Otro largo de cabello */}
                        {showOtherFields.hairLength && (
                            <IonItem className='ion-margin-bottom'>
                                <IonInput label="Otro largo de cabello"
                                    mode='ios'
                                    clearInput
                                    labelPlacement="stacked"
                                    placeholder="Ingresa un largo de cabello"
                                    {...register("otherHairLength", {
                                        required: 'El largo de cabello es requerido.',
                                        minLength: { value: 2, message: "El largo de cabello no puede ser menor a 2 caracteres." },
                                        maxLength: { value: 50, message: "El largo de cabello no puede ser mayor a 50 caracteres." }
                                    })}>
                                </IonInput>
                            </IonItem>
                        )}
                        {showOtherFields.hairLength && errors.otherHairLength && (touchedFields.otherHairLength || dirtyFields.otherHairLength) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.otherHairLength.message as string}
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
                                onIonChange={(e) => handleFieldChange('complexion', e.detail.value)}
                                {...register("complexion", {
                                    required: "La complexion es requerida."
                                })}>
                                <IonSelectOption value="delgada">Delgada</IonSelectOption>
                                <IonSelectOption value="atletica">Atlética</IonSelectOption>
                                <IonSelectOption value="promedio">Promedio</IonSelectOption>
                                <IonSelectOption value="robusta">Robusta</IonSelectOption>
                                <IonSelectOption value="otro">Otro</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.complexion && (touchedFields.complexion || dirtyFields.complexion) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.complexion.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Otra complexión */}
                        {showOtherFields.complexion && (
                            <IonItem className='ion-margin-bottom'>
                                <IonInput label="Otra complexión"
                                    mode='ios'
                                    clearInput
                                    labelPlacement="stacked"
                                    placeholder="Ingresa una complexión"
                                    {...register("otherComplexion", {
                                        required: 'La complexión es requerida.',
                                        minLength: { value: 2, message: "La complexión no puede ser menor a 2 caracteres." },
                                        maxLength: { value: 50, message: "La complexión no puede ser mayor a 50 caracteres." }
                                    })}>
                                </IonInput>
                            </IonItem>
                        )}
                        {showOtherFields.complexion && errors.otherComplexion && (touchedFields.otherComplexion || dirtyFields.otherComplexion) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.otherComplexion.message as string}
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
