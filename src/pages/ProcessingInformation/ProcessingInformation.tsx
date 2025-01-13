import { IonContent, IonIcon, IonPage, IonText } from '@ionic/react';
import { cog } from 'ionicons/icons';
import styles from './ProcessingInformation.module.css';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { useSearchContext } from '../../contexts/SearchContext'; // Asegúrate de importar tu contexto

const ProcessingInformation: React.FC = () => {
    const history = useHistory();
    const { isLoading } = useSearchContext(); // Obtener resultados y errores

    useEffect(() => {
        // Redirigir a /search-results cuando la llamada a la API haya terminado
        if (!isLoading) {
            history.replace('/search-results');
        }
    }, [isLoading, history]);

    return (
        <IonPage>
            <IonContent color={'primary'} className='ion-padding'>
                <div className={styles.container}>
                    <IonText>
                        <h1>Procesando información...</h1>
                    </IonText>
                    <IonIcon color='light' icon={cog} className={styles.cogIcon}></IonIcon>
                    <p>
                        Se están buscando las mejores coincidencias basadas en las imágenes e información que proporcionaste. <br />
                        No cierres la aplicación mientras esta pantalla esté activa.
                    </p>
                </div>
                <img src="src/assets/img/logo-encuentrame.png" alt='Logotipo de "Encuéntrame"' />
            </IonContent>
        </IonPage>
    );
};

export default ProcessingInformation;
