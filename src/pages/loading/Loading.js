import React from "react";
import { Spinner } from "@patternfly/react-core";

/**
 * Tela de loading do sistema.
 *
 * @author andersonvieira
 */
const Loading = () => {

    return(
        <div className="loading">
            <div className='wrapper'> 
                <Spinner isInline isSVG diameter="20%" aria-label="spinner-loading-page" />
            </div>
        </div>
    );

}

export default Loading;