import React from 'react';
import { Navigate } from 'react-router-dom';

import { usuarioNaoPossuiRolePermitida } from '../utils/autorizacaoUtils';

/**
 * Rota que exige um usuário autenticado para ser exibida.
 *
 * @param rolePermitida
 *          A role permitida para acessar a rota.
 * @param autorizacao
 *          Objeto que representa a autorização do usuário.
 * @param children
 *          O componente que representa a página a ser acessada
 *          pela rota.
 *
 * @author andersonvieira
 */
const RotaPrivada = ({ rolePermitida, autorizacao, children }) => {

    if (!autorizacao.activeNavigator && autorizacao.isLoading) {
        return "LOADING PAGE à criar";
    }

    if (!autorizacao.isAuthenticated) {
        return (<Navigate to={"/login"} />);
    }

    if (usuarioNaoPossuiRolePermitida(rolePermitida, autorizacao)) {
        return "Não Autorizado";
    }

    return children;
}

export default RotaPrivada;