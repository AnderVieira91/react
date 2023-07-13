import React, { useContext } from "react";
import { Pagination, PaginationVariant } from "@patternfly/react-core";

import { MensagemContext } from "../../contexts/MensagemContext";
import Tabela from "./Tabela";

/**
 * Componente responsável por criar uma tabela páginada.
 *
 * @param nomesColunas
 *          Os nomes das colunas a serem exibidas.
 *          É esperado um array de string.
 * @param linhas
 *          As linhas a serem exibidas.
 *          É esperado um array de json.
 * @param ordemColunas
 *          A ordem das colunas para exibição.
 *          É esperado um array de string.
 * @param descricaoTabela
 *          Descrição da tabela a ser exibida acima dela.
 * @param onLinhaSelecionada
 *          Callback a ser utilizado ao selecionar uma linha.
 * @param onPaginaChange
 *          Callback a ser utilizado ao trocar de página.
 * @param totalItens
 *          Número total de itens.
 * @param onQntPorPagChange
 *          Callback a ser utilizada ao trocar a quantidade
 *          de itens por página.
 * @param paginaAtual
 *          A página atual.
 * @param qntPorPagAtual
 *          A quantidade por página atual.
 *
 * @author andersonvieira
 */
const TabelaPaginada = ({ nomesColunas, linhas, ordemColunas, descricaoTabela, onLinhaSelecionada,
        onPaginaChange, totalItens, onQntPorPagChange, paginaAtual, qntPorPagAtual }) => {

    const { mensagens } = useContext(MensagemContext);
    return (
        <div>
            <Tabela
                    nomesColunas={nomesColunas}
                    linhas={linhas}
                    ordemColunas={ordemColunas}
                    descricaoTabela={descricaoTabela}
                    onLinhaSelecionada={onLinhaSelecionada}/>
            <Pagination
                    perPageComponent="div"
                    itemCount={totalItens}
                    perPage={qntPorPagAtual}
                    page={paginaAtual}
                    variant={PaginationVariant.bottom}
                    titles={{ perPageSuffix: mensagens.itensPorPagina, ofWord: mensagens.de, items: mensagens.itens }}
                    onSetPage={onPaginaChange}
                    onPerPageSelect={onQntPorPagChange}/>
        </div>
    );

}

export default TabelaPaginada;