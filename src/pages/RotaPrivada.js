import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from '@patternfly/react-core';

/**
 * Rota que exige um usuário autenticado para ser exibida.
 *
 * @author andersonvieira
 */
const RotaPrivada = ({ rolePermitida, rolesUsuario, autorizacao, children, ...props }) => {

    const rolePermitidaEstaPreenchida = () => {
        return rolePermitida !== undefined && rolePermitida !== null && rolePermitida.trim().length > 0;
    }

    if (autorizacao.activeNavigator === "signinSilent" || autorizacao.activeNavigator === "signoutRedirect"
            || autorizacao.isLoading) {
        return (<Spinner isSVG diameter="80px" aria-label="loading-rota-privada" />);
    }

    if (!autorizacao.isAuthenticated) {
        return (<Navigate to={"/login"} />);
    }

    if (rolePermitidaEstaPreenchida() &&
            (rolesUsuario === undefined || rolesUsuario === null || !rolesUsuario.includes(rolePermitida))) {
        return "Não Autorizado";

    }

    return children;
}

export default RotaPrivada;