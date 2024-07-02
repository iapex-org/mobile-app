import { IonContent, IonPage } from '@ionic/react';
import { contrastOutline, contrastSharp, playForwardOutline, textOutline, textSharp, volumeHighOutline } from 'ionicons/icons';
import AccessibilitySettingCard from '../../components/AccessibilitySettingCard/AccessibilitySettingCard';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';

const AccessibilitySettings: React.FC = () => {
    return (
        <IonPage>
            <NavbarHeader title="Ajustes de accesibilidad" />

            <IonContent className='ion-padding'>
                <AccessibilitySettingCard
                    title="Texto" 
                    items={[
                        { icon: textOutline, text: "Tamaño del texto", component: 'range' },
                        { icon: textSharp, text: "Texto en negritas", component: 'range' }
                    ]} 
                />
                <AccessibilitySettingCard 
                    title="Texto de voz" 
                    items={[
                        { icon: volumeHighOutline, text: "Texto a voz", component: 'toggle' },
                        { icon: playForwardOutline, text: "Velocidad de lectura", component: 'range' }
                    ]} 
                />
                <AccessibilitySettingCard 
                    title="Modos de alto contraste" 
                    items={[
                        { icon: contrastOutline, text: "Texto oscuro sobre fondo claro", component: 'toggle' },
                        { icon: contrastSharp, text: "Texto claro sobre fondo oscuro", component: 'toggle' }
                    ]} 
                />
            </IonContent>
        </IonPage>
    );
};

export default AccessibilitySettings;
