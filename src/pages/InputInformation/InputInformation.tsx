import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonPopover, IonSelect, IonSelectOption, IonText, IonTextarea, IonToast } from '@ionic/react';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { usePatient } from '../../contexts/PatientContext';
import { useSearchContext } from '../../contexts/SearchContext';
import { ImageContext } from '../../contexts/ImageContext';
import { informationCircleOutline } from 'ionicons/icons';
import styles from './InputInformation.module.css';
import useTextToSpeechClick from '../../hooks/UseTextToSpeechClick';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useSearchResults } from '../../hooks/useSearchResults';

const InputInformation: React.FC = () => {
    useTextToSpeechClick();
    const { searchPatients } = useSearchResults();
    const history = useHistory();

    const [errorToast, setErrorToast] = useState<string>('');
    const [showOtherFields, setShowOtherFields] = useState({ hairColor: false });
    const [hideHairFields, setHideHairFields] = useState<boolean>(false);
    const { formData, setFormData } = useSearchContext();
    const { setFullName } = usePatient(); // Usa el contexto para establecer el nombre completo de la persona.
    const today = new Date();
    const adjustedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const [selectedDate, setSelectedDate] = useState<string>(adjustedToday.toISOString().split('T')[0]);
    const { images } = useContext(ImageContext);

    // Definición de tipos y estado
    type FormField = "dateOfDisappearance" | "name" | "lastName" | "secondLastName" | "gender" | "age" | "skinColor" | "eyeColor" | "hairColor" | "otherHairColor" | "hairType" | "hairLength" | "complexion" | "height" | "medicalConditions" | "distinctiveFeatures";

    // Configuración del useForm para el manejo del formulario
    const { register, handleSubmit, trigger, setValue, setFocus, formState: { errors, touchedFields, dirtyFields }, getValues } = useForm({
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
        }
    });

    const handleFieldChange = (field: string, value: string) => {
        const otherField = `other${field.charAt(0).toUpperCase() + field.slice(1)}`;

        setShowOtherFields((prevState) => ({
            ...prevState,
            [field]: value === "otro",
        }));

        // Ocultar y limpiar campos de tipo y color si se selecciona "Calvo"
        if (field === "hairLength") {
            const isBald = value === "calvo";
            setHideHairFields(isBald);

            if (isBald) {
                // Limpiar valores de tipo y color de cabello
                setValue('hairType', '');
                setValue('hairColor', '');
                setValue('otherHairColor', '');
            }
        }

        if (value !== "otro") {
            setValue(otherField as FormField, '');
        }
    };

    const markAllFieldsAsTouched = () => {
        (Object.keys(getValues()) as FormField[]).forEach((key) => {
            setValue(key, getValues()[key], { shouldValidate: true, shouldTouch: true });
        });
    };

    // Función para extraer datos del FormData y asignarlos manualmente al formulario
    const populateFormFromFormData = (formData: FormData) => {
        // Excepciones que requieren procesamiento manual
        const dateOfDisappearance = formData.get('registrationDateTime') as string;
        const age = formData.get('approximateAge') as string;
        const height = formData.get('approximateHeight') as string;

        // Procesar el campo 'hair' separando por comas
        const hair = formData.get('hair') as string;
        let [hairLength, hairType, hairColor] = ['', '', '']; // Valores por defecto

        if (hair) {
            const hairParts = hair.split(',').map(part => part.trim()); // Dividir y limpiar espacios

            hairLength = hairParts[0] || ''; // Longitud del cabello
            hairType = hairParts[1] || '';   // Tipo de cabello
            hairColor = hairParts[2] || '';  // Color de cabello
        }

        // Verificar si es "calvo" para ocultar y limpiar campos
        if (hairLength === 'calvo') {
            setHideHairFields(true);
            setValue('hairType', '');
            setValue('hairColor', '');
            setValue('otherHairColor', '');
        }

        // Asignación manual de los campos
        setValue('dateOfDisappearance', dateOfDisappearance || '');
        setSelectedDate(dateOfDisappearance || ''); // Sincroniza selectedDate
        setValue('age', age || '');
        setValue('height', height || '');
        setValue('hairLength', hairLength);
        setValue('hairType', hairType);
        setValue('hairColor', hairColor);

        // Asignación automática para el resto de los campos
        formData.forEach((value, key) => {
            // Evitar sobrescribir campos ya procesados manualmente
            if (!['registrationDateTime', 'approximateAge', 'approximateHeight', 'hair'].includes(key)) {
                setValue(key as any, value || '');
            }
        });
    };

    // Si hay un FormData en el contexto, repoblar el formulario al cargar el componente
    useEffect(() => {
        if (formData) {
            populateFormFromFormData(formData);
        }
    }, [formData, setValue]);

    // Actualiza el valor del formulario cuando cambia la fecha
    useEffect(() => {
        // Asegúrate de que la fecha esté en el formato correcto YYYY-MM-DD
        const date = new Date(selectedDate);
        const correctedDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
        setValue('dateOfDisappearance', correctedDate.toISOString().split('T')[0]);
    }, [selectedDate, setValue]);

    // Función para convertir una URL base64 a un objeto File
    const urlToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
        const res = await fetch(url);
        const blob = await res.blob();
        return new File([blob], filename, { type: mimeType });
    };

    const handleValidateAndSubmit = async () => {
        await markAllFieldsAsTouched();

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
        const fieldsWithOther = ['hairColor']; // Campos con opción "Otro"

        // Usar el valor alternativo si el campo contiene "otro"
        const cleanedData = fieldsWithOther.reduce((acc, field) => {
            const otherField = `other${field.charAt(0).toUpperCase() + field.slice(1)}`;
            acc[field] = data[field] === 'otro' ? data[otherField] ?? '' : data[field];
            return acc;
        }, { ...data });

        // Combinar los campos de cabello
        const hairDetails = [
            cleanedData.hairLength,
            cleanedData.hairType,
            cleanedData.hairColor
        ].filter(Boolean).join(', '); // Filtrar valores vacíos y unirlos con comas

        // Crear el objeto final solo con los campos necesarios
        const formatDate = (fecha: string | number | Date) => {
            const date = new Date(fecha);
            // Verifica que la fecha sea válida
            if (isNaN(date.getTime())) {
                throw new Error("Fecha inválida");
            }

            // Formatea la fecha a "YYYY-MM-DD"
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegura que el mes sea de dos dígitos
            const day = String(date.getDate()).padStart(2, '0'); // Asegura que el día sea de dos dígitos
            return `${year}-${month}-${day}`; // Formato correcto
        };

        const adjustedDate = new Date(cleanedData.dateOfDisappearance);
        adjustedDate.setDate(adjustedDate.getDate() + 1); // Ajustar si se envía con un día de retraso

        const finalData: { [key: string]: any } = {
            name: cleanedData.name.trim(),
            lastName: cleanedData.lastName.trim(),
            secondLastName: cleanedData.secondLastName.trim(),
            gender: cleanedData.gender.trim(),
            approximateAge: Number(cleanedData.age), // Conversión a número
            skinColor: cleanedData.skinColor.trim(),
            hair: hairDetails.trim(),
            complexion: cleanedData.complexion.trim(),
            eyeColor: cleanedData.eyeColor.trim(),
            approximateHeight: Number(cleanedData.height), // Conversión a número
            medicalConditions: cleanedData.medicalConditions.trim(),
            distinctiveFeatures: cleanedData.distinctiveFeatures.trim(),
            registrationDateTime: formatDate(adjustedDate),
        };

        // Establecer el nombre completo (opcionalmente)
        const fullName = `${data.name} ${data.lastName} ${data.secondLastName || ''}`.trim();
        setFullName(fullName);

        console.log('Datos enviados:', finalData);
        console.log('Imagenes:', images);

        // Crear un objeto FormData para enviar al endpoint de búsqueda
        const formData = new FormData();
        for (const key in finalData) {
            formData.append(key, finalData[key as keyof typeof finalData]);
        }

        // Convertir las imágenes seleccionadas (URLs) a archivos File
        for (const [index, imageUrl] of images.entries()) {
            const file = await urlToFile(imageUrl, `image_${index}.jpg`, 'image/jpeg');
            formData.append('face_images', file);
        }

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        setFormData(formData); // Guardar el FormData en el contexto

        history.replace(`/processing-information`);

        // Realizar la búsqueda de pacientes
        await searchPatients(formData);
    };

    const formatDate = (fecha: string | number | Date) => {
        // Verifica que la fecha sea válida
        const date = new Date(fecha);
        if (isNaN(date.getTime())) {
            throw new Error("Fecha inválida");
        }

        // Formatea la fecha
        return format(date, "EEEE dd 'de' MMMM 'de' yyyy", { locale: es });
    };

    return (
        <IonPage>
            <NavbarHeader
                confirmBeforeBack
                alertMessage='Si vuelves perderás los datos ingresados.'
                title="Información de la persona" />

            <IonContent className='ion-padding'>

                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <p>Llena el siguiente formulario con la información de la persona desaparecida para mejores coincidencias.</p>

                    <h5>Información personal</h5>
                    <IonList>
                        {/* Fecha de extravio de la persona */}
                        <IonItem className="ion-margin-bottom">
                            <IonLabel className="ion-margin-end">Fecha de desaparición</IonLabel>
                            <IonDatetimeButton aria-label='Seleccione la fecha de desaparición' datetime="dateOfDisappearance" />

                            <IonModal keepContentsMounted={true}>
                                <IonDatetime
                                    aria-label={formatDate(selectedDate)}
                                    id="dateOfDisappearance"
                                    mode="ios"
                                    presentation="date"
                                    value={selectedDate}
                                    onIonChange={(e) => setSelectedDate(Array.isArray(e.detail.value) ? e.detail.value[0] : e.detail.value || '')}
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
                                    min="2024-01-01"
                                    max={new Date().toISOString().split('T')[0]}
                                    locale="es-MX"
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
                        {/* Nombre de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Nombre o nombres"
                                mode='ios'
                                labelPlacement="stacked"
                                placeholder="Ingrese el nombre"
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
                        {/* Apellido paterno de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Apellido paterno"
                                mode='ios'
                                labelPlacement="stacked"
                                placeholder="Ingrese el apellido paterno"
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
                        {/* Apellido materno de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Apellido materno (opcional)"
                                mode='ios'
                                labelPlacement="stacked"
                                placeholder="Ingrese el apellido materno"
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
                        {/* Sexo de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Sexo"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.gender && (touchedFields.gender || dirtyFields.gender) ? "danger" : "primary"}
                                placeholder="Seleccione el sexo"
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
                        {/* Edad de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Edad"
                                mode='ios'
                                labelPlacement="stacked"
                                type='number'
                                placeholder="Ingrese la edad"
                                {...register("age", {
                                    required: 'La edad es requerida.',
                                    min: { value: 0, message: "La edad no puede ser menor a 0 años." },
                                    max: { value: 100, message: "La edad no puede ser mayor a 100 años." },
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

                    <h5>Información morfológica</h5>
                    <IonList>
                        {/* Color de piel de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Color de piel"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.skinColor && (touchedFields.skinColor || dirtyFields.skinColor) ? "danger" : "primary"}
                                placeholder="Seleccione el color de piel"
                                {...register("skinColor", {
                                    required: "El color de piel es requerido."
                                })}>
                                <IonSelectOption value="clara">Clara</IonSelectOption>
                                <IonSelectOption value="morena">Morena</IonSelectOption>
                                <IonSelectOption value="oscura">Oscura</IonSelectOption>
                            </IonSelect>

                            {/* Botón de ayuda para abrir el popover */}
                            <IonButton aria-label='Mostrar ejemplos de colores de piel' className='ion-margin-start' mode='ios' color={'tertiary'} id='skin-examples' size='default' fill="outline">
                                <IonIcon slot="icon-only" color='tertiary' icon={informationCircleOutline} />
                            </IonButton>

                            {/* Popover con ejemplos visuales */}
                            <IonPopover
                                mode="ios"
                                trigger="skin-examples"
                                side="top"
                                alignment="center"
                                className="custom-popover">
                                <IonContent class="ion-padding">
                                    <h5 className={styles['help-title']}>Ejemplos de colores de piel</h5>
                                    <div className={styles['help-examples-container']}>
                                        {/* Piel clara */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/piel_clara.jpeg" alt='Hombre de piel clara'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Clara</p>
                                        </div>
                                        {/* Piel morena */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/piel_morena.jpeg" alt='Hombre de piel morena'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Morena</p>
                                        </div>
                                        {/* Piel oscura */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/piel_oscura.jpeg" alt='Hombre de piel oscura'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Oscura</p>
                                        </div>
                                    </div>
                                </IonContent>
                            </IonPopover>

                        </IonItem>
                        {errors.skinColor && (touchedFields.skinColor || dirtyFields.skinColor) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.skinColor.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Color de ojos de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Color de ojos"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.eyeColor && (touchedFields.eyeColor || dirtyFields.eyeColor) ? "danger" : "primary"}
                                placeholder="Seleccione el color de ojos"
                                {...register("eyeColor", {
                                    required: "El color de ojos es requerido."
                                })}>
                                <IonSelectOption value="café">Café</IonSelectOption>
                                <IonSelectOption value="azul">Azul</IonSelectOption>
                                <IonSelectOption value="verde">Verde</IonSelectOption>
                                <IonSelectOption value="gris">Gris</IonSelectOption>
                                <IonSelectOption value="avellana">Avellana</IonSelectOption>
                                <IonSelectOption value="ambar">Ámbar</IonSelectOption>
                                <IonSelectOption value="heterocromia">Heterocromía</IonSelectOption>
                            </IonSelect>

                            {/* Botón de ayuda para abrir el popover */}
                            <IonButton aria-label='Mostrar ejemplos de colores de ojos' className='ion-margin-start' mode='ios' color={'tertiary'} id='eyes-examples' size='default' fill="outline">
                                <IonIcon slot="icon-only" color='tertiary' icon={informationCircleOutline} />
                            </IonButton>

                            {/* Popover con ejemplos visuales */}
                            <IonPopover
                                mode="ios"
                                trigger="eyes-examples"
                                side="top"
                                alignment="center"
                                className="custom-popover">
                                <IonContent class="ion-padding">
                                    <h5 className={styles['help-title']}>Ejemplos de colores de ojos</h5>
                                    <div className={styles['help-examples-container']}>
                                        {/* Ojos cafés */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/ojos_cafes.png" alt='Ojos color café'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Cafés</p>
                                        </div>
                                        {/* Ojos azules */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/ojos_azules.png" alt='Ojos color azul'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Azules</p>
                                        </div>
                                        {/* Ojos verdes */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/ojos_verdes.png" alt='Ojos color verde'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Verdes</p>
                                        </div>
                                        {/* Ojos grises */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/ojos_grises.png" alt='Ojos color gris'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Grises</p>
                                        </div>
                                        {/* Ojos avellana */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/ojos_avellana.png" alt='Ojos color avellana'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Avellana</p>
                                        </div>
                                        {/* Ojos ámbar */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/ojos_ambar.png" alt='Ojos color ámbar'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Ámbar</p>
                                        </div>
                                        {/* Heterocromía */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/ojos_heterocromia.jpg" alt='Ojos con heterocromía'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Heterocromía</p>
                                        </div>
                                    </div>
                                </IonContent>
                            </IonPopover>

                        </IonItem>
                        {errors.eyeColor && (touchedFields.eyeColor || dirtyFields.eyeColor) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.eyeColor.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Longitud del cabello de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Longitud del cabello"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.hairLength && (touchedFields.hairLength || dirtyFields.hairLength) ? "danger" : "primary"}
                                placeholder="Seleccione la longitud"
                                {...register("hairLength", {
                                    required: "La longitud del cabello es requerida."
                                })}
                                onIonChange={(e) => handleFieldChange('hairLength', e.detail.value)}>
                                <IonSelectOption value="calvo">Calvo</IonSelectOption>
                                <IonSelectOption value="corto">Corto (Por encima de los hombros)</IonSelectOption>
                                <IonSelectOption value="medio">Medio (Hasta los hombros)</IonSelectOption>
                                <IonSelectOption value="largo">Largo (Más allá de los hombros)</IonSelectOption>
                            </IonSelect>

                            {/* Botón de ayuda para abrir el popover */}
                            <IonButton aria-label='Mostrar ejemplos de longitud de cabello' className='ion-margin-start' mode='ios' color={'tertiary'} id='hair-length-examples' size='default' fill="outline">
                                <IonIcon slot="icon-only" color='tertiary' icon={informationCircleOutline} />
                            </IonButton>

                            {/* Popover con ejemplos visuales */}
                            <IonPopover
                                mode="ios"
                                trigger="hair-length-examples"
                                side="top"
                                alignment="center"
                                className="custom-popover">
                                <IonContent class="ion-padding">
                                    <h5 className={styles['help-title']}>Ejemplos de longitud de cabello</h5>
                                    <div className={styles['help-examples-container']}>
                                        {/* Cabello corto */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/cabello_corto_mujer.jpeg" alt='Mujer con cabello corto'
                                                className={styles['help-image']} />
                                        </div>
                                        {/* Cabello medio */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/cabello_medio_mujer.jpeg" alt='Mujer con cabello medio'
                                                className={styles['help-image']} />
                                        </div>
                                        {/* Cabello largo */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/cabello_largo_mujer.jpeg" alt='Mujer con cabello largo'
                                                className={styles['help-image']} />
                                        </div>
                                        {/* Cabello corto */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/cabello_corto_hombre.jpeg" alt='Hombre con cabello corto'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Corto</p>
                                        </div>
                                        {/* Cabello medio */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/cabello_medio_hombre.jpeg" alt='Hombre con cabello medio'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Medio</p>
                                        </div>
                                        {/* Cabello largo */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/cabello_largo_hombre.png" alt='Hombre con cabello largo'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Largo</p>
                                        </div>
                                        {/* Calvo */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/calvo.jpeg" alt='Hombre calvo'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Calvo</p>
                                        </div>
                                    </div>
                                </IonContent>
                            </IonPopover>

                        </IonItem>
                        {errors.hairLength && (touchedFields.hairLength || dirtyFields.hairLength) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.hairLength.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Tipo de cabello de la persona - Ocultar si es calvo */}
                        {!hideHairFields && (
                            <IonItem className='ion-margin-bottom'>
                                <IonSelect label="Tipo de cabello"
                                    mode='ios'
                                    labelPlacement="stacked"
                                    color={errors.hairType && (touchedFields.hairType || dirtyFields.hairType) ? "danger" : "primary"}
                                    placeholder="Seleccione el tipo de cabello"
                                    {...register("hairType", {
                                        required: "El tipo de cabello es requerido."
                                    })}>
                                    <IonSelectOption value="liso">Liso</IonSelectOption>
                                    <IonSelectOption value="ondulado">Ondulado</IonSelectOption>
                                    <IonSelectOption value="rizado">Rizado</IonSelectOption>
                                    <IonSelectOption value="crespo">Crespo</IonSelectOption>
                                </IonSelect>

                                {/* Botón de ayuda para abrir el popover */}
                                <IonButton aria-label='Mostrar ejemplos de tipos de cabello' className='ion-margin-start' mode='ios' color={'tertiary'} id='hair-type-examples' size='default' fill="outline">
                                    <IonIcon slot="icon-only" color='tertiary' icon={informationCircleOutline} />
                                </IonButton>

                                {/* Popover con ejemplos visuales */}
                                <IonPopover
                                    mode="ios"
                                    trigger="hair-type-examples"
                                    side="top"
                                    alignment="center"
                                    className="custom-popover">
                                    <IonContent class="ion-padding">
                                        <h5 className={styles['help-title']}>Ejemplos de tipos de cabello</h5>
                                        <div className={styles['help-examples-container']}>
                                            {/* Cabello liso */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_liso_mujer.jpg" alt='Mujer con cabello liso'
                                                    className={styles['help-image']} />
                                            </div>
                                            {/* Cabello ondulado */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_ondulado_mujer.jpeg" alt='Mujer con cabello ondulado'
                                                    className={styles['help-image']} />
                                            </div>
                                            {/* Cabello rizado */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_rizado_mujer.jpg" alt='Mujer con cabello rizado'
                                                    className={styles['help-image']} />
                                            </div>
                                            {/* Cabello liso */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_liso_hombre.jpg" alt='Hombre con cabello liso'
                                                    className={styles['help-image']} />
                                                <p className={styles['help-label']}>Liso</p>
                                            </div>
                                            {/* Cabello ondulado */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_ondulado_hombre.jpg" alt='Hombre con cabello ondulado'
                                                    className={styles['help-image']} />
                                                <p className={styles['help-label']}>Ondulado</p>
                                            </div>
                                            {/* Cabello rizado */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_rizado_hombre.jpg" alt='Hombre con cabello rizado'
                                                    className={styles['help-image']} />
                                                <p className={styles['help-label']}>Rizado</p>
                                            </div>
                                            {/* Cabello crespo */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_crespo_hombre.jpeg" alt='Hombre con cabello crespo'
                                                    className={styles['help-image']} />
                                                <p className={styles['help-label']}>Crespo</p>
                                            </div>
                                        </div>
                                    </IonContent>
                                </IonPopover>

                            </IonItem>
                        )}
                        {errors.hairType && !hideHairFields && (touchedFields.hairType || dirtyFields.hairType) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.hairType.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Color de cabello de la persona - Ocultar si es calvo */}
                        {!hideHairFields && (
                            <IonItem className='ion-margin-bottom'>
                                <IonSelect label="Color de cabello"
                                    mode='ios'
                                    labelPlacement="stacked"
                                    color={errors.hairColor && (touchedFields.hairColor || dirtyFields.hairColor) ? "danger" : "primary"}
                                    placeholder="Seleccione el color de cabello"
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

                                {/* Botón de ayuda para abrir el popover */}
                                <IonButton aria-label='Mostrar ejemplos de colores de cabello' className='ion-margin-start' mode='ios' color={'tertiary'} id='hair-color-examples' size='default' fill="outline">
                                    <IonIcon slot="icon-only" color='tertiary' icon={informationCircleOutline} />
                                </IonButton>

                                {/* Popover con ejemplos visuales */}
                                <IonPopover
                                    mode="ios"
                                    trigger="hair-color-examples"
                                    side="top"
                                    alignment="center"
                                    className="custom-popover">
                                    <IonContent class="ion-padding">
                                        <h5 className={styles['help-title']}>Ejemplos de colores de cabello</h5>
                                        <div className={styles['help-examples-container']}>
                                            {/* Cabello negro */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_negro.jpeg" alt='Hombre con cabello negro'
                                                    className={styles['help-image']} />
                                                <p className={styles['help-label']}>Negro</p>
                                            </div>
                                            {/* Cabello castaño */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_castaño.jpeg" alt='Hombre con cabello castaño'
                                                    className={styles['help-image']} />
                                                <p className={styles['help-label']}>Castaño</p>
                                            </div>
                                            {/* Cabello rubio */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_rubio.jpeg" alt='Mujer con cabello rubio'
                                                    className={styles['help-image']} />
                                                <p className={styles['help-label']}>Rubio</p>
                                            </div>
                                            {/* Cabello pelirrojo */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_pelirrojo.jpeg" alt='Mujer con cabello pelirrojo'
                                                    className={styles['help-image']} />
                                                <p className={styles['help-label']}>Pelirrojo</p>
                                            </div>
                                            {/* Cabello canoso */}
                                            <div className={styles['help-example']}>
                                                <img src="src/assets/img/cabello_canoso.jpeg" alt='Hombre con cabello canoso'
                                                    className={styles['help-image']} />
                                                <p className={styles['help-label']}>Canoso</p>
                                            </div>
                                        </div>
                                    </IonContent>
                                </IonPopover>

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
                                    labelPlacement="stacked"
                                    placeholder="Ingrese el color de cabello"
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
                        {/* Complexión de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Complexión"
                                mode='ios'
                                labelPlacement="stacked"
                                color={errors.complexion && (touchedFields.complexion || dirtyFields.complexion) ? "danger" : "primary"}
                                placeholder="Seleccione la complexion"
                                {...register("complexion", {
                                    required: "La complexion es requerida."
                                })}>
                                <IonSelectOption value="delgada">Delgada</IonSelectOption>
                                <IonSelectOption value="media">Media</IonSelectOption>
                                <IonSelectOption value="robusta">Robusta</IonSelectOption>
                                <IonSelectOption value="sobrepeso">Sobrepeso</IonSelectOption>
                            </IonSelect>

                            {/* Botón de ayuda para abrir el popover */}
                            <IonButton aria-label='Mostrar ejemplos de complexiones' className='ion-margin-start' mode='ios' color={'tertiary'} id='complexion-examples' size='default' fill="outline">
                                <IonIcon slot="icon-only" color='tertiary' icon={informationCircleOutline} />
                            </IonButton>

                            {/* Popover con ejemplos visuales */}
                            <IonPopover
                                mode="ios"
                                trigger="complexion-examples"
                                side="top"
                                alignment="center"
                                className="custom-popover">
                                <IonContent class="ion-padding">
                                    <h5 className={styles['help-title']}>Ejemplos de complexión</h5>
                                    <div className={styles['help-examples-container']}>
                                        {/* Complexión delgada */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/complexion_delgada.png" alt='Mujer de complexión delgada'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Delgada</p>
                                        </div>
                                        {/* Complexión media */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/complexion_media.png" alt='Hombre de complexión media'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Media</p>
                                        </div>
                                        {/* Complexión robusta */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/complexion_robusta.png" alt='Hombre de complexión robusta'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Robusta</p>
                                        </div>
                                        {/* Complexión sobrepeso */}
                                        <div className={styles['help-example']}>
                                            <img src="src/assets/img/complexion_sobrepeso.png" alt='Hombre con sobrepeso'
                                                className={styles['help-image']} />
                                            <p className={styles['help-label']}>Sobrepeso</p>
                                        </div>
                                    </div>
                                </IonContent>
                            </IonPopover>

                        </IonItem>
                        {errors.complexion && (touchedFields.complexion || dirtyFields.complexion) && (
                            <div className='ion-margin-start'>
                                <IonText color="danger">
                                    {errors.complexion.message as string}
                                </IonText>
                            </div>
                        )}
                        {/* Altura de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Altura (cm)"
                                mode='ios'
                                labelPlacement="stacked"
                                placeholder="Ingrese la altura en centímetros"
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
                        {/* Condiciones médicas de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonTextarea label="Condiciones médicas (opcional)"
                                mode='ios'
                                labelPlacement="stacked"
                                placeholder="Describir cualquier condición médica relevante que el persona pueda tener"
                                {...register("medicalConditions", {
                                    maxLength: { value: 255, message: "Las condiciones médicas no pueden ser mayores a 255 caracteres." }
                                })}
                            ></IonTextarea>
                        </IonItem>
                        {/* Señas particulares de la persona */}
                        <IonItem className='ion-margin-bottom'>
                            <IonTextarea label="Señas particulares (opcional)"
                                mode='ios'
                                labelPlacement="stacked"
                                placeholder="Describir cualquier lesión, cicatriz o marca distintiva"
                                {...register("distinctiveFeatures", {
                                    maxLength: { value: 255, message: "Las señas particulares no pueden ser mayores a 255 caracteres." }
                                })}
                            ></IonTextarea>
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

            </IonContent>
        </IonPage >
    );
};

export default InputInformation;
