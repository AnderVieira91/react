import { createContext, useState } from "react";

/**
 * Contexto utilizado para podermos acessar o componente de Loading
 * do sistema.
 *
 * @author andersonvieira
 */

export const LoadingContext = createContext({
    loading: false,
    setLoading: null
});

export const LoadingProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );

}