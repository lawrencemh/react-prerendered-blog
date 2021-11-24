import React, {ReactElement} from 'react';
import {render, screen} from '@testing-library/react';
import {AuthorEntity} from "../../lib/Authors";
import PostAuthor from '../../components/PostAuthor';


describe('PostAuthor', () => {
    const defaultAuthor: AuthorEntity = {
        id: 'peter',
        meta: {
            name: 'Peter Adams',
            thumbSrc: null
        }
    };
    const content: ReactElement = <div></div>;

    it('Renders the authors full name', async () => {
        const author: AuthorEntity = {
            id: 'peter',
            meta: {
                name: 'Peter Adams',
                thumbSrc: null
            }
        };

        render(<PostAuthor author={author} content={content}/>);

        expect(screen.getByText(/Peter Adams/i)).toHaveTextContent('Peter Adams');
    });

    it('Renders the authors profile image', async () => {
        const author: AuthorEntity = {
            id: 'peter',
            meta: {
                name: 'Peter Adams',
                thumbSrc: 'peter.jpg'
            }
        };

        render(<PostAuthor author={author} content={content}/>);

        const img = screen.getByRole('img');

        expect(img).toHaveAttribute('src', 'peter.jpg');
    });

    it('Skips rendering the profile image when not set', async () => {
        const author: AuthorEntity = {
            id: 'peter',
            meta: {
                name: 'Peter Adams',
                thumbSrc: null
            }
        };

        render(<PostAuthor author={author} content={content}/>);

        const img = screen.queryByRole('img');

        expect(img).not.toBeInTheDocument();
    });

    it('renders the child elements', () => {
        const testContent = <p>test child</p>;

        render(<PostAuthor author={defaultAuthor} content={testContent}/>);

        expect(screen.getByText(/test child/i)).toHaveTextContent('test child');
    });
});
