import {getAllPostIds, getAllPosts, getPostData, PostEntity, postsDirectory} from '../../lib/Posts';

jest.mock('fs');

const testPostContent = `
---
title: 'Two Forms of Pre-rendering'
publish_at: '2021-01-01T00:00:00.000Z'
thumb_src: 'image.jpg'
author_id: '9a0b7759-86e1-4588-9d17-47ee9ad33ebf'
minutes_to_read': 1
category: 'news'
---

Hello. Hola. Bonjour.

![N|Solid](https://images.unsplash.com/photo-1534996858221-380b92700493?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&q=80)

Welcome to your first blog post! To get started, read the [[Read Me]](https://github.com/lawrencemh/react-prerendered-blog/blob/master/README.md). 
You‘ll want to update the authors database located in \`public/data/authors.json\`, add your first blog post in \`public/data/posts.json\` along with the content
in \`public/data/posts/*.md\` (replacing * with a unique name for each post). You can easily write your posts using markdown, 
for a quick tutorial you can [[click here]](https://www.markdowntutorial.com/).
`;

describe('PostsLib', () => {
    it('gets array of post IDs', () => {
        require('fs').__setMockFiles(postsDirectory, ['postA.md', 'postB.md']);

        const posts: string[] = getAllPostIds();

        expect(Array.isArray(posts)).toBeTruthy();
        expect(posts).toHaveLength(2);
        expect(posts).toEqual(expect.arrayContaining(['postA', 'postB']));
    });

    it('gets the post data', async () => {
        require('fs').__setMockFileContent(`${postsDirectory}/my-amazing-post.md`, testPostContent);

        const postData: PostEntity = await getPostData('my-amazing-post');

        expect(postData.id).toEqual('my-amazing-post');
        expect(postData.content).toContain('<p>Hello. Hola. Bonjour.</p>');
        expect(postData.meta).toBeInstanceOf(Object);
    });
});
