import React from 'react';
import { IonCard, IonCardContent, IonButton } from '@ionic/react';
import './Placeholders.css';

const CardPlaceholder: React.FC = () => {
    return (
        <IonCard mode='ios' className='ion-no-margin ion-no-padding ion-margin-bottom card-placeholder'>
            <div className='placeholder-img'></div>
            <IonCardContent mode='ios'>
                <div className='placeholder-info'>
                    <div className='placeholder-line'></div>
                    <div className='placeholder-line'></div>
                    <div className='placeholder-line'></div>
                    <div className='placeholder-line'></div>
                    <div className='placeholder-line'></div>
                </div>
                <IonButton disabled expand='block' mode='ios' className='placeholder-btn ion-margin-top'></IonButton>
            </IonCardContent>
        </IonCard>
    );
};

export default CardPlaceholder;
