import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface TemplateContextProps {
    template: string;
    setTemplate: Dispatch<SetStateAction<string>>;
}

const TemplateContext = createContext<TemplateContextProps>({
    template: 'desktop',
    setTemplate: () => {}, // Função vazia apenas para inicializar
});

export const useTemplate = () => {
    return useContext(TemplateContext);
};

interface TemplateProviderProps {
    template: string;
    children: React.ReactNode;
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({ template, children }) => {
    const [currentTemplate, setCurrentTemplate] = useState(template);

    const setTemplate = (newTemplate: string) => {
        setCurrentTemplate(newTemplate);
    };

    return (
        <TemplateContext.Provider value={{ template: currentTemplate, setTemplate }}>
            {children}
        </TemplateContext.Provider>
    );
};
