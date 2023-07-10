import React  from 'react';
import { useAuth } from 'react-oidc-context';
import { Button } from '@patternfly/react-core';


const HomePage = ({ logoutUrl, mensagens, ...props }) => {
    const auth = useAuth();

    const deslogar = (event) => {
        auth.signoutRedirect({ post_logout_redirect_uri: "/login" });
    };

    return(<div><Button variant="primary" onClick={deslogar}>{mensagens.deslogar}</Button></div>)
}

export default HomePage;