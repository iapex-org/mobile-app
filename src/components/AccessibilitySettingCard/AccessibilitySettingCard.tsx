import { IonCard, IonIcon, IonItem, IonList, IonRange, IonToggle } from '@ionic/react';
import './AccessibilitySettingCard.css';

interface AccessibilitySettingCardProps {
    title: string;
    items: {
        icon: string;
        text: string;
        component: 'range' | 'toggle';
    }[];
}

const AccessibilitySettingCard: React.FC<AccessibilitySettingCardProps> = ({ title, items }) => {
    return (
        <div className="setting-card">
            <h4>{title}</h4>
            <IonCard className='ion-no-margin'>
                <IonList mode='ios'>
                    {items.map((item, index) => (
                        <IonItem key={index} mode='ios' lines='none'>
                            <IonIcon icon={item.icon} slot='start'></IonIcon>
                            <p>{item.text}</p>
                            {item.component === 'range' ? (
                                <IonRange mode='ios'></IonRange>
                            ) : (
                                <IonToggle slot='end' mode='ios'></IonToggle>
                            )}
                        </IonItem>
                    ))}
                </IonList>
            </IonCard>
        </div>
    );
};

export default AccessibilitySettingCard;
