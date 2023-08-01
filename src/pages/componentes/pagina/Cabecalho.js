import React, { useContext } from "react";
import { useAuth } from "react-oidc-context";
import { Masthead, MastheadMain, MastheadToggle, PageToggleButton, MastheadContent, Button, Divider,
        Toolbar, Flex, FlexItem, Icon, Text } from "@patternfly/react-core";
import { UserIcon, BarsIcon } from "@patternfly/react-icons";

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
        <Toolbar className="background-azul">
            <Flex justifyContent={{ default: "justifyContentFlexEnd" }}>
                <FlexItem>
                    <Text component="p">
                        <Icon isInline className="espacamento-icone">
                            <UserIcon/>
                        </Icon>
                        {autorizacao?.user?.profile?.preferred_username}
                    </Text>
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
        </Toolbar>
    );

    return (
        <Masthead className="background-azul">
            <MastheadToggle>
                <PageToggleButton
                        variant="plain"
                        aria-label="Global navigation"
                        isSidebarOpen={navegadorEstaAberto}
                        onSidebarToggle={onToggleNavegador}
                        id="vertical-nav-toggle">
                    <BarsIcon />
                </PageToggleButton>
            </MastheadToggle>
            <MastheadMain>
                {nomePagina}
            </MastheadMain>
            <MastheadContent>
                {headerTools}
            </MastheadContent>
        </Masthead>
    );

}

export default Cabecalho;