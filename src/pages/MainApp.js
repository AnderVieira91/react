import { injectIntl } from 'react-intl';
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

    return(
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/home" element={
							<RotaPrivada>
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