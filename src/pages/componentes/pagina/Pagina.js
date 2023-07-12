import React, { useEffect, useState } from "react";
import { Page, PageSection, PageSectionVariants } from "@patternfly/react-core";

import Cabecalho from "./Cabecalho";
import BarraNavegacao from "./BarraNavegacao";

/**
 * Componente responsável por renderizar uma página
 * padronizada pra o sistema.
 *
 * @param nomePagina
 *          O nome da página.
 * @param autorizacao
 *          Objeto que representa a autorização do usuário.
 * @param mensagens
 *          Objeto que possui as mensagens internacionalizadas
 *          do sistema.
 * @param children
 *          Componentes filhos passados dentro do componente Pagina.
 *
 * @author andersonvieira
 */
const Pagina = ({ autorizacao, nomePagina, mensagens, children }) => {

    const [navegadorEstaAberto, setNavegadorEstaAberto] = useState(false);
    
    useEffect(() => {autorizacao.signinSilent()}, []);

    const toggleNavegador = () => {
        setNavegadorEstaAberto(!navegadorEstaAberto);
    };

    return(
        <Page
                header={
                    <Cabecalho
                            nomePagina={nomePagina}
                            autorizacao={autorizacao}
                            mensagens={mensagens}
                            navegadorEstaAberto={navegadorEstaAberto}
                            onToggleNavegador={toggleNavegador} />
                }
                sidebar={
                    <BarraNavegacao
                            paginaAtual={nomePagina}
                            autorizacao={autorizacao}
                            mensagens={mensagens}
                            navegadorEstaAberto={navegadorEstaAberto}/>
                } >
            <PageSection variant={PageSectionVariants.light}>
                {children}
            </PageSection>
        </Page>
    );

};

export default Pagina;