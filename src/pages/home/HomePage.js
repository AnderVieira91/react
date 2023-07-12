import React from "react";

import Pagina from "../componentes/pagina/Pagina";

/**
 * Componente que representa a página inicial do sistema.
 *
 * @param autorizacao
 *          Objeto que representa a autorização do usuário.
 * @param mensagens
 *          Objeto que possui as mensagens internacionalizadas
 *          do sistema.
 */
const HomePage = ({ autorizacao, mensagens }) => {

    return(
        <Pagina autorizacao={autorizacao} nomePagina={mensagens.telaHome} mensagens={mensagens}>
            <div>
                Home
            </div>
        </Pagina>
    );
}

export default HomePage;