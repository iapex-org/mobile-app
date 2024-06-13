import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonIcon,
    IonPage,
    IonToggle,
    IonToolbar,
} from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
import PatientCard from '../../components/PatientCard/PatientCard';
import './SearchResults.css';

const SearchResults: React.FC = () => {
    return (
        <IonPage>
            <IonToolbar>
                <IonButtons slot="start" className='ion-margin-horizontal'>
                    <IonBackButton text="Resultados" color='medium' defaultHref="#" />
                </IonButtons>
            </IonToolbar>
            
            <IonContent className='ion-padding'>

                <p>Las siguientes imágenes pueden ser no aptas para cualquier tipo de público. Se recomienda discreción.</p>
                
                <div className="show-images">
                    <IonIcon icon={filterOutline} className="closeIcon" />
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

                <PatientCard imageUrl="src\assets\img\patient-1.jpg" content='Descripción: Piel morena y el cabello negro, corto y liso. Su rostro muestra una barba de candado crecida, ojos oscuros, nariz ancha y labios carnosos, con mejillas llenas y una mandíbula prominente. Muestra heridas...'
                button='Ver resultados'
                link='/individual-result' />
                <PatientCard imageUrl="src\assets\img\patient-2.jpg" content='Descripción: Piel morena y el cabello negro, corto y liso. Su rostro muestra una barba de candado crecida, ojos oscuros, nariz ancha y labios carnosos, con mejillas llenas y una mandíbula prominente. Muestra heridas...'
                button='Ver resultado'
                link='/individual-result' />
                <PatientCard imageUrl="src\assets\img\patient-3.jpg" content='Descripción: Piel morena y el cabello negro, corto y liso. Su rostro muestra una barba de candado crecida, ojos oscuros, nariz ancha y labios carnosos, con mejillas llenas y una mandíbula prominente. Muestra heridas...'
                button='Ver resultado'
                link='/individual-result'/>
            
            </IonContent>
        </IonPage>
    );
};

export default SearchResults;
