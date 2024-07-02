import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
import PatientBasicCard from '../../components/PatientCard/PatientCard';
import ShowImagesToggle from '../../components/ShowImagesToggle/ShowImagesToggle';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import './SearchResults.css';

const SearchResults: React.FC = () => {
    return (
        <IonPage>
            <NavbarHeader title="Resultados" />

            <IonContent className='ion-padding'>

                <p>Las siguientes imágenes pueden ser no aptas para cualquier tipo de público. Se recomienda discreción.</p>

                <div className='filter-toggle'>
                    <IonIcon icon={filterOutline} size='large' className="ion-margin-end" />
                    <ShowImagesToggle />
                </div>

                <h5>Todos los resultados encontrados:</h5>

                <PatientBasicCard imageUrl="src\assets\img\patient-1.jpg" content='Descripción: Piel morena y el cabello negro, corto y liso. Su rostro muestra una barba de candado crecida, ojos oscuros, nariz ancha y labios carnosos, con mejillas llenas y una mandíbula prominente. Muestra heridas...'
                    button='Ver resultado'
                    link='/individual-result' />
                <PatientBasicCard imageUrl="src\assets\img\patient-2.jpg" content='Descripción: Piel morena y el cabello negro, corto y liso. Su rostro muestra una barba de candado crecida, ojos oscuros, nariz ancha y labios carnosos, con mejillas llenas y una mandíbula prominente. Muestra heridas...'
                    button='Ver resultado'
                    link='/individual-result' />
                <PatientBasicCard imageUrl="src\assets\img\patient-3.jpg" content='Descripción: Piel morena y el cabello negro, corto y liso. Su rostro muestra una barba de candado crecida, ojos oscuros, nariz ancha y labios carnosos, con mejillas llenas y una mandíbula prominente. Muestra heridas...'
                    button='Ver resultado'
                    link='/individual-result' />

            </IonContent>
        </IonPage>
    );
};

export default SearchResults;
