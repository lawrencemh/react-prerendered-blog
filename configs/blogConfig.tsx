export default {
    /**
     * The name of your blog.
     */
    name: process.env.NEXT_PUBLIC_BLOG_NAME || 'My Blog',

    /**
     * The description of your blog for SEO meta purposes.
     */
    description: process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || 'An example blog',

    /**
     * The image location of your logo if available.
     *
     * e.g. /images/logo.png
     */
    logo: process.env.NEXT_PUBLIC_LOGO_SRC || '/images/static/example-logo.svg',

    /**
     * The optional header external link. This will show on the header if setup
     */
    externalLink: {
        // If false will hide
        show: !!process.env.NEXT_PUBLIC_SHOW_EXTERNAL_LINK,

        // The URL the user should be taken to
        href: process.env.NEXT_PUBLIC_EXTERNAL_LINK_HREF || '#',

        // The CTA to display on the button
        cta: process.env.NEXT_PUBLIC_EXTERNAL_LINK_TEXT || 'Link',
    },
};
