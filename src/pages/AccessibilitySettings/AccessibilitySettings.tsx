import React, { useState, useEffect } from 'react';
import { IonContent, IonIcon, IonItem, IonPage, IonRange, IonToggle, IonToast, IonButton } from '@ionic/react';
import { contrastSharp, playForwardOutline, textOutline, textSharp, volumeHighOutline } from 'ionicons/icons';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import useTextToSpeechClick from '../../hooks/UseTextToSpeechClick';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

const AccessibilitySettings: React.FC = () => {
    const [successToast, setSuccessToast] = useState<string>('');
    useTextToSpeechClick();

    // Estado para negritas, tamaño de texto, alto contraste y TTS
    const [isBold, setIsBold] = useState(() => {
        const saved = localStorage.getItem('isBold');
        return saved === 'true'; // Convierte a booleano
    });
    const [textSize, setTextSize] = useState(() => {
        const savedSize = localStorage.getItem('textSize');
        return savedSize ? parseInt(savedSize, 10) : 1; // Valor por defecto
    });
    const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState(() => {
        const savedTTS = localStorage.getItem('textToSpeechEnabled');
        return savedTTS === 'true'; // Convierte a booleano
    });
    const [readingSpeed, setReadingSpeed] = useState(() => {
        const savedSpeed = localStorage.getItem('readingSpeed');
        return savedSpeed ? parseInt(savedSpeed, 10) : 1; // Valor por defecto
    });
    const [isHighContrast, setIsHighContrast] = useState(() => {
        const savedContrast = localStorage.getItem('isHighContrast');
        return savedContrast === 'true'; // Convierte a booleano
    });

    // Función para guardar en localStorage
    const saveSettings = () => {
        localStorage.setItem('isBold', isBold.toString());
        localStorage.setItem('textSize', textSize.toString());
        localStorage.setItem('textToSpeechEnabled', isTextToSpeechEnabled.toString());
        localStorage.setItem('readingSpeed', readingSpeed.toString());
        localStorage.setItem('isHighContrast', isHighContrast.toString());

        window.location.reload(); // Recargar la página para aplicar los cambios

        setSuccessToast('Configuraciones guardadas');
    };

    const handleTextToSpeech = async () => {
        if (!isTextToSpeechEnabled) return; // No hacer nada si TTS está desactivado

        await TextToSpeech.speak({
            text: 'Este es un texto de ejemplo para que pueda probar las configuraciones de accesibilidad. Ajuste el tamaño del texto, el contraste y otras configuraciones para ver cómo afectan a este texto.',
            lang: 'es-MX', // Español de México
            rate: 1 + readingSpeed, // Velocidad
            pitch: 1.0, // Tono
        });
        setSuccessToast('Texto a voz activado');
    };

    return (
        <IonPage>
            <NavbarHeader
            confirmBeforeBack
            alertMessage='Si vuelves, perderás los cambios no guardados.'
            title="Configuración de accesibilidad" />

            <IonContent className="ion-padding">
                <div className='ion-padding-bottom'>
                    <h5>Texto</h5>
                    <IonItem mode="ios">
                        <IonIcon icon={textSharp} slot="start" />
                        <p className="ion-margin-end">Negritas</p>
                        <IonToggle
                            id="textBold"
                            slot="end"
                            checked={isBold}
                            onIonChange={() => {
                                const newBoldState = !isBold;
                                setIsBold(newBoldState); // Aplicar el cambio inmediatamente
                                setSuccessToast(newBoldState ? 'Negritas activadas' : 'Negritas desactivadas');
                            }}
                        />
                    </IonItem>
                    <IonItem mode="ios">
                        <IonIcon icon={textOutline} slot="start" />
                        <p className="ion-margin-end">Tamaño</p>
                        <IonRange
                            id="textSize"
                            min={0}
                            max={2}
                            step={1}
                            snaps={true}
                            value={textSize}
                            onIonChange={e => {
                                const newSize = Number(e.detail.value);
                                setTextSize(newSize); // Aplicar el cambio inmediatamente
                                setSuccessToast('Tamaño de texto ajustado');
                            }}
                        />
                    </IonItem>
                </div>

                <div className='ion-padding-bottom'>
                    <h5>Audio</h5>
                    <IonItem mode="ios">
                        <IonIcon icon={volumeHighOutline} slot="start" />
                        <p className="ion-margin-end">Texto a voz</p>
                        <IonToggle
                            id="textToSpeech"
                            slot="end"
                            checked={isTextToSpeechEnabled}
                            onIonChange={e => {
                                const newTextToSpeechState = e.detail.checked;
                                setIsTextToSpeechEnabled(newTextToSpeechState); // Aplicar el cambio inmediatamente
                                setSuccessToast(newTextToSpeechState ? 'Texto a voz activado' : 'Texto a voz desactivado');
                            }}
                        />
                    </IonItem>
                    <IonItem mode="ios">
                        <IonIcon icon={playForwardOutline} slot="start" />
                        <p className="ion-margin-end">Velocidad</p>
                        <IonRange
                            id="readingSpeed"
                            min={0}
                            max={2}
                            step={1}
                            snaps={true}
                            value={readingSpeed}
                            disabled={!isTextToSpeechEnabled}
                            onIonChange={e => {
                                const newSpeed = Number(e.detail.value);
                                setReadingSpeed(newSpeed); // Aplicar el cambio inmediatamente
                                setSuccessToast('Velocidad ajustada');
                            }}
                        />
                    </IonItem>
                </div>

                <div className='ion-padding-bottom'>
                    <h5>Modos de alto contraste</h5>
                    <IonItem mode="ios">
                        <IonIcon icon={contrastSharp} slot="start" />
                        <p className="ion-margin-end">Texto claro sobre fondo oscuro</p>
                        <IonToggle
                            id="highContrastDark"
                            slot="end"
                            checked={isHighContrast}
                            onIonChange={() => {
                                const newContrastState = !isHighContrast;
                                setIsHighContrast(newContrastState); // Aplicar el cambio inmediatamente
                                setSuccessToast(newContrastState ? 'Alto contraste activado' : 'Alto contraste desactivado');
                            }}
                        />
                    </IonItem>
                </div>
                {/* Botón para probar Text-to-Speech */}
                <IonButton
                color={'medium'}
                mode='ios'
                expand="block"
                size='small'
                fill='outline'
                className='ion-margin-bottom'
                onClick={handleTextToSpeech}
                disabled={!isTextToSpeechEnabled}>
                    Probar texto a voz
                </IonButton>

                <p
                    style={{
                        fontWeight: isBold ? 'bold' : 'normal',
                        fontSize: `${1 + textSize * 0.25}rem`,
                        color: isHighContrast ? '#F4F4F4' : '#343A40',
                        backgroundColor: isHighContrast ? '#343A40' : '#F4F4F4',
                        transition: 'all 0.3s ease',
                    }}
                >
                    Este es un texto de ejemplo para que pueda probar las configuraciones de accesibilidad.
                    Ajuste el tamaño del texto, el contraste y otras configuraciones para ver cómo afectan a este texto.
                </p>


                {/* Botón para guardar cambios */}
                <IonButton mode='ios' expand="block" onClick={saveSettings}>
                    Guardar cambios
                </IonButton>

                <IonToast
                    mode='ios'
                    isOpen={!!successToast}
                    position='bottom'
                    message={successToast}
                    duration={3000}
                    onDidDismiss={() => setSuccessToast('')}
                    color={'success'}
                    style={{ color: 'white' }}
                />
            </IonContent>
        </IonPage>
    );
};

export default AccessibilitySettings;
