module.exports = {
    siteUrl          : process.env.NEXT_PUBLIC_BLOG_URL || 'https://example.com',
    generateRobotsTxt: true,
    robotsTxtOptions : {
        policies: [
            {userAgent: '*', allow: '/'},
        ],
    },
};
