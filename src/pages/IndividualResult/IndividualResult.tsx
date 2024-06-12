import {
    IonContent,
    IonPage,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonRow,
    IonToggle,
    IonToolbar,
    IonCol,
    IonTitle,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonThumbnail,
    IonLabel,
    IonItem,
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import './IndividualResult.css';

const IndividualResult: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="#" />
                    </IonButtons>
                    <IonTitle>Paciente No. 23</IonTitle>
                </IonToolbar>
                <p className="firstText">
                    Las siguientes imágenes pueden ser no aptas para cualquier tipo de
                    público. Se recomienda discreción.
                </p>
                <div className="firstDiv">
                    <h2>Mostrar imagenes</h2>
                    <IonToggle
                        className="firstToggle"
                        aria-label="Tertiary toggle"
                        color="tertiary"
                        checked={true}
                    />
                </div>
                <IonCard>
                    <img className="firstImg" src="https://thumbs.dreamstime.com/b/man-patient-sleeping-hospital-bed-man-patient-sleeping-hospital-bed-nurse-120764154.jpg" />
                    <IonCardContent>
                        <p>
                            <strong>Edad:</strong> 34
                        </p>
                        <p>
                            <strong>Estatura:</strong> 1.81 m
                        </p>
                        <p>
                            <strong>Peso:</strong> 92 kg
                        </p>
                        <p>
                            <strong>Complexión:</strong> Robusta
                        </p>
                        <p>
                            <strong>Descripción:</strong> Descripción: Piel morena, cabello
                            negro, corto y liso. Rostro con barba crecida, ojos oscuros, nariz
                            ancha y labios carnosos. Mejillas llenas y mandíbula prominente.
                            Tatuaje de un corazón de unos 5 cm de diámetro en el antebrazo
                            izquierdo, con un nombre o fecha en cursiva dentro. Cicatriz
                            redonda pequeña en el dorso de la mano derecha que parece una
                            quemadura. Mancha de nacimiento cerca del tobillo de la pierna
                            derecha.
                        </p>
                        <p>
                            <strong>Condiciones especiales (si aplica):</strong> Falta dedo
                            anular de la mano derecha.
                        </p>
                    </IonCardContent>
                    <IonButton className="firstButton" expand="block">
                        Contactar
                    </IonButton>
                </IonCard>
                <div className="firstDiv">
                    <h2>Institución en la que se encuentra registrado el paciente</h2>
                </div>
                <IonCard>
                    <IonRow>
                        <IonCol size="6" style={{}}>
                            <img src="https://th.bing.com/th/id/R.cbf71e920220be835dc0ba83baf863e9?rik=xoFeIa6YjUrkOw&pid=ImgRaw&r=0" className="product-image" />
                        </IonCol>
                        <IonCol size="6">
                            <IonCardHeader>
                                <IonCardTitle>Hospital IMSS Región Córdoba</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                El IMSS en Córdoba se ubica en una zona accesible de la ciudad, con conexiones viales
                                convenientes tanto para peatones como para usuarios de transporte público … Ver más
                            </IonCardContent>
                        </IonCol>
                    </IonRow>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default IndividualResult;
