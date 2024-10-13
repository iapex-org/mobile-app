import React from 'react';
import { IonCard, IonCardContent, IonButton, IonSkeletonText } from '@ionic/react';
import styles from './Placeholders.module.css';

const CardPlaceholder: React.FC = () => {
    return (
        <IonCard mode='ios' className='ion-no-margin ion-no-padding ion-margin-bottom'>
            <div className={styles.placeholderImg}></div>
            <IonCardContent mode='ios'>

                <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                <div className='ion-padding-vertical'>
                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                </div>
                <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                <div className='ion-padding-vertical'>
                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                </div>
                <IonButton disabled expand='block' mode='ios' className={`ion-margin-top ${styles.placeholderBtn}`}></IonButton>
            </IonCardContent>
        </IonCard>
    );
};

export default CardPlaceholder;
