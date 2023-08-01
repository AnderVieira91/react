import React, { useState, useContext } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation } from 'react-router-dom';
import { PageSidebar, PageSidebarBody, Nav, NavItem, NavGroup, SearchInput, Icon, Text } from "@patternfly/react-core";
import { HomeIcon, TimesCircleIcon, FlagIcon, ClockIcon } from "@patternfly/react-icons";

import { MensagemContext } from "../../contexts/MensagemContext";

import gruposNavegacao from "../../gruposNavegacao.json";
import { obterRolesUsuario, usuarioPossuiRolePermitida } from "../../../utils/utils";

/**
 * Gera a barra de navegação lateral, para o usuário
 * poder acessar as telas do sistema.
 *
 * @param navegadorEstaAberto
 *          Flag que indica se o navegador está aberto.
 *
 * @author andersonvieira
 */
const BarraNavegacao = ({ navegadorEstaAberto }) => {

    const icones = {
        bandeira: <FlagIcon/>,
        casa: <HomeIcon/>,
        espera: <ClockIcon/>,
        proibido: <TimesCircleIcon/>
    }

    const { mensagens } = useContext(MensagemContext);

    const [filtro, setFiltro] = useState("");

    const localizacao = useLocation();
    const autorizacao = useAuth();
    const rolesUsuario = obterRolesUsuario(autorizacao);

    const gerartituloItem = (rota) => {
        const icone = rota.icone ? icones[rota.icone] : undefined;

        if (icone) {
            return (
                <a href={rota.path}>
                    <Icon isInline className="espacamento-icone">
                        {icone}
                    </Icon>
                    {mensagens[rota.label]}
                </a>
            );
        }

        return mensagens[rota.label];
    }

    const gerarTituloGrupo = (grupo) => {
        const icone = grupo.icone ? icones[grupo.icone] : undefined;

        if (icone) {
            return (
                <Text component="p">
                    <Icon isInline className="espacamento-icone">
                        {icone}
                    </Icon>
                    {mensagens[grupo.label]}
                </Text>
            );
        }

        return mensagens[grupo.label];
    }

    const renderizarGruposNavegacao = () => {
        const grupos = [];

        gruposNavegacao.grupos.forEach((grupo, indexGrupo) => {
            const rotas = [];

            grupo.rotas.forEach((rota, indexRota) => {
                if (mensagens[rota.label].toLowerCase().includes(filtro.toLowerCase())
                        && usuarioPossuiRolePermitida({ rolePermitida: rota.role, rolesUsuario: rolesUsuario })) {
                    rotas.push(
                        <NavItem
                                itemId={`${indexGrupo}_${indexRota}_${rota.label}`}
                                key={`${indexGrupo}_${indexRota}`}
                                preventDefault={localizacao.pathname === rota.path}
                                to={rota.path}
                                isActive={localizacao.pathname === rota.path}>
                            {gerartituloItem(rota)}
                        </NavItem>
                    );
                }
            });

            if (rotas.length > 0) {
                grupos.push(
                    <NavGroup title={gerarTituloGrupo(grupo)} key={`${indexGrupo}_${grupo.nome}`}>
                        {rotas}
                    </NavGroup>
                );
            }
        });

        return grupos;
    }

    const navegacao = (
        <Nav aria-label="barra-navegacao-lateral">
            <SearchInput
                    value={filtro}
                    aria-label="filtro-menu-navegacao"
                    type="search"
                    onChange={(_event, novoValorFiltro) => setFiltro(novoValorFiltro)} />
            {renderizarGruposNavegacao()}
        </Nav>
    );

    return (
        <PageSidebar className="background-azul" theme="light" isSidebarOpen={navegadorEstaAberto}>
            <PageSidebarBody>{navegacao}</PageSidebarBody>
        </PageSidebar>
    );

}

export default BarraNavegacao;