import {ReactElement} from "react";

export default ({html}: {
    html: string
}): ReactElement => {
    return (
        <div className="markDown__container" dangerouslySetInnerHTML={{__html: html}}/>
    );
};
