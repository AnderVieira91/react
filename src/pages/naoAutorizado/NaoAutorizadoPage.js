import React, { useContext } from "react";
import { Title, EmptyState, EmptyStateIcon, EmptyStateBody, EmptyStateVariant, Text } from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

import { MensagemContext } from "../contexts/MensagemContext";
import Pagina from "../componentes/pagina/Pagina";

/**
 * Componente que representa uma página de loading.
 *
 */
const NaoAutorizadoPage = () => {

    const { mensagens } = useContext(MensagemContext);

    return(
        <Pagina nomePagina={mensagens.telaNaoAutorizado} mensagens={mensagens}>
            <div className="centralizado">
                <EmptyState variant={EmptyStateVariant.xl}>
                    <EmptyStateIcon icon={CubesIcon} />
                        <Title headingLevel="h5" size="4xl">
                            {mensagens.naoAutorizado}
                        </Title>

                        <EmptyStateBody>
                            <Text>
                                {mensagens.textoNaoAutorizado}
                            </Text>
                        </EmptyStateBody>
                </EmptyState>
            </div>
        </Pagina>
    );

}

export default NaoAutorizadoPage;