import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { IntlProvider } from 'react-intl';

import MainApp from "./pages/MainApp";

import mensagensIntl from "./mensagens/mensagensIntl";

import "@patternfly/react-core/dist/styles/base.css";

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
    authority: "http://192.168.5.125:8080/auth/quarkus",
    client_id: "react",
    redirect_uri: "http://192.168.5.125:3000/home",
    scope: "openid email profile roles",
    metadata: {
        check_session_iframe: "http://192.168.5.125:8080/auth/realms/quarkus/protocol/openid-connect/login-status-iframe.html",
        jwks_uri: "http://192.168.5.125:8080/auth/realms/quarkus/protocol/openid-connect/certs",
        issuer: "http://192.168.5.125:8080/auth/realms/quarkus",
        token_introspection_endpoint: "http://192.168.5.125:8080/auth/realms/quarkus/protocol/openid-connect/token/introspect",
        userinfo_endpoint: "http://192.168.5.125:8080/auth/realms/quarkus/protocol/openid-connect/userinfo",
        authorization_endpoint: "http://192.168.5.125:8080/auth/realms/quarkus/protocol/openid-connect/auth",
        token_endpoint: "http://192.168.5.125:8080/auth/realms/quarkus/protocol/openid-connect/token",
        end_session_endpoint: "http://192.168.5.125:8080/auth/realms/quarkus/protocol/openid-connect/logout",
        egistration_endpoint: "http://192.168.5.125:8080/auth/realms/quarkus/clients-registrations/openid-connect",
        introspection_endpoint: "http://192.168.5.125:8080/auth/realms/quarkus/protocol/openid-connect/token/introspect"
    },
    onSigninCallback: onSigninCallback
};

root.render(
    <React.StrictMode>
        <IntlProvider locale={idioma} defaultLocale="pt-Br" messages={messages}>
                <AuthProvider {...oidcConfig} >
                    <MainApp/>
                </AuthProvider>
        </IntlProvider>
    </React.StrictMode>
);