import React from 'react';
import {render, screen} from '@testing-library/react';
import Hashtag from '../../../components/PostHeader/Hashtag';

describe('Hashtag', () => {
    it('Renders the correct text', async () => {
        render(<Hashtag hashtag='news'/>);

        expect(screen.getByRole('link', {name: /#news/i})).toHaveAttribute('href', '/categories/news');
        expect(screen.getByRole('link', {name: /#news/i})).toHaveTextContent('news');
    });
});
