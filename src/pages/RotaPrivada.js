import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "react-oidc-context";
import { Spinner } from '@patternfly/react-core';

/**
 * Rota que exige um usuário autenticado para ser exibida.
 *
 * @author andersonvieira
 */
const RotaPrivada = ({ children }) => {

    const autorizacao = useAuth();

    if (autorizacao.activeNavigator === "signinSilent" || autorizacao.activeNavigator === "signoutRedirect"
            || autorizacao.isLoading) {
        return (<Spinner isSVG diameter="80px" aria-label="loading-rota-privada" />);
    }

    if (!autorizacao.isAuthenticated) {
        return (<Navigate to={"/login"} />);
    }

    return children;
}

export default RotaPrivada;