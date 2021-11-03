import React from 'react';
import Home from '../../pages/index';
import {render, screen} from '@testing-library/react';
import {PostEntity, PostMeta} from "../../lib/Posts";

describe('Home', () => {
    it('Renders the home page', async () => {
        const post: PostEntity = {
            id: 'my-test-post',
            meta: {
                title: 'My test post',
                publishAt: '2018-01-01',
                category: 'test news',
                authorId: 'rob',
                thumbSrc: null,
                minutesToRead: 5
            },
            author: {
                id: 'rob',
                meta: {
                    name: 'Rob Gilbert',
                    thumbSrc: null
                }
            }
        };

        render(<Home publishedPosts={[
            post
        ]}/>);

        expect(screen.getAllByText('My test post')[0]).toHaveTextContent('My test post');
    });
});
