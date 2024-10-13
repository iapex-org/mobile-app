import React, { useState } from 'react';
import { IonText, IonIcon, IonButton } from '@ionic/react';
import { alertCircleOutline } from 'ionicons/icons';
import styles from './Placeholders.module.css';

interface CustomButton {
    text: string; // Texto del botón
    action: () => void; // Acción del botón
}

interface ErrorOrExceptionProps {
    title?: string;
    message?: string;
    customButtons?: CustomButton[];
    fullHeight?: boolean; // Nueva prop para controlar el height del contenedor
}

const ErrorOrException: React.FC<ErrorOrExceptionProps> = ({
    title = 'Información no encontrada',
    message = 'No se encontraron resultados.',
    customButtons = [],
    fullHeight = true // Valor por defecto: sin altura completa
}) => {
    return (
        <div
            className={`${styles.container} ${fullHeight ? styles.fullHeight : ''}`}
        >
            <IonText>
                <h1>{title}</h1>
            </IonText>
            <IonIcon
                icon={alertCircleOutline}
                color='primary'
                className={styles.alertIcon}
            ></IonIcon>
            <p>{message}</p>
            {customButtons.map((button, index) => (
                <IonButton
                    key={index}
                    expand="block"
                    mode='ios'
                    onClick={button.action}
                >
                    {button.text}
                </IonButton>
            ))}
        </div>
    );
};

export default ErrorOrException;