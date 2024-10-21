import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonText, IonToolbar, useIonAlert, useIonRouter } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router';

interface NavbarHeaderProps {
    title: string;
    showBackButton?: boolean;
    confirmBeforeBack?: boolean;
    alertHeader?: string;
    alertMessage?: string;
    backHandlerType?: 'routerGoBack' | 'historyReplace';
}

const NavbarHeader: React.FC<NavbarHeaderProps> = ({
    title,
    showBackButton = true,
    confirmBeforeBack = false,
    alertHeader = '¿Estás seguro de que quieres volver?',
    alertMessage = '',
    backHandlerType = 'routerGoBack',
}) => {
    const [presentAlert] = useIonAlert();
    const router = useIonRouter();
    const history = useHistory();

    // Lógica personalizada para el handler de regreso
    const handleBackNavigation = () => {
        if (backHandlerType === 'routerGoBack') {
            router.goBack();
        } else if (backHandlerType === 'historyReplace') {
            history.replace('/upload-images');
        }
    };

    const handleBackButtonClick = () => {
        if (confirmBeforeBack) {
            presentAlert({
                mode: 'ios',
                header: alertHeader,
                message: alertMessage,
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                    },
                    {
                        text: 'Volver',
                        handler: handleBackNavigation,
                    },
                ],
            });
        } else {
            handleBackNavigation();
        }
    };

    return (
        <IonHeader mode="ios">
            <IonToolbar mode="ios">
                <IonButtons
                    slot="start"
                    className="ion-margin-horizontal">
                    {showBackButton ? (
                        confirmBeforeBack ? (
                            <IonButton
                                aria-label={`Volver de '${title}' a la página anterior`}
                                onClick={handleBackButtonClick}
                                color="secondary"
                                fill="clear"
                            >
                                <IonIcon color='secondary' icon={chevronBackOutline} />
                                {title}
                            </IonButton>
                        ) : (
                            <IonBackButton
                                text={title}
                                data-aria-label={`Volver de '${title}' a la página anterior`}
                                color="secondary"
                                defaultHref="/"
                            />
                        )
                    ) : (
                        <IonText color="secondary"> {title} </IonText>
                    )}
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default NavbarHeader;
