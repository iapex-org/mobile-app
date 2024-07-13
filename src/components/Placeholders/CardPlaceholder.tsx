import React from 'react';
import { IonCard, IonCardContent, IonButton } from '@ionic/react';
import styles from './Placeholders.module.css';

const CardPlaceholder: React.FC = () => {
    return (
        <IonCard mode='ios' className='ion-no-margin ion-no-padding ion-margin-bottom'>
            <div className={styles.placeholderImg}></div>
            <IonCardContent mode='ios'>
                <div className={styles.placeholderInfo}>
                    <div className={styles.placeholderLine}></div>
                    <div className={styles.placeholderLine}></div>
                    <div className={styles.placeholderLine}></div>
                    <div className={styles.placeholderLine}></div>
                    <div className={styles.placeholderLine}></div>
                </div>
                <IonButton disabled expand='block' mode='ios' className={`ion-margin-top ${styles.placeholderBtn}`}></IonButton>
            </IonCardContent>
        </IonCard>
    );
};

export default CardPlaceholder;
