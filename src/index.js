import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { IntlProvider } from 'react-intl';

import MainApp from "./pages/MainApp";

import mensagensIntl from "./mensagens/mensagensIntl";

/**
 * Arquivo responsável por "inicializar" o aplicativo.
 *
 * @author andersonvieira
 */

const idioma = navigator.language;
const messages = mensagensIntl[idioma] || mensagensIntl["pt-BR"];

const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 * Responsável por após o login no Keycloak,
 * "limpar" parâmetros contidos na URL.
 */
const onSigninCallback = () => {
     window.history.replaceState(
         {},
         document.title,
         window.location.pathname
     )
};

/**
 * Configuração do servidor OIDC.
 * Atualmente é o Keycloak.
 */
const oidcConfig = {
    authority: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/${process.env.REACT_APP_KEYCLOAK_REALM}`,
    client_id: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
    redirect_uri: `${process.env.REACT_APP_FRONTEND_BASE_URL}`,
    scope: "openid email profile",
    metadata: {
        check_session_iframe: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/login-status-iframe.html`,
        jwks_uri: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/certs`,
        issuer: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}`,
        token_introspection_endpoint: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/token/introspect`,
        userinfo_endpoint: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
        authorization_endpoint: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/auth`,
        token_endpoint: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/token`,
        end_session_endpoint: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/logout`,
        egistration_endpoint: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/clients-registrations/openid-connect`,
        introspection_endpoint: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/token/introspect`,
        revocation_endpoint: `${process.env.REACT_APP_KEYCLOAK_BASE_URL}/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/protocol/openid-connect/revoke`,
        revokeTokenTypes: ["access_token", "refresh_token"]
    },
    onSigninCallback: onSigninCallback
};

root.render(
    <IntlProvider locale={idioma} defaultLocale="pt-Br" messages={messages}>
        <AuthProvider {...oidcConfig} >
            <MainApp/>
        </AuthProvider>
    </IntlProvider>
);