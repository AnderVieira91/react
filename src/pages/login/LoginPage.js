import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useAuth, hasAuthParams } from "react-oidc-context";
import { Spinner } from '@patternfly/react-core';

/**
 * Página responsável por redirecionar o usuário à tela de login do keycloak.
 *
 * @author andersonvieira
 */
const LoginPage = () => {

    const autorizacao = useAuth();
    const localizacao = useLocation();
    const pathFornecidoUsuario = localizacao.state || { from: { pathname: "/home" } };

    useEffect(() => {
      if (!hasAuthParams() && !autorizacao.isAuthenticated && !autorizacao.activeNavigator && !autorizacao.isLoading) {
          autorizacao.signinRedirect();
      }
    }, [autorizacao.isAuthenticated, autorizacao.activeNavigator, autorizacao.isLoading, autorizacao.signinRedirect]);

    if (autorizacao.activeNavigator || !autorizacao.isAuthenticated) {
        return (<Spinner isSVG diameter="80px" aria-label="loading-tela-login" />);
    }

    return (<Navigate to={pathFornecidoUsuario.from.pathname} />);
}

export default LoginPage;