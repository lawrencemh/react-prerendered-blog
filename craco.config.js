require('dotenv/config');

const PrerenderSPAPlugin     = require('prerender-spa-plugin');
const SitemapPlugin          = require('sitemap-webpack-plugin').default;
const path                   = require('path');
const posts                  = require('./public/data/posts.json');
const authors                = require('./public/data/authors');
const normaliseUrlFromString = url => {
    return url.replace(/ /g, '-').toLowerCase();
};
const authorPages            = authors.map(author => normaliseUrlFromString(`/authors/${author.slug}`));
const blogPostsPages         = posts.items.map(post => normaliseUrlFromString(`/posts/${post.permalink}`));
const categoryPages          = posts.items.map(post => normaliseUrlFromString(`/categories/${post.category}`))
// remove duplicates
    .filter((v, i, a) => a.indexOf(v) === i);

module.exports = {
    style  : {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    webpack: {
        plugins: [
            // This is where we configure which routes to prerender as static HTML for SEO purposes
            new PrerenderSPAPlugin({
                routes   : [
                    '/',
                    ...authorPages,
                    ...blogPostsPages,
                    ...categoryPages,
                ],
                staticDir: path.join(__dirname, 'build'),
                renderer : new PrerenderSPAPlugin.PuppeteerRenderer({
                    renderAfterTime: 250,
                }),
            }),

            // This is where we configure sitemap.xml to be dynamically built
            new SitemapPlugin({
                base : process.env.REACT_APP_BLOG_URL ?? 'https://www.example.com',
                paths: [
                    '/',
                    ...authorPages,
                    ...blogPostsPages,
                    ...categoryPages,
                ],
            }),
        ],
    },
};
