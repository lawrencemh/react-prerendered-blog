/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images         : {
        path  : 'https://noop/',
        loader: 'imgix',
    },
};
