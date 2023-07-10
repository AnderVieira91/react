import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { hasAuthParams } from "react-oidc-context";

/**
 * Página responsável por redirecionar o usuário à tela de login do keycloak.
 *
 * @param autorizacao
 *          Objeto que representa a autorização do usuário.
 *
 * @author andersonvieira
 */
const LoginPage = ({ autorizacao }) => {

    const localizacao = useLocation();
    const pathFornecidoUsuario = localizacao.state || { from: { pathname: "/home" } };

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
        return (<></>);
    }

    return (<Navigate to={pathFornecidoUsuario.from.pathname} />);
}

export default LoginPage;