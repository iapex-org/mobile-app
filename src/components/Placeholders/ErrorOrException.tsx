import React from 'react';
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
    fullHeight?: boolean;
    color?: string; // Nueva prop para el color del ícono
}

const ErrorOrException: React.FC<ErrorOrExceptionProps> = ({
    title = 'Información no encontrada',
    message = 'No se encontraron resultados.',
    customButtons = [],
    fullHeight = true,
    color = 'primary' // Valor por defecto: 'primary'
}) => {
    return (
        <div className={`${styles.container} ${fullHeight ? styles.fullHeight : ''}`}>
            <IonText>
                <h1>{title}</h1>
            </IonText>
            <IonIcon
                icon={alertCircleOutline}
                color={color} // Uso de la prop color
                className={styles.alertIcon}
            />
            <p>{message}</p>
            {customButtons.map((button, index) => (
                <IonButton
                    key={index}
                    expand="block"
                    mode="ios"
                    color={color}
                    onClick={button.action}
                    className={color === 'light' ? styles.blueText : ''}
                >
                    {button.text}
                </IonButton>
            ))}
        </div>
    );
};

export default ErrorOrException;
