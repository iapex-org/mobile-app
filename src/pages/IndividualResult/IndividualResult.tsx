import {
    IonContent,
    IonPage,
    IonToggle,
    IonToolbar,
    IonBackButton,
    IonButtons
} from '@ionic/react';
import './IndividualResult.css';
import PatientCard from '../../components/PatientCard/PatientCard';
import InstitutionCard from '../../components/InstitutionCrad/InstitutionCard';

const IndividualResult: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start" className='ion-margin-horizontal'>
                    <IonBackButton text="Paciente No. 23" color='medium' defaultHref="#" />
                </IonButtons>
            </IonToolbar>
            <IonContent className='ion-padding'>

                <div className="show-images">
                    <p>Mostrar imagenes</p>
                    <div className="margin-auto">
                        <IonToggle
                            className="firstToggle"
                            aria-label="Tertiary toggle"
                            color="tertiary"
                            checked={true}
                        />
                    </div>
                </div>

                <PatientCard imageUrl="src\assets\img\patient-1.jpg" content='Edad: 34,
                        Estatura: 1.81 m,
                        Peso: 92 kg,
                        Complexión: Robusta,
                        Descripción: Piel morena, cabello
                            negro, corto y liso. Rostro con barba crecida, ojos oscuros, nariz
                            ancha y labios carnosos. Mejillas llenas y mandíbula prominente.
                            Tatuaje de un corazón de unos 5 cm de diámetro en el antebrazo
                            izquierdo, con un nombre o fecha en cursiva dentro. Cicatriz
                            redonda pequeña en el dorso de la mano derecha que parece una
                            quemadura. Mancha de nacimiento cerca del tobillo de la pierna
                            derecha.
                        Condiciones especiales (si aplica): Falta dedo anular de la mano derecha.'
                        button='Contactar'
                        link='/contact-institution'/>

                <p>Institución en la que se encuentra registrado el paciente.</p>

                <InstitutionCard imageUrl="src\assets\img\institution-1.jpg" title='Hospital IMSS Región Córdoba'
                    content='El IMSS en Córdoba se ubica en una zona accesible de la ciudad, con conexiones viales
                        convenientes tanto para peatones como para usuarios de transporte público … Ver más'/>

            </IonContent>
        </IonPage>
    );
};

export default IndividualResult;
