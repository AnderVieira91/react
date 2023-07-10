import { injectIntl } from 'react-intl';
import { useAuth } from "react-oidc-context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RotaPrivada from "./RotaPrivada";
import HomePage from "./home/HomePage";
import LoginPage from "./login/LoginPage";

/**
 * Componente principal do aplicativo.
 * Contêm todas as rotas do sisema.
 *
 * @author andersonvieira
 */
const MainApp = (props) => {

	const { messages } = props.intl;

    const obterRolesUsuario = () => {
		if (!autorizacao || !autorizacao.user || !autorizacao.user.access_token) {
			return null;
		}

		const jsonWebToken = JSON.parse(atob(autorizacao.user.access_token.split('.')[1]));
		return jsonWebToken?.realm_access?.roles;
	}

	const autorizacao = useAuth();
	const rolesUsuario = obterRolesUsuario();

    return(
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/home" element={
							<RotaPrivada autorizacao={autorizacao} rolePermitida={"user"} rolesUsuario={rolesUsuario} >
								<HomePage mensagens={messages} />
							</RotaPrivada>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);

}

export default injectIntl(MainApp);