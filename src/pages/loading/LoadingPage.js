import React, { useContext } from "react";

import { MensagemContext } from "../contexts/MensagemContext";
import Pagina from "../componentes/pagina/Pagina";
import Loading from "./Loading";

/**
 * Componente que representa uma página de loading.
 *
 */
const LoadingPage = () => {

    const { mensagens } = useContext(MensagemContext);

    return(
        <Pagina nomePagina={mensagens.telaLoading} mensagens={mensagens}>
            <Loading/>
        </Pagina>
    );
}

export default LoadingPage;