import { injectIntl } from "react-intl";
import { useAuth } from "react-oidc-context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./home/HomePage";
import LoginPage from "./login/LoginPage";
import LoadingPage from "./loading/LoadingPage";
import NaoAutorizadoPage from "./naoAutorizado/NaoAutorizadoPage";
import RotaPrivada from "./RotaPrivada";

/**
 * Componente principal do aplicativo.
 * Contêm todas as rotas do sisema.
 *
 * @author andersonvieira
 */
const MainApp = (props) => {

	const { messages } = props.intl;
	const autorizacao = useAuth();

    return(
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/login" element={<LoginPage autorizacao={autorizacao} />} />
					<Route path="/home" element={
						<RotaPrivada autorizacao={autorizacao} mensagens={messages} rolePermitida={"admin"} >
							<HomePage mensagens={messages} autorizacao={autorizacao} />
						</RotaPrivada>
					} />
					<Route path="/loading" element={
						<RotaPrivada autorizacao={autorizacao} mensagens={messages} >
							<LoadingPage mensagens={messages} autorizacao={autorizacao} />
						</RotaPrivada>
					} />
					<Route path="/nao-autorizado" element={
						<RotaPrivada autorizacao={autorizacao} mensagens={messages} >
							<NaoAutorizadoPage mensagens={messages} autorizacao={autorizacao} />
						</RotaPrivada>
					} />
				</Routes>
			</BrowserRouter>
		</div>
	);

}

export default injectIntl(MainApp);