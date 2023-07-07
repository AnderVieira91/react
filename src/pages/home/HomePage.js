import React  from 'react';
import { useAuth } from "react-oidc-context";

const HomePage = ({ logoutUrl, mensagens, ...props }) => {

    const autorizacao = useAuth();

    return(<button onClick={() => {autorizacao.signoutSilent()}}>{mensagens.deslogar}</button>)
}

export default HomePage;