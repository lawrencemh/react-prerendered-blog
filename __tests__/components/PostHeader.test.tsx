import {PostMeta} from "../../lib/Posts";
import {AuthorEntity} from "../../lib/Authors";
import PostHeader from "@/components/PostHeader";
import {render, screen} from '@testing-library/react';

describe('PostAuthor', () => {
    const defaultAuthor: AuthorEntity = {
        id: 'peter',
        meta: {
            name: 'Peter Adams',
            thumbSrc: null
        }
    };
    const postMeta: PostMeta = {
        title: 'test post',
        authorId: 'david',
        publishAt: '2020-01-01',
        minutesToRead: null,
        category: 'News',
        thumbSrc: null
    };

    it('it shows category', () => {
        const PostMeta: PostMeta = {
            ...postMeta,
            category: 'Travel'
        };

        render(<PostHeader author={defaultAuthor} postMeta={PostMeta} showCategory={true}/>);

        expect(screen.getByRole('link', {  name: /#travel/i})).toHaveTextContent('#Travel');
    });

    it('it shows date', () => {
        const PostMeta: PostMeta = {
            ...postMeta,
            publishAt: '2019-01-01'
        };

        render(<PostHeader author={defaultAuthor} postMeta={PostMeta} showCategory={true}/>);

        expect(screen.getByText(/jan 1, 2019/i)).toHaveTextContent('Jan 1, 2019');
    });

    it('it shows read time', () => {
        const PostMeta: PostMeta = {
            ...postMeta,
            minutesToRead: 53
        };

        render(<PostHeader author={defaultAuthor} postMeta={PostMeta} showCategory={true}/>);

        expect(screen.getByText(/– 53 min read/i)).toHaveTextContent('53 min read');
    })
});
