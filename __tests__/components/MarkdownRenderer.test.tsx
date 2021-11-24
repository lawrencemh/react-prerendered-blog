import {render, screen} from "@testing-library/react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

describe('MarkdownRenderer', () => {
    it('Renders the child HTML', () => {
        const testMdHtml = `<div><h1>It works!</h1></div>`;

        render(<MarkdownRenderer html={testMdHtml}/>);

        expect(screen.getByText(/It works!/i)).toHaveTextContent('It works!');
    })
});
