import React from 'react';
import Header from '../../components/Header';
import {render, screen} from '@testing-library/react';

describe('Header', () => {
    it('Displays blog logo when available', async () => {
        render(<Header blogName='my blog' hasLogo={true} logoSrc='img.svg'/>);

        expect(screen.getByRole('img', {name: /my blog/i})).toHaveAttribute('src', 'img.svg');
    });

    it('Displays blog name when no logo available', async () => {
        render(<Header blogName='my awesome blog' hasLogo={false}/>);

        expect(screen.getByText(/my awesome blog/i)).toHaveTextContent('my awesome blog');
    });

    it('Displays blog name when no logo available', async () => {
        render(<Header blogName='my awesome blog' hasLogo={false}/>);

        expect(screen.getByText(/my awesome blog/i)).toHaveTextContent('my awesome blog');
    });

    it('Displays external CTA and link when provided', async () => {
        render(
            <Header
                blogName='my awesome blog'
                hasExternalLink={true}
                externalCta='clickMe'
                externalLink='http://www.google.co.nr'/>
        );

        expect(screen.getByText(/clickMe/i)).toHaveAttribute('href', 'http://www.google.co.nr');
        expect(screen.getByText(/clickMe/i)).toHaveTextContent('clickMe');
    });
});
