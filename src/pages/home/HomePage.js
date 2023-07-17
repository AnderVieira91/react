import React, { useContext } from "react";
import { useAuth } from "react-oidc-context";
import { Button } from "@patternfly/react-core";

import { MensagemContext } from "../contexts/MensagemContext";
import { LoadingContext } from "../contexts/LoadingContext";
import Pagina from "../componentes/pagina/Pagina";
import TabelaPaginada from "../componentes/tabela/TabelaPaginada";

import { get } from "../../utils/http";

/**
 * Componente que representa a página inicial do sistema.
 *
 */
const HomePage = () => {

    const { mensagens } = useContext(MensagemContext);
    const { setLoading } = useContext(LoadingContext);
    const autorizacao = useAuth();

    const nomesColunasTabela = ["col1", "col2", "col3", "col4"];
    const ordemColunasTabela = ["primeira", "segunda", "terceira", "booleano"];
    const linhasTabela = [
        {
            primeira: "1-1",
            segunda: "1-2",
            terceira: "1-3",
            booleano: true
        },
        {
            primeira: "2-1",
            segunda: "2-2",
            terceira: "2-3",
            booleano: true
        },
        {
            primeira: "3-1",
            segunda: "3-2",
            terceira: "3-3",
            booleano: false
        },
        {
            primeira: "4-1",
            segunda: "4-2",
            terceira: "4-3",
            booleano: true
        },
        {
            primeira: "5-1",
            segunda: "5-2",
            terceira: "5-3",
            booleano: false
        }
    ];

    const teste = async () => {
        setLoading(true);
        const response = await get(autorizacao, "/keycloak");
        
        if (response.ok) {
            const json = await response.json();
            console.log(json);
        }
        setLoading(false);
    }

    return(
        <Pagina nomePagina={mensagens.telaHome} mensagens={mensagens}>
            <div>
                <TabelaPaginada
                        nomesColunas={nomesColunasTabela}
                        linhas={linhasTabela}
                        ordemColunas={ordemColunasTabela}
                        onLinhaSelecionada={(linha) => console.log(linha)}
                        descricaoTabela="Tabela de Teste"
                        totalItens={5000}
                        paginaAtual={5}
                        qntPorPagAtual={10}/>
            </div>

            <Button variant="primary" onClick={(_) => teste()}>Botão</Button>
        </Pagina>
    );
}

export default HomePage;