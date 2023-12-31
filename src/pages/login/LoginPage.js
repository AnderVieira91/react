import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation, Navigate } from "react-router-dom";
import { hasAuthParams } from "react-oidc-context";

import Loading from "../loading/Loading";

/**
 * Página responsável por redirecionar o usuário à tela de login do keycloak.
 *
 * @author andersonvieira
 */
const LoginPage = () => {

    const autorizacao = useAuth();
    const localizacao = useLocation();
    const pathFornecidoUsuario = localizacao.state || { from: { pathname: "/" } };

    useEffect(
        () => {
            if (!hasAuthParams() && !autorizacao.isAuthenticated
                    && !autorizacao.activeNavigator && !autorizacao.isLoading) {
                autorizacao.signinRedirect();
            }
        },
        [
            autorizacao.isAuthenticated,
            autorizacao.activeNavigator,
            autorizacao.isLoading,
            autorizacao.signinRedirect
        ]
    );

    if (autorizacao.activeNavigator || !autorizacao.isAuthenticated) {
        return (<Loading/>);
    }

    return (<Navigate to={pathFornecidoUsuario.from.pathname} />);
}

export default LoginPage;