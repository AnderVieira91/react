import React from "react";
import { Title, EmptyState, EmptyStateIcon, EmptyStateBody, EmptyStateVariant } from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

import Pagina from "../componentes/pagina/Pagina";

/**
 * Componente que representa uma página de loading.
 *
 * @param autorizacao
 *          Objeto que representa a autorização do usuário.
 * @param mensagens
 *          Objeto que possui as mensagens internacionalizadas
 *          do sistema.
 */
const NaoAutorizadoPage = ({ autorizacao, mensagens }) => {

    return(
        <Pagina autorizacao={autorizacao} nomePagina={mensagens.telaNaoAutorizado} mensagens={mensagens}>
            <div className="centralizado-pagina-padrao">
                <EmptyState variant={EmptyStateVariant.xl}>
                    <EmptyStateIcon icon={CubesIcon} />
                        <Title headingLevel="h5" size="4xl">
                            {mensagens.naoAutorizado}
                        </Title>

                        <EmptyStateBody>
                            {mensagens.textoNaoAutorizado}
                        </EmptyStateBody>
                </EmptyState>
            </div>
        </Pagina>
    );

}

export default NaoAutorizadoPage;