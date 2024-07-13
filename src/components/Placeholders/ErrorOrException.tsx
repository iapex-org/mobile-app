import React from 'react';
import { IonText, IonIcon, IonButton } from '@ionic/react';
import { alertCircleOutline } from 'ionicons/icons';
import styles from './Placeholders.module.css';

interface ErrorOrExceptionProps {
    title?: string;
    message?: string;
    showRetryButton?: boolean;
    showHomeButton?: boolean;
    onRetry?(): void;
    onHome?(): void;
}

const ErrorOrException: React.FC<ErrorOrExceptionProps> = ({
    title = 'Información no encontrada',
    message = 'No se encontraron resultados.',
    showRetryButton = false,
    showHomeButton = false,
    onRetry = () => {},
    onHome = () => {}
}) => {
    return (
        <div className={styles.container}>
            <IonText>
                <h1>{title}</h1>
            </IonText>
            <IonIcon icon={alertCircleOutline} color='primary' className={styles.alertIcon}></IonIcon>
            <p>{message}</p>
            {showRetryButton && (
                    <IonButton expand="block" mode='ios' onClick={onRetry}>Reintentar</IonButton>
                )}
            {showHomeButton && (
                    <IonButton expand="block" mode='ios' onClick={onHome}>Ir a inicio</IonButton>
                )}
        </div>
    );
};

export default ErrorOrException;
