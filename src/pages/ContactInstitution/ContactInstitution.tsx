import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonInput,
    IonItem,
    IonPage,
    IonToolbar
} from '@ionic/react';
import './ContactInstitution.css';

const ContactInstitution: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start" className='ion-margin-horizontal'>
                    <IonBackButton text="Contactar" color='medium' defaultHref="#" />
                </IonButtons>
            </IonToolbar>

            <IonContent className='ion-padding'>
                <p>¡Estas a un paso de reunirte con esa persona querida! Llena los campos con los datos requeridos para concluir tu solicitud.</p>
                <div className='input'>
                    <IonItem mode='ios'>
                        <IonInput label="Nombre(s)" labelPlacement="floating" fill="solid" placeholder="Ingresa tu nombre"></IonInput>
                    </IonItem>
                </div>
                <div className='input'>
                    <IonItem mode='ios'>
                        <IonInput label="Parentesco con el pasiente" labelPlacement="floating" fill="solid" placeholder="¿Cuál es tu parentesco?"></IonInput>
                    </IonItem>
                </div>
                <div className='input'>
                    <IonItem mode='ios'>
                        <IonInput label="Número de teléfono" labelPlacement="floating" fill="solid" placeholder="Ej. 221-236-2345"></IonInput>
                    </IonItem>
                </div>
                <div className='input'>
                    <IonItem mode='ios'>
                        <IonInput label="Correo electrónico(opcional)" labelPlacement="floating" fill="solid" placeholder="correo@ejemplo.com"></IonInput>
                    </IonItem>
                </div>
                <div className='input'>
                    <IonItem mode='ios'>
                        <IonInput label="Mensaje" labelPlacement="floating" fill="solid" placeholder="Algún mensaje o nota para la persona encargada de dar seguimiento a tu solicitud"></IonInput>
                    </IonItem>
                </div>

                <IonButton className='ion-margin-top' expand="block" mode='ios' routerLink='/process-completed'>Contactar</IonButton>

            </IonContent>
        </IonPage>
    );
};

export default ContactInstitution;