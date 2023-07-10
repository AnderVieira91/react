import React, { useEffect } from "react";
import { Button } from "@patternfly/react-core";
import { useLocalObservable, Observer } from "mobx-react-lite";

import * as http from "../../utils/http";

/**
 * Componente que representa a página inicial do sistema.
 *
 * @param autorizacao
 *          Objeto que representa a autorização do usuário.
 * @param mensagens
 *          Objeto que possui as mensagens internacionalizadas
 *          do sistema.
 */
const HomePage = ({ autorizacao, mensagens, ...props }) => {

    useEffect(() => {
        autorizacao.signinSilent();
    }, [])

    const todo = useLocalObservable(() => ({
        numero: 1,
        resposta: "Nenhum Resposta",
        async toggle(autorizacao) {
            this.numero++;
            // resolver problema de CORS
            http.get(autorizacao, "http://192.168.5.125:48080/keycloak/");
        }
    }));

    const deslogar = (event) => {
        autorizacao.signoutRedirect({ post_logout_redirect_uri: "/login" });
    };
    
    const renovar = (event) => {
        todo.toggle(autorizacao);
    }

    return(
        <Observer>
            {() =>(
                <div>
                    <Button variant="primary" onClick={deslogar}>{mensagens.deslogar}</Button>
                    <Button variant="primary" onClick={renovar}>{mensagens.renovar}</Button>
                    {todo.numero}
                </div>
            )}
        </Observer>
    );
}

export default HomePage;