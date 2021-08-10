import marked from 'marked';
import {useState, useEffect} from 'react';

const MarkdownRenderer = ({markdown}) => {
    const [markedHtml, setMarkedHtml] = useState('');

    useEffect(() => {
        setMarkedHtml(markdownToHtml(markdown));
    });

    return (
        <div className="markDown__container"
             dangerouslySetInnerHTML={{__html: markedHtml}}/>
    );
};

/**
 * Handle converting the given markdown to HTML.
 *
 * @param markdown
 *
 * @returns String
 */
const markdownToHtml = markdown => {
    const renderer = new marked.Renderer();

    renderer.link  = (href, title, text) => `<a target="_blank" href="${href}" title="${title}" rel="nofollow">${text}</a>`;

    return marked(markdown, {renderer: renderer});
};

MarkdownRenderer.defaultProps = {
    markdown: `# Marked in browser\\n\\nRendered by **marked**.`,
};

export default MarkdownRenderer;
