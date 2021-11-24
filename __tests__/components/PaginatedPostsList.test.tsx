import faker from 'faker';
import React from "react";
import {PostEntity} from "../../lib/Posts";
import {render, screen} from '@testing-library/react';
import PaginatedPostsList from "@/components/PaginatedPostsList";
import {DEFAULT_ITEMS_PER_PAGE} from "../../constants/pagination";

describe('PaginatedPostsList', () => {
    const testPosts: PostEntity[] = [];

    function generatePost(): PostEntity {
        return {
            id: faker.name.findName(),
            meta: {
                title: faker.name.findName(),
                authorId: faker.name.findName(),
                publishAt: faker.date.past(),
                thumbSrc: null,
                minutesToRead: faker.datatype.number(),
                category: 'Testing'
            },
            author: {
                id: faker.name.findName(),
                meta: {
                    name: faker.name.findName(),
                    thumbSrc: null
                }
            }
        }
    };

    beforeAll(() => {
        for (let i: number = 1; i < 5; i++) {
            testPosts.push(generatePost());
        }
    });

    it('renders basic post summaries', () => {
        render(<PaginatedPostsList posts={testPosts} currentPage={1} perPage={1} showEpic={false}/>);

        testPosts.forEach(post => {
            console.log(post);
            expect(screen.queryByText(post.meta.title)).toBeInTheDocument()
        })
    });
    //
    // it('renders posts with show epic', () => {
    //     render(<PaginatedPostsList posts={testPosts} currentPage={1} showEpic={true}/>);
    //
    //     // Assert EPIC which should show twice - one for desktop and a backup PostSummary for mobile view
    //     expect(screen.queryAllByText(testPosts[0].meta.title)).toHaveLength(2);
    //
    //     // Assert all other posts
    //     for (let i: number = 1; i < testPosts.length; i++) {
    //         expect(screen.queryByText(testPosts[i].meta.title)).toBeInTheDocument()
    //     }
    // });
    //
    // // test pagination - test after x amount they are hidden from page one
    // it('renders only posts for page 1 when pagination is possible', () => {
    //     render(<PaginatedPostsList posts={testPosts} currentPage={1} showEpic={false}/>);
    //
    //     const paginatedPosts:PostEntity[] = [];
    //
    //     for (let i: number = 1; i < 5; i++) {
    //         testPosts.push(generatePost());
    //     }
    //
    //     // Assert all other posts
    //     for (let i: number = 1; i < testPosts.length; i++) {
    //         expect(screen.queryByText(testPosts[i].meta.title)).toBeInTheDocument()
    //     }
    // });


    // test pagination - test page 2
});
