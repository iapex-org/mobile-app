import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';

const InputPatientInformation: React.FC = () => {
    return (
        <IonPage>
            <NavbarHeader title="Un paso más..." />

            <IonContent className='ion-padding'>
                <p>Llena el siguiente formulario para mejores coincidencias. Tu ayuda es fundamental.</p>

                <h4>Información principal</h4>
                <IonList>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Nombre(s)" labelPlacement="stacked" placeholder="Ingresa el nombre del paciente"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Apellido materno" labelPlacement="stacked" placeholder="Ingresa el apellido materno del paciente"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Apellido paterno" labelPlacement="stacked" placeholder="Ingresa el apellido paterno del paciente"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonSelect label="Tipo de sangre" labelPlacement="stacked" placeholder="Selecciona el tipo de sangre">
                            <IonSelectOption value="apple">A+</IonSelectOption>
                            <IonSelectOption value="banana">O-</IonSelectOption>
                            <IonSelectOption value="orange">A-</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonSelect label="Nacionalidad" labelPlacement="stacked" placeholder="Selecciona la nacionalidad">
                            <IonSelectOption value="apple">Mexicana</IonSelectOption>
                            <IonSelectOption value="banana">Hondureña</IonSelectOption>
                            <IonSelectOption value="orange">Estadounidense</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Número de seguridad social (NSS)" labelPlacement="stacked" placeholder="Ingresa el NSS"></IonInput>
                    </IonItem>
                </IonList>

                <h4>Información morfológica</h4>
                <IonList>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Input número uno" labelPlacement="stacked" placeholder="Ingresa el input número uno"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Input número dos" labelPlacement="stacked" placeholder="Ingresa el input número dos"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Input número tres" labelPlacement="stacked" placeholder="Ingresa el input número tres"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Input número cuatro" labelPlacement="stacked" placeholder="Ingresa el input número cuatro"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Input número cinco" labelPlacement="stacked" placeholder="Ingresa el input número cinco"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Input número seis" labelPlacement="stacked" placeholder="Ingresa el input número seis"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Input número siete" labelPlacement="stacked" placeholder="Ingresa el input número siete"></IonInput>
                    </IonItem>
                    <IonItem className='ion-margin-bottom'>
                        <IonInput label="Input número ocho" labelPlacement="stacked" placeholder="Ingresa el input número ocho"></IonInput>
                    </IonItem>
                </IonList>

                <IonButton className='ion-margin-top' expand="block" mode='ios' routerLink='/loading-images'>Continuar</IonButton>

            </IonContent>
        </IonPage>
    );
};

export default InputPatientInformation;