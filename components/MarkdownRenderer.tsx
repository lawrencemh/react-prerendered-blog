import {ReactElement} from "react";

const MarkdownRenderer = ({html}: {
    html: string
}): ReactElement => {
    return (
        <div className="markDown__container" dangerouslySetInnerHTML={{__html: html}}/>
    );
};

export default MarkdownRenderer;
