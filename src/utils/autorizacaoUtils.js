/**
 * Utils responsável por lidar com o token de acesso do usuário.
 *
 * @author andersonvieira
 */

/**
 * Obtém as roles do usuário.
 *
 * @param autorizacao
 *          Objeto que representa os dados de autorização do usuário.
 *
 * @return
 *          As roles que o usuário possui.
 */
export const obterRolesUsuario = (autorizacao) => {
    if (!autorizacao || !autorizacao.user || !autorizacao.user.access_token) {
        return null;
    }

    const jsonWebToken = JSON.parse(atob(autorizacao.user.access_token.split('.')[1]));
    return jsonWebToken?.realm_access?.roles;
}

/**
 * Verifica se o usuário não possui uma role.
 *
 * @param rolePermitida
 *          A role permitida a ser verificada.
 * @param autorizacao
 *          Objeto que representa os dados de autorização do usuário.
 * @param rolesUsuario
 *          As roles do usuário.
 *
 * @return
 *          Se o usuário não possui a role em questão.
 */
export const usuarioNaoPossuiRolePermitida = ({ rolePermitida, autorizacao, rolesUsuario }) => {
    if (isStringVazia(rolePermitida)) {
        return false;
    }

    const rolesExistentes = rolesUsuario !== null && rolesUsuario !== undefined ?
            rolesUsuario
            : obterRolesUsuario(autorizacao);

    return rolesExistentes === undefined || rolesExistentes === null || !rolesExistentes.includes(rolePermitida);
}

/**
 * Verifica se o usuário possui uma role.
 *
 * @param rolePermitida
 *          A role permitida a ser verificada.
 * @param rolesUsuario
 *          As roles do usuário.
 *
 * @return
 *          Se o usuário possui a role em questão.
 */
export const usuarioPossuiRolePermitida = ({ rolePermitida, rolesUsuario }) => {
    return !usuarioNaoPossuiRolePermitida({ rolePermitida: rolePermitida, rolesUsuario: rolesUsuario })
}

/**
 * Verifica se uma string é vazia.
 *
 * @param str
 *          String a ser verificada.
 *
 * @return
 *          Se a string é vazia ou não. 
 */
const isStringVazia = (str) => {
    return str === undefined || str === null || str.trim().length < 1;
}