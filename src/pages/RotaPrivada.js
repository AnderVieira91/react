import React from "react";
import { useAuth } from "react-oidc-context";
import { Navigate } from "react-router-dom";

import Loading from "./loading/Loading";
import NaoAutorizadoPage from "./naoAutorizado/NaoAutorizadoPage";

import { usuarioNaoPossuiRolePermitida } from "../utils/utils";

/**
 * Rota que exige um usuário autenticado para ser exibida.
 *
 * @param rolePermitida
 *          A role permitida para acessar a rota.
 * @param children
 *          O componente que representa a página a ser acessada
 *          pela rota.
 *
 * @author andersonvieira
 */
const RotaPrivada = ({ rolePermitida, children }) => {

    const autorizacao = useAuth();

    if (!autorizacao.activeNavigator && autorizacao.isLoading) {
        return <Loading/>;
    }

    if (!autorizacao.isAuthenticated) {
        return (<Navigate to={"/login"} />);
    }

    if (usuarioNaoPossuiRolePermitida({ rolePermitida: rolePermitida, autorizacao: autorizacao })) {
        return <NaoAutorizadoPage/>;
    }

    return children;
}

export default RotaPrivada;