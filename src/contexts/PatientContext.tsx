import { createContext, useContext, useState } from 'react';

const PatientContext = createContext({
    fullName: '',
    setFullName: (name: string) => { }
});

export const usePatient = () => {
    return useContext(PatientContext);
};

import { ReactNode } from 'react';

export const PatientProvider = ({ children }: { children: ReactNode }) => {
    const [fullName, setFullName] = useState('');

    return (
        <PatientContext.Provider value={{ fullName, setFullName }}>
            {children}
        </PatientContext.Provider>
    );
};
