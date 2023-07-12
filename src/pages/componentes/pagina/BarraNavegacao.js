import React, { useState } from "react";
import { PageSidebar, Nav, NavItem, NavGroup, SearchInput } from "@patternfly/react-core";

import { obterRolesUsuario, usuarioPossuiRolePermitida } from "../../../utils/autorizacaoUtils";

/**
 * Gera a barra de navegação lateral, para o usuário
 * poder acessar as telas do sistema.
 *
 * @param autorizacao
 *          Objeto que representa a autorização do usuário.
 * @param mensagens
 *          Objeto que possui as mensagens internacionalizadas
 *          do sistema.
 * @param navegadorEstaAberto
 *          Flag que indica se o navegador está aberto.
 * @param paginaAtual
 *          A páginaAtual
 *
 * @author andersonvieira
 */
const BarraNavegacao = ({ autorizacao, mensagens, navegadorEstaAberto, paginaAtual }) => {

    const [filtro, setFiltro] = useState("");

    const rolesUsuario = obterRolesUsuario(autorizacao);


    const grupoHome = () => {
        const itens = [];

        if (mensagens.telaHome.toLowerCase().includes(filtro.toLowerCase())
                && usuarioPossuiRolePermitida({ rolePermitida: "admin", rolesUsuario: rolesUsuario })) {
            itens.push(
                <NavItem
                        itemId="group-1_item-1"
                        key="group-1 item-1"
                        preventDefault={paginaAtual === mensagens.telaHome}
                        to="/home"
                        isActive={paginaAtual === mensagens.telaHome}>
                    {mensagens.telaHome}
                </NavItem>
            )
        }

        if (mensagens.telaLoading.toLowerCase().includes(filtro.toLowerCase())) {
            itens.push(
                <NavItem
                        itemId="group-1_item-2"
                        key="group-1_item-2"
                        preventDefault={paginaAtual === mensagens.telaLoading}
                        to="/loading"
                        isActive={paginaAtual === mensagens.telaLoading}>
                    {mensagens.telaLoading}
                </NavItem>
            )
        }

        if (itens.length > 0) {
            return (
                <NavGroup title={mensagens.inicio}>
                    {itens}
                </NavGroup>
            );
        }

        return null;
    }

    const grupoNaoAutorizado = () => {
        if (mensagens.telaNaoAutorizado.toLowerCase().includes(filtro.toLowerCase())) {
            return (
                <NavGroup title={mensagens.naoAutorizado}>
                    <NavItem
                            itemId="group-2_item-1"
                            key="group-2_item-1"
                            preventDefault={paginaAtual === mensagens.telaNaoAutorizado}
                            to="/nao-autorizado"
                            isActive={paginaAtual === mensagens.telaNaoAutorizado}>
                        {mensagens.telaNaoAutorizado}
                    </NavItem>
                </NavGroup>
            );
        }

        return null;
    }

    const menu = (
        <Nav aria-label="barra-navegacao-lateral">
            <SearchInput
                    value={filtro}
                    aria-label="filtro-menu-navegacao"
                    type="search"
                    onChange={(_event, novoValorFiltro) => setFiltro(novoValorFiltro)} />
            {grupoHome()}
            {grupoNaoAutorizado()}
        </Nav>
    );

    return (
        <PageSidebar
                nav={menu}
                isNavOpen={navegadorEstaAberto} />
    );

}

export default BarraNavegacao;