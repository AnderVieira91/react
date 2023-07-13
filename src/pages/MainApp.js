import { injectIntl } from "react-intl";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MensagemProvider } from "./contexts/MensagemContext";
import HomePage from "./home/HomePage";
import LoginPage from "./login/LoginPage";
import LoadingPage from "./loading/LoadingPage";
import NaoAutorizadoPage from "./naoAutorizado/NaoAutorizadoPage";
import RotaPrivada from "./RotaPrivada";

import gruposNavegacao from "./gruposNavegacao.json";

/**
 * Componente principal do aplicativo.
 * Contêm todas as rotas do sisema.
 *
 * @author andersonvieira
 */
const MainApp = (props) => {

	const { messages } = props.intl;

	const paginas = {
		HomePage: <HomePage/>,
		LoadingPage: <LoadingPage/>,
		NaoAutorizadoPage: <NaoAutorizadoPage/>
	};

	const gerarRotasPrivadas = () => {
		const rotas = [];

		gruposNavegacao.grupos.forEach((grupo) => {
			grupo.rotas.forEach((rota) => {
				rotas.push(
					<Route key={rota.path} path={rota.path} element={
						<RotaPrivada rolePermitida={rota.role} >
							{paginas[rota.componente]}
						</RotaPrivada>
					} />
				);
			});
		});

		return rotas;
	}

    return(
		<MensagemProvider mensagens={messages}>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<LoginPage/>} />
					{gerarRotasPrivadas()}
				</Routes>
			</BrowserRouter>
		</MensagemProvider>
	);

}

export default injectIntl(MainApp);