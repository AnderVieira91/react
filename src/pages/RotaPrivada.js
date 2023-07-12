import React from "react";
import { Navigate } from "react-router-dom";

import Loading from "./loading/Loading";
import NaoAutorizadoPage from "./naoAutorizado/NaoAutorizadoPage";

import { usuarioNaoPossuiRolePermitida } from "../utils/autorizacaoUtils";

/**
 * Rota que exige um usuário autenticado para ser exibida.
 *
 * @param rolePermitida
 *          A role permitida para acessar a rota.
 * @param autorizacao
 *          Objeto que representa a autorização do usuário.
 * @param mensagens
 *          Objeto que possui as mensagens internacionalizadas
 *          do sistema.
 * @param children
 *          O componente que representa a página a ser acessada
 *          pela rota.
 *
 * @author andersonvieira
 */
const RotaPrivada = ({ rolePermitida, autorizacao, mensagens, children }) => {

    if (!autorizacao.activeNavigator && autorizacao.isLoading) {
        return <Loading/>;
    }

    if (!autorizacao.isAuthenticated) {
        return (<Navigate to={"/login"} />);
    }

    if (usuarioNaoPossuiRolePermitida({ rolePermitida: rolePermitida, autorizacao: autorizacao })) {
        return <NaoAutorizadoPage autorizacao={autorizacao} mensagens={mensagens} />;
    }

    return children;
}

export default RotaPrivada;