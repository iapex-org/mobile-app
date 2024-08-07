import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonText, IonToast } from '@ionic/react';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';

const InputPatientInformation: React.FC = () => {
    // Definición de tipos y estado
    type FormField = "numberSocial" | "name" | "firtsLastName" | "secondLastName" | "age" | "postura" | "description" | "specialConditions" | "bloodType" | "nationality" | "hairColor" | "hairType" | "eyeColor" | "genere" | "complexion" | "colorSkin" | "hairLength" | "height" | "date";
    const [errorToast, setErrorToast] = useState<string>('');
    const [ dateError, setDateError ] = useState<string>('');
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    // Configuración del useForm para el manejo del formulario
    const { register, handleSubmit, setError, trigger, setValue, setFocus, formState: { errors, touchedFields, dirtyFields }, getValues } = useForm({
        mode: 'all',
        defaultValues: {
            numberSocial: '',
            name: '',
            firtsLastName: '',
            secondLastName: '',
            age: '',
            postura: '',
            description: '',
            specialConditions: '',
            bloodType: '',
            nationality: '',
            hairColor: '',
            hairType: '',
            eyeColor: '',
            genere: '',
            complexion: '',
            colorSkin: '',
            hairLength: '',
            height: '', 
            date: ''
        }
    });


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
        console.log(data); // Aquí puedes manejar los datos enviados, como enviar una solicitud de API, etc.
    };

    // Función para manejar la validación de la fecha
    const handleDateChange = (e: any) => {
        const selectedDate = new Date(e.detail.value);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            setDateError('La fecha de desaparición no puede ser superior a la fecha actual.');
        } else {
            setDateError('');
        }
    };

    
    

    return (
        <IonPage>
            <NavbarHeader title="Un paso más..." />

            <IonContent className='ion-padding'>

                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <p>Llena el siguiente formulario para mejores coincidencias. Tu ayuda es fundamental.</p>

                    <h4>Información principal</h4>
                    <IonList>
                        <IonItem className='ion-margin-bottom'>

                        <IonLabel className='ion-margin-end'>Fecha de desaparición</IonLabel>
                            <IonDatetimeButton 
                            datetime="datetime"></IonDatetimeButton>
                                <IonModal keepContentsMounted={true}>
                                    <IonDatetime id="datetime" onIonChange={handleDateChange}></IonDatetime>
                                </IonModal>
                            
                        </IonItem>
                        {dateError && (
                            <IonText className='ion-margin-start' color="danger">
                                {dateError}
                            </IonText>
                        )}
                        
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Nombre(s)" 
                            labelPlacement="stacked" 
                            placeholder="Ingresa el nombre del paciente"
                            {...register("name", { 
                                required: 'El nombre es obligatorio',  
                                minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
                                maxLength: { value: 50, message: "El nombre no puede tener más de 50 caracteres" }
                            })}></IonInput>
                        </IonItem>
                        {/* Manejo de errores solo en este campo */}
                        {errors.name && (touchedFields.name || dirtyFields.name) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.name.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Apellido materno" 
                            labelPlacement="stacked" 
                            placeholder="Ingresa el apellido materno del paciente"
                            {...register("secondLastName", {   
                                required: 'El apellido materno es obligatorio', 
                                minLength: { value: 2, message: "El apellido materno debe tener al menos 2 caracteres" },
                                maxLength: { value: 50, message: "El apellido materno no puede tener más de 50 caracteres"}
                            })}></IonInput>
                        </IonItem>
                        {errors.firtsLastName && (touchedFields.firtsLastName || dirtyFields.firtsLastName) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.firtsLastName.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Apellido paterno" 
                            labelPlacement="stacked" 
                            placeholder="Ingresa el apellido paterno del paciente"
                                {...register("firtsLastName", { 
                                    required: 'El apellido paterno es obligatorio', 
                                    minLength: { value: 2, message: "El apellido paterno debe tener al menos 2 caracteres" },
                                    maxLength: { value: 50, message: "El apellido paterno no puede tener más de 50 caracteres" }
                                })}></IonInput>
                        </IonItem>
                        {errors.secondLastName && (touchedFields.secondLastName || dirtyFields.secondLastName) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.secondLastName.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput 
                            label="Edad" 
                            labelPlacement="stacked" 
                            type='number'
                            placeholder="Ingresa la edad del paciente"
                                {...register("age", { 
                                    required: 'La edad es obligatorio', 
                                    minLength: { value: 1, message: "La edad debe tener al menos 1 caracteres" },
                                    maxLength: { value: 3, message: "La edad no puede tener más de 3 caracteres" },
                                    validate: value => Number(value) >= 0 || "La edad no puede ser un número negativo."
                                })}></IonInput>
                        </IonItem>
                        {errors.age && (touchedFields.age || dirtyFields.age) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.age.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect 
                            label="Sexo" 
                            labelPlacement="stacked"
                            color={errors.genere && (touchedFields.genere || dirtyFields.genere) ? "danger" : "primary" } 
                            placeholder="Selecciona un sexo"
                            {...register("genere", {
                                required: "El sexo es requerido"
                            })}
                            >
                                <IonSelectOption value="masculino">Masculino</IonSelectOption>
                                <IonSelectOption value="femenino">Femenino</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.genere && (touchedFields.genere || dirtyFields.genere) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.genere.message as string}
                            </IonText>
                        )}
                       
                        
                    </IonList>

                    <h4>Información morfológica</h4>
                    <IonList>
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Color de cabello" 
                            labelPlacement="stacked" 
                            color={errors.hairColor && (touchedFields.hairColor || dirtyFields.hairColor) ? "danger" : "primary" }
                            placeholder="Selecciona un color de cabello"
                            {...register("hairColor", {
                                required: "El color de cabello es requerido"
                            })}
                            >
                                <IonSelectOption value="castanoOscuro">Castaño oscuro</IonSelectOption>
                                <IonSelectOption value="castanoClaro">Castaño claro</IonSelectOption>
                                <IonSelectOption value="rubioOscuro">Rubio oscuro</IonSelectOption>
                                <IonSelectOption value="rubioClaro">Rubio claro</IonSelectOption>
                                <IonSelectOption value="pelorrojo">Pelirrojo</IonSelectOption>
                                <IonSelectOption value="gris">Gris</IonSelectOption>
                                <IonSelectOption value="blanco">Blanco</IonSelectOption>
                                <IonSelectOption value="otros">Otros</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.hairColor && (touchedFields.hairColor || dirtyFields.hairColor) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.hairColor.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect 
                            label="Tipo de cabello" 
                            labelPlacement="stacked" 
                            color={errors.hairType && (touchedFields.hairType || dirtyFields.hairType) ? "danger" : "primary" }
                            placeholder="Selecciona un tipo de cabello"
                            {...register("hairType", {
                                required: "El tipo de cabello es requerido"
                            })}
                            >
                                <IonSelectOption value="liso">Liso</IonSelectOption>
                                <IonSelectOption value="ondulado">Ondulado</IonSelectOption>
                                <IonSelectOption value="rizado">Rizado</IonSelectOption>
                                <IonSelectOption value="crespo">Crespo</IonSelectOption>
                                <IonSelectOption value="calvo">Calvo</IonSelectOption>
                                <IonSelectOption value="otros">Otros</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.hairType && (touchedFields.hairType || dirtyFields.hairType) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.hairType.message as string}
                            </IonText>
                        )}
                        
                        <IonItem className='ion-margin-bottom'>
                            <IonInput
                                label="Altura (cm)"
                                labelPlacement="stacked"
                                placeholder="Ingresa la altura en centímetros"
                                type="number"
                                {...register("height", {
                                    required: 'La altura es obligatoria',
                                    min: { value: 50, message: "La altura mínima es 50 cm" },
                                    max: { value: 300, message: "La altura máxima es 300 cm" }
                                })}
                            ></IonInput>
                        </IonItem>
                        {errors.height && (touchedFields.height || dirtyFields.height) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.height.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect 
                            label="Largo de cabello" 
                            labelPlacement="stacked" 
                            color={errors.hairLength && (touchedFields.hairLength || dirtyFields.hairLength) ? "danger" : "primary" }
                            placeholder="Selecciona el largo de cabello"
                            {...register("hairLength", {
                                required: "El largo de cabello es requerido"
                            })}
                            >
                                <IonSelectOption value="corto">Corto(Por encima de los hombros)</IonSelectOption>
                                <IonSelectOption value="medio">Medio(Hasta los hombros)</IonSelectOption>
                                <IonSelectOption value="largo">Largo</IonSelectOption>
                                <IonSelectOption value="rapado">Rapado</IonSelectOption>
                                <IonSelectOption value="calvo">Calvo</IonSelectOption>
                                <IonSelectOption value="otros">Otros</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.hairLength && (touchedFields.hairLength|| dirtyFields.hairLength) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.hairLength.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect 
                            label="Color de piel" 
                            labelPlacement="stacked" 
                            color={errors.colorSkin && (touchedFields.colorSkin || dirtyFields.colorSkin) ? "danger" : "primary" }
                            placeholder="Selecciona un color de piel"
                            {...register("colorSkin", {
                                required: "El color de piel es requerido"
                            })}
                            >
                                <IonSelectOption value="claro">Claro</IonSelectOption>
                                <IonSelectOption value="morenoClaro">Moreno claro</IonSelectOption>
                                <IonSelectOption value="moreno">Moreno</IonSelectOption>
                                <IonSelectOption value="morenoOscuro">Moreno oscuro</IonSelectOption>
                                <IonSelectOption value="oscura">Negro</IonSelectOption>
                                <IonSelectOption value="otros">Otros</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.colorSkin && (touchedFields.colorSkin || dirtyFields.colorSkin) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.colorSkin.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect 
                            label="Color de ojos" 
                            labelPlacement="stacked" 
                            color={errors.eyeColor && (touchedFields.eyeColor || dirtyFields.eyeColor) ? "danger" : "primary" }
                            placeholder="Selecciona un color de ojos"
                            {...register("eyeColor", {
                                required: "El color de ojos es requerido"
                            })}
                            >
                                <IonSelectOption value="azul">Azul</IonSelectOption>
                                <IonSelectOption value="verde">Verde</IonSelectOption>
                                <IonSelectOption value="cafe">Café</IonSelectOption>
                                <IonSelectOption value="gris">Gris</IonSelectOption>
                                <IonSelectOption value="negro">Negro</IonSelectOption>
                                <IonSelectOption value="otros">Otros</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.eyeColor && (touchedFields.eyeColor || dirtyFields.eyeColor) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.eyeColor.message as string}
                            </IonText>
                        )}
                        
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect 
                            label="Complexión" 
                            labelPlacement="stacked"
                            color={errors.complexion && (touchedFields.complexion || dirtyFields.complexion) ? "danger" : "primary" }
                            placeholder="Selecciona una complexion"
                            {...register("complexion", {
                                required: "La complexion es requerido"
                            })}>
                                <IonSelectOption value="delgada">Delgada</IonSelectOption>
                                <IonSelectOption value="atletica">Atlética</IonSelectOption>
                                <IonSelectOption value="promedio">Promedio</IonSelectOption>
                                <IonSelectOption value="robusta">Robusta</IonSelectOption>
                                <IonSelectOption value="otra">Otra</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        {errors.complexion && (touchedFields.complexion || dirtyFields.complexion) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.complexion.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput 
                            label="Postura" 
                            labelPlacement="stacked" 
                            placeholder="Ingresa la postura del paciente"
                            {...register("postura", { 
                                required: "La postura es requerida",
                                    minLength: { value: 2, message: "La postura debe tener al menos 2 caracteres" },
                                    maxLength: { value: 50, message: "La postura no puede tener más de 50 caracteres" }
                                })}></IonInput>
                        </IonItem>
                        {errors.postura && (touchedFields.postura || dirtyFields.postura) && (
                            <IonText className='ion-margin-start' color="danger">
                                {errors.postura.message as string}
                            </IonText>
                        )}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Condiciones médicas (opcional)" labelPlacement="stacked" placeholder="Describir cualquier condición médica relevante que el paciente pueda tener"
                            {...register("specialConditions")}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Señas particulares (opcional)" labelPlacement="stacked" placeholder="Describir cualquier lesión, cicatriz o marca distintiva"
                            {...register("specialConditions")}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Notas adicionales (opcional)" labelPlacement="stacked" placeholder="Cualquier información adicional relevante sobre el paciente que pueda ayudar en su identificación"
                            {...register("specialConditions")}></IonInput>
                        </IonItem>
                    </IonList>

                    <IonButton className='ion-margin-top' onClick={handleValidateAndSubmit} expand="block" mode='ios' routerLink='/loading-images'>Continuar</IonButton>

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

export default InputPatientInformation;
