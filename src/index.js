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
 * Configuração do servidor OIDC.
 * Atualmente é o Keycloak.
 */
const oidcConfig = {
    authority: "http://192.168.5.125:8080/auth/quarkus",
    client_id: "react",
    redirect_uri: "http://192.168.5.125:3000/home",
    metadata: {
        authorization_endpoint: "http://192.168.5.125:8080/auth/realms/quarkus/protocol/openid-connect/auth",
        token_endpoint: "http://192.168.5.125:8080/auth/realms/quarkus/protocol/openid-connect/token",
        end_session_endpoint: "http://192.168.5.125:8080/auth/realms/quarkus/protocol/openid-connect/logout"
    }
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