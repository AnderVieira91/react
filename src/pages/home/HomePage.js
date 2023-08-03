import React, { useEffect, useContext, useState } from "react";
import { useAuth } from "react-oidc-context";

import Pagina from "../componentes/pagina/Pagina";
import TabelaPaginada from "../componentes/tabela/TabelaPaginada";

import { MensagemContext } from "../contexts/MensagemContext";
import { LoadingContext } from "../contexts/LoadingContext";
import { get } from "../../utils/http";

/**
 * Componente que representa a página inicial do sistema.
 *
 */
const HomePage = () => {

    const { mensagens } = useContext(MensagemContext);
    const { setLoading } = useContext(LoadingContext);

    const [ loadingTabela, setLoadingTabela ] = useState(false);
    const [tabela, setTabela] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [qntPorPagina, setQntPorPagina] = useState(10);

    const autorizacao = useAuth();

    const nomesColunasTabela = ["col1", "col2", "col3"];
    const ordemColunasTabela = ["valor", "bool", "pagina"];

    useEffect(() => { atualizarTabela() }, [pagina, qntPorPagina]);


    const atualizarTabela = async () => {
        setLoading(true);
        setLoadingTabela(true);
        const response = await get(autorizacao, `/api/tabela?pagina=${pagina}&qntPorPagina=${qntPorPagina}`);

        if (response.ok) {
            const tabelaJson = await response.json();
            setTabela(tabelaJson);
        }

        setLoadingTabela(false);
        setLoading(false);
    }

    return(
            <Pagina nomePagina={mensagens.telaHome} mensagens={mensagens}>
                <div>
                    <TabelaPaginada
                            nomesColunas={nomesColunasTabela}
                            linhas={tabela}
                            ordemColunas={ordemColunasTabela}
                            onLinhaSelecionada={(linha) => console.log(linha)}
                            descricaoTabela="Tabela de Teste"
                            totalItens={5000}
                            onQntPorPagChange={setQntPorPagina}
                            onPaginaChange={setPagina}
                            qntPorPagAtual={qntPorPagina}
                            paginaAtual={pagina}
                            isLoading={loadingTabela}/>
                </div>
            </Pagina>

    );
}

export default HomePage;