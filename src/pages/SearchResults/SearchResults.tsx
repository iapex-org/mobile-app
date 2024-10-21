import React, { useContext, useEffect, useRef, useState } from 'react';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonSkeletonText } from '@ionic/react';
import PatientCard from '../../components/PatientCard/PatientCard';
import NavbarHeader from '../../components/NavbarHeader/NavbarHeader';
import { useHistory } from 'react-router';
import CardPlaceholder from '../../components/Placeholders/CardPlaceholder';
import ErrorOrException from '../../components/Placeholders/ErrorOrException';
import { Patient } from '../../models/Patient';
import { arrowBack, arrowForward, filterCircleOutline, trashBinOutline } from 'ionicons/icons';
import styles from './SearchResults.module.css';
import { useSearchContext } from '../../contexts/SearchContext';
import useTextToSpeechClick from '../../hooks/UseTextToSpeechClick';
import { useSearchResults } from '../../hooks/useSearchResults';
import { ImageContext } from '../../contexts/ImageContext';

const ITEMS_PER_PAGE = 4; // Número de pacientes a mostrar por página

const SearchResults: React.FC = () => {
    useTextToSpeechClick();
    const history = useHistory();

    // Obtener resultados del contexto
    const { searchResults, searchError, isLoading, formData, setFormData } = useSearchContext();
    const { searchPatients } = useSearchResults();
    const { setImages } = useContext(ImageContext);

    // Estados para los filtros
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const [minAge, setMinAge] = React.useState<number>(0);
    const [maxAge, setMaxAge] = React.useState<number>(100);
    const [genderFilter, setGenderFilter] = useState<string | undefined>(undefined);
    const [stateFilter, setStateFilter] = useState<string | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Estados para la paginación
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);

    const handleRetry = async () => {
        if (formData) {
            history.replace(`/processing-information`);
            await searchPatients(formData); // Relanzar la búsqueda con el mismo FormData
        }
    };

    const handleGoToHome = () => {
        history.replace('/upload-images');
    };

    const handleReviewInformation = () => {
        history.replace('/verify-images');
    };

    const modal = useRef<HTMLIonModalElement>(null);

    // Calcular los pacientes a mostrar en la página actual
    const indexOfLastPatient = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstPatient = indexOfLastPatient - ITEMS_PER_PAGE;
    const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

    // useEffect para aplicar los filtros automáticamente cuando cambian
    useEffect(() => {
        applyFilters();
    }, [genderFilter, minAge, maxAge, stateFilter, searchQuery]);

    const applyFilters = () => {
        let filtered = searchResults;

        if (genderFilter) {
            filtered = filtered!.filter(patient => patient.gender === genderFilter);
        }

        filtered = filtered!.filter(
            patient => patient.approximateAge >= minAge && patient.approximateAge <= maxAge
        );

        if (stateFilter) {
            filtered = filtered.filter(patient => patient.institution.direction.state === stateFilter);
        }

        if (searchQuery.trim() !== '') {
            filtered = filtered.filter(patient =>
                (patient.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (patient.lastName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (patient.secondLastName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                patient.skinColor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                patient.hair.toLowerCase().includes(searchQuery.toLowerCase()) ||
                patient.complexion.toLowerCase().includes(searchQuery.toLowerCase()) ||
                patient.eyeColor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                patient.institution.direction.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                patient.institution.direction.city.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredPatients(filtered);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setGenderFilter(undefined);
        setMinAge(0);
        setMaxAge(100);
        setStateFilter(undefined);
        setSearchQuery('');
        setFilteredPatients(searchResults); // Restablecer a todos los pacientes
        setCurrentPage(1);
    };

    useEffect(() => {
        if (searchResults.length !== 0) {
            setFormData(null);
            setImages([]);
            console.log('Limpiando FormData e imágenes...');
        }
    }, []);

    return (
        <IonPage>
            <NavbarHeader
                confirmBeforeBack
                title="Resultados encontrados"
                alertMessage='Si vuelves, perderás los resultados de la búsqueda actual.'
                backHandlerType='historyReplace'
            />

            <IonContent className='ion-padding'>

                {!isLoading && searchError && (
                    <ErrorOrException
                        title="Ocurrió un error"
                        message="Sucedio un error al procesar la información proporcionada. Por favor, intente cargarlos de nuevo o regrese al inicio e intentelo más tarde."
                        customButtons={[
                            { text: "Reintentar", action: handleRetry },
                            { text: "Ir a inicio", action: handleGoToHome },
                        ]}
                    />
                )}

                {!isLoading && searchResults.length === 0 && !searchError && (
                    <ErrorOrException
                        title="Ningún resultado encontrado"
                        message="Lo sentimos, no se encontraron pacientes que coincidan con los parámetros de búsqueda que nos proporcionaste. Puedes revisar la información o intentar con imágenes diferentes."
                        customButtons={[
                            { text: "Revisar información", action: handleReviewInformation },
                            { text: "Ir a inicio", action: handleGoToHome },
                        ]}
                    />
                )}

                {isLoading && (
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

                {!isLoading && !searchError && searchResults.length !== 0 && (
                    <>
                        <p>Las siguientes imágenes pueden ser no aptas para cualquier tipo de público. Se recomienda discreción.</p>

                        <div className='ion-padding-bottom' style={{ display: 'flex', width: '100%', gap: '5px' }}>
                            <IonButton size='small' style={{ flex: 1 }}
                                id="open-modal"
                                fill={searchQuery || genderFilter || stateFilter || minAge !== 0 || maxAge !== 100 ? 'solid' : 'outline'}
                                mode="ios"
                                color="secondary"
                                expand="block"
                            >
                                <IonIcon slot="start" icon={filterCircleOutline} />
                                Filtrar resultados
                            </IonButton>

                            <IonButton size='small' style={{ flex: 1 }}
                                fill="outline"
                                mode="ios"
                                color="danger"
                                expand="block"
                                disabled={!searchQuery && !genderFilter && !stateFilter && minAge === 0 && maxAge === 100}
                                onClick={clearFilters}
                            >
                                <IonIcon slot="start" icon={trashBinOutline} />
                                Borrar filtros
                            </IonButton>
                        </div>

                        {/* Barra de búsqueda y filtros */}
                        <IonModal className={styles['ion-modal']} mode='ios' ref={modal} trigger="open-modal" initialBreakpoint={1} breakpoints={[0, 1]}>
                            <div className={styles['block']}>
                                <IonContent className="ion-padding">
                                    <IonSearchbar
                                        placeholder="Buscar por palabra clave"
                                        value={searchQuery}
                                        onIonInput={e => setSearchQuery(e.detail.value!)} // Actualizar estado en tiempo real
                                        animated
                                    />
                                    <IonList>
                                        {/* Tipo de Institución */}
                                        <IonItem>
                                            <IonSelect
                                                labelPlacement='stacked'
                                                label="Sexo de la persona desaparecida"
                                                placeholder="Selecciona un sexo"
                                                value={genderFilter}
                                                onIonChange={e => setGenderFilter(e.detail.value)}>
                                                <IonSelectOption value="masculino">Masculino</IonSelectOption>
                                                <IonSelectOption value="femenino">Femenino</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>

                                        {/* Rango de Edades */}
                                        <IonItem className='ion-margin-top'>
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
                                            {/* <IonLabel>Entidad federativa de la institución</IonLabel> */}
                                            <IonSelect
                                                labelPlacement='stacked'
                                                label="Entidad federativa de la institución"
                                                placeholder="Selecciona un estado"
                                                value={stateFilter}
                                                onIonChange={e => setStateFilter(e.detail.value)}>
                                                <IonSelectOption value="aguascalientes">Aguascalientes</IonSelectOption>
                                                <IonSelectOption value="baja california">Baja California</IonSelectOption>
                                                <IonSelectOption value="baja california sur">Baja California Sur</IonSelectOption>
                                                <IonSelectOption value="campeche">Campeche</IonSelectOption>
                                                <IonSelectOption value="coahuila">Coahuila</IonSelectOption>
                                                <IonSelectOption value="colima">Colima</IonSelectOption>
                                                <IonSelectOption value="chiapas">Chiapas</IonSelectOption>
                                                <IonSelectOption value="chihuahua">Chihuahua</IonSelectOption>
                                                <IonSelectOption value="cdmx">Ciudad de México</IonSelectOption>
                                                <IonSelectOption value="durango">Durango</IonSelectOption>
                                                <IonSelectOption value="guanajuato">Guanajuato</IonSelectOption>
                                                <IonSelectOption value="guerrero">Guerrero</IonSelectOption>
                                                <IonSelectOption value="hidalgo">Hidalgo</IonSelectOption>
                                                <IonSelectOption value="jalisco">Jalisco</IonSelectOption>
                                                <IonSelectOption value="mexico">Estado de México</IonSelectOption>
                                                <IonSelectOption value="michoacan">Michoacán</IonSelectOption>
                                                <IonSelectOption value="morelos">Morelos</IonSelectOption>
                                                <IonSelectOption value="nayarit">Nayarit</IonSelectOption>
                                                <IonSelectOption value="nuevo leon">Nuevo León</IonSelectOption>
                                                <IonSelectOption value="oaxaca">Oaxaca</IonSelectOption>
                                                <IonSelectOption value="puebla">Puebla</IonSelectOption>
                                                <IonSelectOption value="queretaro">Querétaro</IonSelectOption>
                                                <IonSelectOption value="quintana roo">Quintana Roo</IonSelectOption>
                                                <IonSelectOption value="san luis potosi">San Luis Potosí</IonSelectOption>
                                                <IonSelectOption value="sinaloa">Sinaloa</IonSelectOption>
                                                <IonSelectOption value="sonora">Sonora</IonSelectOption>
                                                <IonSelectOption value="tabasco">Tabasco</IonSelectOption>
                                                <IonSelectOption value="tamaulipas">Tamaulipas</IonSelectOption>
                                                <IonSelectOption value="tlaxcala">Tlaxcala</IonSelectOption>
                                                <IonSelectOption value="veracruz">Veracruz</IonSelectOption>
                                                <IonSelectOption value="yucatan">Yucatán</IonSelectOption>
                                                <IonSelectOption value="zacatecas">Zacatecas</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                    </IonList>
                                </IonContent>
                            </div>
                        </IonModal>

                        {/* Manejando el caso de resultados vacíos después de aplicar filtros */}
                        {!isLoading && filteredPatients.length === 0 && (
                            <ErrorOrException
                                title="No hay coincidencias"
                                message={
                                    `No se encontraron coincidencias con los filtros activos para el sexo ${genderFilter || 'no especificado'}, ` +
                                    `la edad de ${minAge} a ${maxAge}, ` +
                                    `el estado ${stateFilter || 'no especificado'}` + (searchQuery ? `, y la búsqueda de "${searchQuery}".` : '.')
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
            </IonContent>
        </IonPage>
    );
};

export default SearchResults;
