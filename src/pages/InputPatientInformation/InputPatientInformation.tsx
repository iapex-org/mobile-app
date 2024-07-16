import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import { useForm } from 'react-hook-form';

const InputPatientInformation: React.FC = () => {
    const { register, handleSubmit } = useForm();

    return (
        <IonPage>
            <NavbarHeader title="Un paso más..." />

            <IonContent className='ion-padding'>

                <form onSubmit={handleSubmit((data) => console.log(data))}>
                    <p>Llena el siguiente formulario para mejores coincidencias. Tu ayuda es fundamental.</p>

                    <h4>Información principal</h4>
                    <IonList>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Nombre(s)" labelPlacement="stacked" placeholder="Ingresa el nombre del paciente"
                                {...register("nombre", { required: true, pattern: { value: /^[A-Za-z]+$/i, message: "Solo se aceptan letras" } })}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Apellido materno" labelPlacement="stacked" placeholder="Ingresa el apellido materno del paciente"
                                {...register("apellidoMaterno", { required: true, pattern: { value: /^[A-Za-z]+$/i, message: "Solo se aceptan letras" } })}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Apellido paterno" labelPlacement="stacked" placeholder="Ingresa el apellido paterno del paciente"
                                {...register("ApellidoPaterno", { required: true, pattern: { value: /^[A-Za-z]+$/i, message: "Solo se aceptan letras" } })}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Tipo de sangre" labelPlacement="stacked" placeholder="Selecciona el tipo de sangre">
                                <IonSelectOption value="a+">A+</IonSelectOption>
                                <IonSelectOption value="a-">A-</IonSelectOption>
                                <IonSelectOption value="b+">B+</IonSelectOption>
                                <IonSelectOption value="b-">B-</IonSelectOption>
                                <IonSelectOption value="ab+">AB+</IonSelectOption>
                                <IonSelectOption value="ab-">AB-</IonSelectOption>
                                <IonSelectOption value="o+">O-</IonSelectOption>
                                <IonSelectOption value="o-">O-</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Nacionalidad" labelPlacement="stacked" placeholder="Selecciona la nacionalidad">
                                <IonSelectOption value="mexicana">Mexicana</IonSelectOption>
                                <IonSelectOption value="hondurena">Hondureña</IonSelectOption>
                                <IonSelectOption value="estadounidense">Estadounidense</IonSelectOption>
                                <IonSelectOption value="brasilena">Brasileña</IonSelectOption>
                                <IonSelectOption value="argentina">Argentina</IonSelectOption>
                                <IonSelectOption value="colombiana">Colombiana</IonSelectOption>
                                <IonSelectOption value="venezolana">Venezolana</IonSelectOption>
                                <IonSelectOption value="cubana">Cubana</IonSelectOption>
                                <IonSelectOption value="peruana">Peruana</IonSelectOption>
                                <IonSelectOption value="chilena">Chilena</IonSelectOption>
                                <IonSelectOption value="Otros">Otros</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Número de seguridad social (NSS)" labelPlacement="stacked" placeholder="Ingresa el NSS"
                                {...register("NSS", { required: true, pattern: { value: /^[0-9]{11}$/, message: "El NSS debe contener 11 digitos" } })}></IonInput>
                        </IonItem>
                    </IonList>

                    <h4>Información morfológica</h4>
                    <IonList>
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Color de cabello" labelPlacement="stacked" placeholder="Selecciona un color de cabello">
                                <IonSelectOption value="blanco">Blanco</IonSelectOption>
                                <IonSelectOption value="rubio">Rubio</IonSelectOption>
                                <IonSelectOption value="rubio oscuro">Rubio oscuro</IonSelectOption>
                                <IonSelectOption value="rojo">Rojo</IonSelectOption>
                                <IonSelectOption value="marron rojizo">Marrón rojizo</IonSelectOption>
                                <IonSelectOption value="marron claro">Marrón claro</IonSelectOption>
                                <IonSelectOption value="marron">Marrón</IonSelectOption>
                                <IonSelectOption value="marron oscuro">Marrón oscuro</IonSelectOption>
                                <IonSelectOption value="negro">Negro</IonSelectOption>
                                <IonSelectOption value="otros">Otros</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Tipo de cabello" labelPlacement="stacked" placeholder="Selecciona un tipo de cabello">
                                <IonSelectOption value="liso">Liso</IonSelectOption>
                                <IonSelectOption value="ondulado">Ondulado</IonSelectOption>
                                <IonSelectOption value="rizado">Rizado</IonSelectOption>
                                <IonSelectOption value="afro">Muy rizado/Afro</IonSelectOption>
                                <IonSelectOption value="otros">Otros</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Color de piel" labelPlacement="stacked" placeholder="Selecciona un color de piel">
                                <IonSelectOption value="muyClara">Piel muy clara</IonSelectOption>
                                <IonSelectOption value="clara">Piel clara</IonSelectOption>
                                <IonSelectOption value="mediaClara">Piel media clara</IonSelectOption>
                                <IonSelectOption value="media">Piel media</IonSelectOption>
                                <IonSelectOption value="mediaOscura">Piel media oscura</IonSelectOption>
                                <IonSelectOption value="oscura">Piel oscura</IonSelectOption>
                                <IonSelectOption value="muyOscura">Piel muy oscura</IonSelectOption>
                                <IonSelectOption value="otros">Otros</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Color de ojos" labelPlacement="stacked" placeholder="Selecciona un color de ojos">
                                <IonSelectOption value="ambar">Ámbar</IonSelectOption>
                                <IonSelectOption value="castano">Castaño</IonSelectOption>
                                <IonSelectOption value="gris">Gris</IonSelectOption>
                                <IonSelectOption value="azul">Azul</IonSelectOption>
                                <IonSelectOption value="verde">Verde</IonSelectOption>
                                <IonSelectOption value="avellana">Avellana</IonSelectOption>
                                <IonSelectOption value="negro">Negro</IonSelectOption>
                                <IonSelectOption value="violeta">Violeta</IonSelectOption>
                                <IonSelectOption value="rojo">Rojo</IonSelectOption>
                                <IonSelectOption value="otros">Otros</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Género" labelPlacement="stacked" placeholder="Selecciona un género">
                                <IonSelectOption value="masculino">Masculino</IonSelectOption>
                                <IonSelectOption value="femenino">Femenino</IonSelectOption>
                                <IonSelectOption value="noBinario">No binario</IonSelectOption>
                                <IonSelectOption value="noDecir">Prefiero no decirlo</IonSelectOption>
                                <IonSelectOption value="otro">Otro</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonSelect label="Complexión" labelPlacement="stacked" placeholder="Selecciona una complexion">
                                <IonSelectOption value="esbelto">Esbelto</IonSelectOption>
                                <IonSelectOption value="corpulento">Corpulento</IonSelectOption>
                                <IonSelectOption value="musculoso">Musculoso</IonSelectOption>
                                <IonSelectOption value="fornido">Fornido</IonSelectOption>
                                <IonSelectOption value="fibrado">Fibrado</IonSelectOption>
                                <IonSelectOption value="gordo">Gordo</IonSelectOption>
                                <IonSelectOption value="delgaducho">Delgaducho</IonSelectOption>
                                <IonSelectOption value="vigoroso">Vigoroso</IonSelectOption>
                                <IonSelectOption value="enjuto">Enjuto</IonSelectOption>
                                <IonSelectOption value="espaldaAncha">Ancho de espalda</IonSelectOption>
                                <IonSelectOption value="otra">Otra</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Postura" labelPlacement="stacked" placeholder="Ingresa la postura del paciente"
                                {...register("postura", { required: true, pattern: { value: /^[A-Za-z]+$/i, message: "Solo se aceptan letras" } })}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Descripción" labelPlacement="stacked" placeholder="Ingrese una descripción detallada"
                                {...register("descripcion", { required: true, pattern: { value: /^[A-Za-z]+$/i, message: "Solo se aceptan letras" } })}></IonInput>
                        </IonItem>
                        <IonItem className='ion-margin-bottom'>
                            <IonInput label="Condiciones especiales (si aplica)" labelPlacement="stacked" placeholder="Discapacidad, amputaciones, etc."
                                {...register("condicionesEspeciales", { required: true, pattern: { value: /^[A-Za-z]+$/i, message: "Solo se aceptan letras" } })}></IonInput>
                        </IonItem>
                    </IonList>

                    <IonButton className='ion-margin-top' expand="block" mode='ios' routerLink='/loading-images'>Continuar</IonButton>

                </form>

            </IonContent>
        </IonPage>
    );
};

export default InputPatientInformation;