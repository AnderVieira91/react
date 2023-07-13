import React, { useContext } from "react";
import { useAuth } from "react-oidc-context";
import { PageHeader, PageHeaderTools, Button, Icon, FlexItem, Flex, Divider, Label } from "@patternfly/react-core";
import { UserIcon } from "@patternfly/react-icons";

import { MensagemContext } from "../../contexts/MensagemContext";
/**
 * Componente de cabeçalho da página padrão do sistema.
 *
 * @param nomePagina
 *          O nome da página.
 * @param navegadorEstaAberto
 *          Flag que indica se o navegador está aberto.
 * @param onToggleNavegador
 *          Callback a ser executado ao realizar o toggle do navegador.
 *
 * @author andersonvieira
 */
const Cabecalho = ({ nomePagina, navegadorEstaAberto, onToggleNavegador }) => {

    const { mensagens } = useContext(MensagemContext);

    const autorizacao = useAuth();

    const headerTools = (
        <PageHeaderTools>
            <Flex>
                <FlexItem>
                    <UserIcon />
                    &nbsp; 
                    {autorizacao?.user?.profile?.preferred_username}
                </FlexItem>

                <Divider
                        orientation={{ default: 'vertical'}}
                        inset={{ default: 'insetMd' }} />

                <FlexItem>
                    <Button
                            variant="danger"
                            onClick={(event) => autorizacao.signoutRedirect({ post_logout_redirect_uri: "/login" })}>
                        {mensagens.sair}
                    </Button>
                </FlexItem>
            </Flex>
        </PageHeaderTools>
    );

    return (
        <PageHeader
                logo={nomePagina}
                logoComponent="span"
                showNavToggle
                headerTools={headerTools}
                isNavOpen={navegadorEstaAberto}
                onNavToggle={onToggleNavegador}/>
    );

}

export default Cabecalho;