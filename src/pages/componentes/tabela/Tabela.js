import React, { useState, useContext } from "react";
import { Table, Caption, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import { Bullseye, EmptyState, EmptyStateVariant, EmptyStateIcon, Title, Icon, TitleSizes, Spinner, Flex, FlexItem } from "@patternfly/react-core";

import { CheckIcon, SearchIcon, TimesIcon } from "@patternfly/react-icons";

import { MensagemContext } from "../../contexts/MensagemContext";
import { isStringNaoVazia } from "../../../utils/utils";

/**
 * Componente responsável por criar uma tabela
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
 *
 * @author andersonvieira 
 */
const Tabela = ({ nomesColunas, linhas, ordemColunas, descricaoTabela, onLinhaSelecionada, isLoading }) => {

    const { mensagens } = useContext(MensagemContext);

    const [linhaSelecionada, setLinhaSelecionada] = useState([]);

    const estiloCabecalho = {
        backgroundColor: "var(--pf-c-table--BorderColor)"
    }

    const onRowClick = (linhaIndex) => {
        if (onLinhaSelecionada !== undefined && onLinhaSelecionada !== null) {
            setLinhaSelecionada(linhaIndex);
            onLinhaSelecionada(linhas[linhaIndex]);
        }
    }

    const renderizarLinhas = () => {
        const linhasTabela = [];

        linhas?.forEach((linha, linhaIndex) => {
            const colunasLinha = [];

            ordemColunas.forEach((coluna, colunaIndex) => {
                const valorColuna = linha[coluna];
                const key = `linha_${coluna}_${linhaIndex}_${colunaIndex}`;

                if (toString.call(valorColuna) !== "[object Boolean]") {
                    colunasLinha.push(<Td key={key} dataLabel={nomesColunas[colunaIndex]}>{valorColuna}</Td>);
                } else {
                    const icon = valorColuna ? <CheckIcon/> : <TimesIcon/>;
                    colunasLinha.push(<Td key={key} dataLabel={nomesColunas[colunaIndex]}><Icon>{icon}</Icon></Td>);
                }
            });

            linhasTabela.push(
                <Tr
                        key={linhaIndex}
                        onRowClick={() => onRowClick(linhaIndex)}
                        isRowSelected={linhaIndex === linhaSelecionada}>
                    {colunasLinha}
                </Tr>
            );
        });

        return linhasTabela;
    }

    const renderizarTableBody = () => {
        if (isLoading) {
            return;
        }

        const linhasTabela = renderizarLinhas();

        if (linhasTabela.length > 0) {
            return linhasTabela;
        }

        return (
            <Tbody>
                <Tr>
                    <Td colSpan={nomesColunas.length}>
                        <Bullseye>
                            <EmptyState variant={EmptyStateVariant.small}>
                                <EmptyStateIcon icon={SearchIcon} />
                                <Title headingLevel="h2" size="lg">
                                    {mensagens.tabelaVazia}
                                </Title>
                            </EmptyState>
                        </Bullseye>
                    </Td>
                </Tr>
            </Tbody>
        );
    }

    const renderizarTableHeader = () => {
        if (isLoading) {
            return;
        }

        return (
            <Thead>
                <Tr style={estiloCabecalho}>
                    {
                        nomesColunas?.map((nomeColuna, index) => (
                            <Th key={`coluna_${nomeColuna}_${index}`}>{nomeColuna}</Th>
                        ))
                    }
                </Tr>
            </Thead>
        );
    }

    const renderizarTableTitulo = () => {
        if (isStringNaoVazia(descricaoTabela)) {
            return (
                <Caption>
                    <Title headingLevel="h1" size={TitleSizes['4xl']}>
                        {descricaoTabela}
                    </Title> 
                </Caption>
            );
        }
    }

    const renderizarLoadingTabela = () => {
        if (isLoading) {
            return (
                <div className="loading-tabela">
                    <Spinner diameter="10%"/>
                </div>
            );
        }
    }

    const renderizarConteudoTabela = () => {
        const conteudo = [];
        conteudo.push(renderizarTableTitulo());
        conteudo.push(renderizarLoadingTabela());
        conteudo.push(renderizarTableHeader());
        conteudo.push(renderizarTableBody());

        return conteudo;
    }

    return (
        <Table aria-label="tabela-componse" variant="compact">
            { renderizarConteudoTabela() }
        </Table>
    );
}

export default Tabela;