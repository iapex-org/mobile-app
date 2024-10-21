import { useEffect, useRef } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const useTextToSpeechClick = () => {
    const { handleReadText, isTextToSpeechEnabled } = useAccessibility();
    const clickTracker = useRef<Map<HTMLElement, boolean>>(new Map());

    useEffect(() => {
        if (!isTextToSpeechEnabled) return; // Desactiva el hook si la opción está deshabilitada

        const handleClick = async (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target) return;

            const buttonElement = target.closest('ion-button, ion-fab-button, button, ion-datetime-button, ion-back-button, ion-buttons') as HTMLElement;
            const inputElement = target.closest('input, textarea') as HTMLInputElement;
            const selectElement = target.closest('ion-select') as HTMLIonSelectElement;
            const datetimeElement = target.closest('ion-datetime') as HTMLIonDatetimeElement;

            if (buttonElement) {
                const wasRead = clickTracker.current.get(buttonElement) || false;

                if (!wasRead) {
                    setTimeout(() => {
                        const textToRead =
                            buttonElement.textContent?.trim() ||
                            buttonElement.getAttribute('data-aria-label') ||
                            buttonElement.getAttribute('aria-label') ||
                            buttonElement.getAttribute('about') ||
                            'Botón sin descripción';

                        console.log('Texto a leer:', textToRead); // Agrega este log para verificar

                        handleReadText(textToRead);
                    }, 100);
                    clickTracker.current.set(buttonElement, true);
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                } else {
                    clickTracker.current.delete(buttonElement);
                    return;
                }
            }

            if (inputElement) {
                const labelElement = document.querySelector(`label[for="${inputElement.id}"]`);
                const labelText = labelElement ? labelElement.textContent?.trim() : '';
                const placeholderText = inputElement.placeholder || '';
                const inputValue = inputElement.value || '';

                const textToRead = inputValue
                    ? `${labelText}. Valor ingresado: ${inputValue}.`
                    : `${labelText}. ${placeholderText}.`;

                handleReadText(textToRead.trim() || 'Campo sin descripción');
                return;
            }

            if (selectElement) {
                const label = selectElement.getAttribute('label') || '';
                const placeholder = selectElement.getAttribute('placeholder') || 'Seleccione una opción';
                const value = selectElement.value;

                const textToRead = value
                    ? `${label}. Opción seleccionada: ${value}.`
                    : `${label}. ${placeholder}.`;

                handleReadText(textToRead);

                selectElement.removeEventListener('ionChange', handleSelectChange);
                selectElement.addEventListener('ionChange', handleSelectChange, { once: true });
                return;
            }

            if (datetimeElement) {
                setTimeout(() => {
                    const label = datetimeElement.getAttribute('aria-label') || 'Fecha';
                    handleReadText(label);
                }, 100);
                return;
            }

            if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'LABEL', 'LI', 'ION-TEXT', 'ION-CARD-TITLE', 'ION-LABEL', 'DIV'].includes(target.tagName)) {
                handleReadText(target.innerText.trim());
            } else if (['IMG'].includes(target.tagName)) {
                const altOrAria =
                    (target as HTMLImageElement).alt ||
                    target.getAttribute('aria-label') ||
                    'Imagen sin descripción';
                handleReadText(altOrAria);
            }
        };

        const handleSelectChange = (e: CustomEvent) => {
            const selectedOption = e.detail.value || 'Ninguna opción seleccionada';
            handleReadText(`Opción seleccionada: ${selectedOption}`);
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [handleReadText, isTextToSpeechEnabled]);

    return clickTracker;
};

export default useTextToSpeechClick;
