import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Page, PageSection, PageSectionVariants } from "@patternfly/react-core";

import Cabecalho from "./Cabecalho";
import BarraNavegacao from "./BarraNavegacao";

/**
 * Componente responsável por renderizar uma página
 * padronizada pra o sistema.
 *
 * @param nomePagina
 *          O nome da página.
 * @param children
 *          Componentes filhos passados dentro do componente Pagina.
 *
 * @author andersonvieira
 */
const Pagina = ({ nomePagina, children }) => {

    const [navegadorEstaAberto, setNavegadorEstaAberto] = useState(false);

    const autorizacao = useAuth();

    useEffect(() => { autorizacao.signinSilent() }, []);

    const toggleNavegador = () => {
        setNavegadorEstaAberto(!navegadorEstaAberto);
    };

    const barraNavegacao = (<BarraNavegacao navegadorEstaAberto={navegadorEstaAberto}/>);
    const cabecalho = (
        <Cabecalho
                nomePagina={nomePagina}
                navegadorEstaAberto={navegadorEstaAberto}
                onToggleNavegador={toggleNavegador} />
    );

    return(
        <Page header={cabecalho} sidebar={barraNavegacao} >
            <PageSection variant={PageSectionVariants.dark}>
                {children}
            </PageSection>
        </Page>
    );

};

export default Pagina;