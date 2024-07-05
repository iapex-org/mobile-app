import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { contrastOutline, contrastSharp, playForwardOutline, textOutline, textSharp, volumeHighOutline } from 'ionicons/icons';
import AccessibilitySettingCard from '../../components/AccessibilitySettingCard/AccessibilitySettingCard';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';

const AccessibilitySettings: React.FC = () => {
    return (
        <IonPage>
            <NavbarHeader title="Accesibilidad" />
            <IonContent className='ion-padding'>
                <AccessibilitySettingCard
                    title="Texto"
                    items={[
                        { id: "textSize", icon: textOutline, text: "Tamaño del texto", component: 'range' },
                        { id: "textBold", icon: textSharp, text: "Texto en negritas", component: 'toggle' }
                    ]}
                />
                <AccessibilitySettingCard
                    title="Texto de voz"
                    items={[
                        { id: "textToSpeech", icon: volumeHighOutline, text: "Texto a voz", component: 'toggle' },
                        { id: "readingSpeed", icon: playForwardOutline, text: "Velocidad de lectura", component: 'range' }
                    ]}
                />
                <AccessibilitySettingCard
                    title="Modos de alto contraste"
                    items={[
                        { id: "highContrastDark", icon: contrastSharp, text: "Texto claro sobre fondo oscuro", component: 'toggle' }
                    ]}
                />
            </IonContent>
        </IonPage>
    );
};

export default AccessibilitySettings;
