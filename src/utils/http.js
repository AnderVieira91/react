/***
 * Responsável por realizar as chamadas http do sistema.
 *
 * @author andersonvieira.
 */

export const get = async (autorizacao, url, headers) => {
    await autorizacao.signinSilent();
    const token = autorizacao.user?.access_token;

    return fetch(url, {
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        }
    })
}