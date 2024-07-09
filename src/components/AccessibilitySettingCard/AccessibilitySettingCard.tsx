import React, { useState } from 'react';
import { IonCard, IonIcon, IonItem, IonList, IonRange, IonToggle } from '@ionic/react';
import './AccessibilitySettingCard.css';

interface AccessibilitySettingCardProps {
    title: string;
    items: {
        id: string;
        icon: string;
        text: string;
        component: 'range' | 'toggle';
    }[];
}

const AccessibilitySettingCard: React.FC<AccessibilitySettingCardProps> = ({ title, items }) => {
    const [settings, setSettings] = useState<{ [key: string]: any }>({
        textSize: 0,
        textBold: false,
        textToSpeech: false,
        readingSpeed: 0,
        highContrastLight: false,
        highContrastDark: false,
    });

    const handleRangeChange = (event: CustomEvent, id: string) => {
        const value = event.detail.value as number;
        setSettings(prevSettings => ({ ...prevSettings, [id]: value }));
        if (id === "textSize") {
            document.documentElement.style.setProperty('--text-size', `${1 + value * 0.25}em`);
        } else if (id === "readingSpeed") {
            document.documentElement.style.setProperty('--reading-speed', `${value}`);
        }
    };

    const handleToggleChange = (event: CustomEvent, id: string) => {
        const checked = event.detail.checked as boolean;
        setSettings(prevSettings => ({ ...prevSettings, [id]: checked }));
        if (id === "textBold") {
            document.documentElement.style.setProperty('--text-bold', checked ? 'bold' : 'normal');
        } else if (id === "highContrastLight") {
            document.documentElement.classList.toggle('high-contrast-light', checked);
        } else if (id === "highContrastDark") {
            document.documentElement.classList.toggle('high-contrast-dark', checked);
        }
    };

    return (
        <div className="setting-card">
            <h4>{title}</h4>
            <IonCard mode='ios' className='ion-no-margin'>
                <IonList mode='ios'>
                    {items.map((item, index) => (
                        <IonItem key={index} mode='ios' lines='none'>
                            <IonIcon icon={item.icon} slot='start'></IonIcon>
                            <p>{item.text}</p>
                            {item.component === 'range' ? (
                                <IonRange
                                    id={item.id}
                                    mode='ios'
                                    min={0}
                                    max={2}
                                    step={1}
                                    snaps={true}
                                    value={settings[item.id]}
                                    onIonChange={(e) => handleRangeChange(e, item.id)}
                                ></IonRange>
                            ) : (
                                <IonToggle
                                    id={item.id}
                                    slot='end'
                                    mode='ios'
                                    checked={settings[item.id]}
                                    onIonChange={(e) => handleToggleChange(e, item.id)}
                                ></IonToggle>
                            )}
                        </IonItem>
                    ))}
                </IonList>
            </IonCard>
        </div>
    );
};

export default AccessibilitySettingCard;
