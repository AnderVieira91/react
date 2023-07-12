import React from "react";

import Pagina from "../componentes/pagina/Pagina";

import Loading from "./Loading";

/**
 * Componente que representa uma página de loading.
 *
 * @param autorizacao
 *          Objeto que representa a autorização do usuário.
 * @param mensagens
 *          Objeto que possui as mensagens internacionalizadas
 *          do sistema.
 */
const LoadingPage = ({ autorizacao, mensagens }) => {

    return(
        <Pagina autorizacao={autorizacao} nomePagina={mensagens.telaLoading} mensagens={mensagens}>
            <Loading/>
        </Pagina>
    );
}

export default LoadingPage;