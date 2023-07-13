import { createContext } from "react";

/**
 * Contexto utilizado para podermos acessar as mensagens de qualquer
 * componente necessário, sem precisar ir passando ela como parâmetro
 * em cascata.
 *
 * @author andersonvieira
 */

export const MensagemContext = createContext();

export const MensagemProvider = ({ mensagens, children }) => {

    return (
        <MensagemContext.Provider value={{ mensagens }}>
            {children}
        </MensagemContext.Provider>
    );

}