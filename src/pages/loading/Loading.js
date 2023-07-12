import React from "react";
import { Spinner } from "@patternfly/react-core";

/**
 * Tela de loading do sistema.
 *
 * @author andersonvieira
 */
const Loading = () => {

    return(
        <div className="centralizado">
            <Spinner isInline isSVG diameter="10%" aria-label="spinner-loading-page" />
        </div>
    );

}

export default Loading;