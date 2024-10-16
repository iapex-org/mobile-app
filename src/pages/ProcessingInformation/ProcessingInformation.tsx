import { IonContent, IonIcon, IonPage, IonText } from '@ionic/react';
import { cog } from 'ionicons/icons';
import styles from './ProcessingInformation.module.css';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

const ProcessingInformation: React.FC = () => {
    const history = useHistory();

    // Redirigir automáticamente después de 5 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            history.push('/search-results'); // Redirige a la página de resultados
        }, 5000); // 5000 ms = 5 segundos

        // Limpiar el temporizador al desmontar el componente
        return () => clearTimeout(timer);
    }, [history]);

    return (
        <IonPage>
            <IonContent color={'primary'} className='ion-padding'>
                <div className={styles.container}>
                    <IonText>
                        <h1>Procesando información...</h1>
                    </IonText>
                    <IonIcon icon={cog} className={styles.cogIcon} />
                    <p>Nuestro algoritmo está buscando las mejores coincidencias en nuestra base de datos basándose en las imágenes y la información que proporcionaste. Por favor, no cierres la aplicación mientras esta pantalla esté activa.</p>
                </div>

                <img src="src/assets/img/logo-encuentrame.png" alt="Encuéntrame" />
            </IonContent>
        </IonPage>
    );
};

export default ProcessingInformation;
