import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonToolbar
} from '@ionic/react';

interface NavbarHeaderProps {
    title: string;
}

const NavbarHeader: React.FC<NavbarHeaderProps> = ({ title }) => {
    return (
        <IonHeader>
            <IonToolbar mode='ios'>
                <IonButtons slot="start" className='ion-margin-horizontal'>
                    <IonBackButton text={title} color='medium' defaultHref='#' />
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default NavbarHeader;
