import React, { useEffect, useRef, useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRange, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonSkeletonText, IonToast } from '@ionic/react';
import PatientCard from '../../components/PatientCard/PatientCard';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import PatientService from '../../services/PatientService';
import { useHistory } from 'react-router';
import CardPlaceholder from '../../components/Placeholders/CardPlaceholder';
import ErrorOrException from '../../components/Placeholders/ErrorOrException';
import { Patient } from '../../models/Patient';
import { arrowBack, arrowForward, filterCircleOutline, trashBinOutline } from 'ionicons/icons';
import styles from './SearchResults.module.css';

const ITEMS_PER_PAGE = 10; // Número de pacientes a mostrar por página

const SearchResults: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const history = useHistory();
    const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
    const [showFailedToast, setShowFailedToast] = useState<boolean>(false);
    const [noResultsFound, setNoResultsFound] = useState<boolean>(false); // Nuevo estado para manejar resultados vacíos

    // Estados para la paginación
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(patients.length / ITEMS_PER_PAGE);

    // Estados para los filtros
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const [minAge, setMinAge] = React.useState<number>(0);
    const [maxAge, setMaxAge] = React.useState<number>(100);
    const [genderFilter, setGenderFilter] = useState<string | undefined>(undefined);
    const [stateFilter, setStateFilter] = useState<string | undefined>(undefined);

    const fetchPatients = async () => {
        try {
            setShowFailedToast(false);
            const fetchedPatients = await PatientService.getAllPatients();
            setPatients(fetchedPatients);
            setFilteredPatients(fetchedPatients); // Inicialmente, los pacientes filtrados son todos
            setLoading(false);
            setErrorOccurred(false);
            setNoResultsFound(false); // Resetea el estado al cargar pacientes
        } catch (error) {
            console.error('Error al obtener los pacientes:', error);
            setLoading(false);
            setErrorOccurred(true);
            setShowFailedToast(true);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleRetry = () => {
        setLoading(true);
        setErrorOccurred(false);
        fetchPatients();
    };

    const handleGoToHome = () => {
        history.push('/upload-images');
    };

    const modal = useRef<HTMLIonModalElement>(null);

    // Calcular los pacientes a mostrar en la página actual
    const indexOfLastPatient = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstPatient = indexOfLastPatient - ITEMS_PER_PAGE;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    // useEffect para aplicar los filtros automáticamente cuando cambian
    useEffect(() => {
        applyFilters();
    }, [genderFilter, minAge, maxAge, stateFilter]);

    const applyFilters = () => {
        let filtered = patients;

        if (genderFilter) {
            filtered = filtered.filter(patient => patient.gender === genderFilter);
        }

        filtered = filtered.filter(
            patient => patient.approximateAge >= minAge && patient.approximateAge <= maxAge
        );

        if (stateFilter) {
            filtered = filtered.filter(patient => patient.institution.direction.state === stateFilter);
        }

        setFilteredPatients(filtered);
        setCurrentPage(1);

        if (filtered.length === 0) {
            setNoResultsFound(true);
        } else {
            setNoResultsFound(false);
        }
    };

    const clearFilters = () => {
        setGenderFilter(undefined);
        setMinAge(0);
        setMaxAge(100);
        setStateFilter(undefined);
        setFilteredPatients(patients); // Restablecer a todos los pacientes
        setCurrentPage(1); // Volver a la primera página
        setNoResultsFound(false); // Resetear el estado de no resultados
    };

    return (
        <IonPage>
            <NavbarHeader title="Resultados" />

            <IonContent className='ion-padding'>

                {errorOccurred && (
                    <ErrorOrException
                        title="Ocurrió un error"
                        message="Sucedio un error al cargar los resultados de los pacientes. Por favor, intente cargarlos de nuevo o regrese al inicio."
                        customButtons={[
                            { text: "Reintentar", action: handleRetry },
                            { text: "Ir a inicio", action: handleGoToHome },
                        ]}
                    />
                )}

                {!loading && patients.length === 0 && !errorOccurred && (
                    <ErrorOrException
                        title="Ningún resultado encontrado"
                        message="Lo sentimos, no se encontraron pacientes que coincidan con los parámetros de búsqueda que nos proporcionaste. Puedes revisar la información o intentar con imágenes diferentes."
                        customButtons={[
                            { text: "Ir a inicio", action: handleGoToHome },
                        ]}
                    />
                )}

                {loading && (
                    <>
                        <div className='ion-padding-vertical'>
                            <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                            <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                            <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                        </div>

                        {[...Array(5)].map((_, index) => (
                            <CardPlaceholder key={index} />
                        ))}
                    </>
                )}

                {!loading && !errorOccurred && (
                    <>
                        <p>Las siguientes imágenes pueden ser no aptas para cualquier tipo de público. Se recomienda discreción.</p>

                        <div className='ion-padding-bottom' style={{ display: 'flex', width: '100%', gap: '5px' }}>
                            <IonButton style={{ flex: 1 }}
                                id="open-modal"
                                fill={genderFilter || stateFilter || minAge !== 0 || maxAge !== 100 ? 'solid' : 'outline'}
                                mode="ios"
                                color="secondary"
                                expand="block"
                            >
                                <IonIcon slot="start" icon={filterCircleOutline} />
                                Filtrar resultados
                            </IonButton>

                            <IonButton style={{ flex: 1 }}
                                fill="outline"
                                mode="ios"
                                color="danger"
                                expand="block"
                                onClick={clearFilters}
                            >
                                <IonIcon slot="start" icon={trashBinOutline} />
                                Borrar filtros
                            </IonButton>
                        </div>

                        <IonModal mode='ios' ref={modal} trigger="open-modal" initialBreakpoint={1} breakpoints={[0, 1]}>
                            <div className={styles['block']}>
                                <IonContent className="ion-padding">
                                    <IonSearchbar placeholder=" Buscar por palabra clave" animated></IonSearchbar>

                                    <IonList>
                                        {/* Tipo de Institución */}
                                        <IonItem>
                                            <IonLabel>Sexo de la persona desaparecida</IonLabel>
                                            <IonSelect
                                                placeholder="Selecciona un sexo"
                                                value={genderFilter}
                                                onIonChange={e => setGenderFilter(e.detail.value)}>
                                                <IonSelectOption value="masculino">Masculino</IonSelectOption>
                                                <IonSelectOption value="femenino">Femenino</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>

                                        {/* Rango de Edades */}
                                        <IonItem className='ion-margin-vertical'>
                                            <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                                                <div style={{ flex: 1 }}>
                                                    <IonLabel position="stacked">Edad mínima</IonLabel>
                                                    <IonInput
                                                        inputMode='numeric'
                                                        type="number"
                                                        value={minAge}
                                                        onKeyPress={(e) => {
                                                            // Permitir solo números y la tecla de retroceso
                                                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                        onIonInput={(e) => {
                                                            const value = Number(e.detail.value);
                                                            if (value >= 0 && value <= 100) {
                                                                setMinAge(value);
                                                            } else if (value < 0) {
                                                                setMinAge(0); // Establecer en 0 si es menor que 0
                                                            } else if (value > 100) {
                                                                setMinAge(100); // Establecer en 100 si es mayor que 100
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <IonLabel position="stacked">Edad máxima</IonLabel>
                                                    <IonInput
                                                        inputMode='numeric'
                                                        type="number"
                                                        value={maxAge}
                                                        onKeyPress={(e) => {
                                                            // Permitir solo números y la tecla de retroceso
                                                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                        onIonInput={(e) => {
                                                            const value = Number(e.detail.value);
                                                            if (value >= 0 && value <= 100) {
                                                                setMaxAge(value);
                                                            } else if (value < 0) {
                                                                setMaxAge(0); // Establecer en 0 si es menor que 0
                                                            } else if (value > 100) {
                                                                setMaxAge(100); // Establecer en 100 si es mayor que 100
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </IonItem>

                                        {/* Entidad Federativa */}
                                        <IonItem>
                                            <IonLabel>Entidad federativa de la institución</IonLabel>
                                            <IonSelect
                                                placeholder="Selecciona un estado"
                                                value={stateFilter}
                                                onIonChange={e => setStateFilter(e.detail.value)}>
                                                <IonSelectOption value="aguascalientes">Aguascalientes</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonList>
                                </IonContent>
                            </div>
                        </IonModal>

                        {/* Manejando el caso de resultados vacíos después de aplicar filtros */}
                        {!loading && noResultsFound && (
                            <ErrorOrException
                                title="Ningún resultado encontrado"
                                message={
                                    `Lo sentimos, no se encontraron pacientes que coincidan con los filtros activos para el sexo ${genderFilter || 'no especificado'}, ` +
                                    `la edad de ${minAge} a ${maxAge}, ` +
                                    `y el estado ${stateFilter || 'no especificado'}. `
                                }
                                fullHeight={false}
                            />
                        )}

                        {currentPatients.map((patient) => (
                            <PatientCard
                                isDetailedView={false}
                                key={patient.id}
                                patient={patient}
                                buttonLabel='Ver resultado'
                                link={`/individual-result/${patient.id}`}
                            />
                        ))}

                        {/* Controles de Paginación */}
                        <IonItem lines="none" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <IonButton
                                mode='ios'
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                style={{ flex: 1, marginRight: '8px' }}>
                                <IonIcon icon={arrowBack} />
                            </IonButton>

                            <span style={{ alignSelf: 'center', flex: '0 0 auto' }}>Página {currentPage} de {totalPages}</span>

                            <IonButton
                                mode='ios'
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                style={{ flex: 1, marginLeft: '8px' }}>
                                <IonIcon icon={arrowForward} />
                            </IonButton>
                        </IonItem>

                        {/* Texto de Total de Resultados */}
                        <p style={{ textAlign: 'center', marginTop: '8px' }}>
                            Mostrando {currentPatients.length} resultados de un total de {filteredPatients.length} resultados
                        </p>
                    </>
                )}

                <IonToast mode='ios'
                    isOpen={showFailedToast}
                    position='top'
                    message="Error al obtener los resultados de pacientes. Por favor, inténtelo más tarde."
                    duration={3000}
                    onDidDismiss={() => setShowFailedToast(false)}
                    color="danger"
                />
            </IonContent>
        </IonPage>
    );
};

export default SearchResults;
