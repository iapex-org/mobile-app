import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { Institution } from '../../models/Institution';

interface InstitutionCardProps {
    institution: Institution;
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const InstitutionCard: React.FC<InstitutionCardProps> = ({ institution }) => {
    return (
        <IonCard mode='ios' className='ion-no-padding ion-no-margin ion-margin-bottom'>
            <img className="size-img" src={institution.imageUrl} alt={`Imagen de ${institution.name}`} />
            <IonCardHeader mode='ios'>
                <IonCardTitle>{institution.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent mode='ios'>

                <h2><b>Información general</b></h2>
                <div className='ion-padding-vertical'>
                    <p><b>Dirección:</b> {capitalize(institution.direction.state)}, {capitalize(institution.direction.city)}, {institution.direction.postalCode}, {capitalize(institution.direction.neighborhood)}, {capitalize(institution.direction.street)}, {institution.direction.number}</p>
                    <p><b>Horario de apertura:</b> {capitalize(institution.openingHours)}</p>
                </div>

                <h2><b>Información de contacto</b></h2>
                <div className='ion-padding-vertical'>
                    {institution.phoneNumbers && (
                        <p><b>Teléfono:</b> {institution.phoneNumbers}</p>
                    )}
                    {institution.emails && (
                        <p><b>Email:</b> {institution.emails}</p>
                    )}
                    {institution.websites && (
                        <p>
                            <b>Sitio web:</b> <a href={`http://${institution.websites}`} target="_blank" rel="noopener noreferrer">{institution.websites}</a>
                        </p>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {institution.phoneNumbers && (
                        <IonButton
                            color='tertiary'
                            expand="block"
                            href={`tel:${institution.phoneNumbers.split(',')[0].trim()}`}
                            mode='ios'
                            style={{ flexGrow: 1, marginRight: '8px' }}
                        >
                            Llamar institución
                        </IonButton>
                    )}
                    {institution.mapUrl && (
                        <IonButton
                            color='tertiary'
                            expand="block"
                            href={institution.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            mode='ios'
                            style={{ flexGrow: 1, marginRight: '8px' }}
                        >
                            Ver en el mapa
                        </IonButton>
                    )}
                </div>

            </IonCardContent>
        </IonCard>
    );
};

export default InstitutionCard;
