import React, { useState, useContext } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation } from 'react-router-dom';
import { PageSidebar, Nav, NavItem, NavGroup, SearchInput } from "@patternfly/react-core";

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

    const { mensagens } = useContext(MensagemContext);

    const [filtro, setFiltro] = useState("");

    const localizacao = useLocation();
    const autorizacao = useAuth();
    const rolesUsuario = obterRolesUsuario(autorizacao);

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
                            {mensagens[rota.label]}
                        </NavItem>
                    );
                }
            });

            if (rotas.length > 0) {
                grupos.push(
                    <NavGroup title={mensagens[grupo.nome]} key={`${indexGrupo}_${grupo.nome}`}>
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
        <PageSidebar
                nav={navegacao}
                isNavOpen={navegadorEstaAberto} />
    );

}

export default BarraNavegacao;