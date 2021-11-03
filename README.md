![Screenshot](example.png?raw=true "Mockup and example of blog")

# React prerendered blog

A backend-free blog platform built on top of React & NextJS, utilising Tailwind CSS & Typescript.

React prerendered blog is a simple blog platform you can host without needing to rely on any backend systems. Using some
simple configuration, you can write posts in markdown and configure your authors in separate markdown files.

This is perfect for simple blogs with a few authors and posts although it is fully possible to host hundreds of posts 
(although at that point this platform may outgrow your needs and you may need a more advanced server rendered platform).

One of the main benefits to using a prerendered blog platform is you can easily host it on traditional web server,
a platform such as render.com, or alternately even an S3 bucket! Additionally you can relax not having to worry
about hacking attempts as post-deployment the blog is read only.

## System requirements
- Node v15 +
- NPM or Yarn

## Getting started

To create a new blog you can either fork this repo, or clone/download this repo to a local folder on your machine.

`git clone https://github.com/lawrencemh/react-prerendered-blog.git`

From here you may wish to create a new git repository to host your blog as it will make it easier to
add versioning to your posts and use platforms to create a deployment pipeline.

```
git remote add origin <address>
git push origin master
```

Next you will need to install the dependencies using either Yarn or NPM:

```
yarn install
# or alternatively
npm i
```

Next up is to create your environmental files `.env`. To do this we can copy the example env included in the project:

``` 
cp .env.example .env
```

In your `.env` you may wish to configure your logo and header if you wish to add an external link.

That‘s it! next up is configuration, adding your first post and author and then deploying!

## Configuration

There isn‘t too much to configure with your blog so this shouldn‘t take too long. Please note that 
when updating your `.env` locally, you will have to rebuild for the changes to take effect. Additionally
if you are running `dev` to watch your changes dynamically, likewise you will have to exit this process and relaunch the
start command for the changes to take effect.

##### Blog title & logo
In your `.env` you can set your blog name by changing `NEXT_PUBLIC_BLOG_NAME`. Additionally, you can swap out
the logo by updating the `NEXT_PUBLIC_LOGO_SRC` path. For the logo, you may simply wish to replace the one included
in `images/static/example-logo.svg`, or add a new logo in your desired format in the static folder 
(remembering to update the path to reflect this). Alternatively, you can also base64 encode your logo and set this as 
the value for `NEXT_PUBLIC_LOGO_SRC`.

##### Header
In the header of your blog (i.e. navbar), you can specify an external link should you wish to redirect users
away to your main site. By default, this is disabled. But you can enable it by setting `NEXT_PUBLIC_SHOW_EXTERNAL_LINK` to 
`true`. You can change the link and text shown on the button by updating `NEXT_PUBLIC_EXTERNAL_LINK_HREF` 
and `NEXT_PUBLIC_EXTERNAL_LINK_TEXT` respectfully.

##### Favicons
The favicons are located in the `public` directory. Should you wish to change them you will need to update
the following:
```
favicon.ico
favicon.png
favicon-16x16.png
favicon-32x32.png
```

To generate all the favicons automatically & different sizes there are many free online tools available with
great documentation [[for example]](https://favicon.io/favicon-generator/).

## Content
Adding content should be fairly straight-forwards. The two main directories you will need to use are `posts` 
and `authors` which are both within the root directory of the project. Each post and author will consist of
a single markdown `.md` file. At the top we can place some meta data that the app can read to help populate
the database during build time.

##### Adding authors
Each post requires an author. The `authors` directory is where these should go. It's best to use
a simple, lowercase name for authors if possible (e.g. `peter.md` or `peter-jones.md`) as this will
make it easier to reference in your post meta data. 

The properties available for each author are as follows:

| Property      | Description |
| ----------- | ----------- |
| name   | [Required] The author's name that will appear on posts. Here you can put the full, capitalised name.        |
| thumb_src   | The url path of the author's profile pic. As with the site logo, can be external or a local image in the public/images folder.        |
| github_url   | The author's github URL - not currently used.        |

To add an example author, we could add the following file in the `authors` directory. We will
create a profile for Peter by creating `peter.md`:


```

---
name: 'Peter Jones'
thumb_src: 'images/authors/peter-jones2.jpg'
---
Hey, I'm Peter. This is my profile summary.

```

##### Adding posts
The `posts` directory is where we will create a markdown file for every post in our blog. Like the
author files, we can specify some metadata that will help organise your posts during build time. Note
that the slug of your post will match that of the filename you give to your post (e.g. `my-post.md` can be
accessed at `https://yourblog.com/posts/my-post`). Like the authors filenames, it is likely a good idea
to keep these simple and use a consistent naming convention such as kebab case with no spaces.

The properties available for each post are as follows:

| Property      | Description |
| ----------- | ----------- |
| title   | [Required] The post's title that will appear on the post page or in categories when the post is displayed.        |
| thumb_src   | The url path of the image thumbnail you wish to use for the post. As with the site logo, can be external or a local image in the `/images` folder.        |
| author_id   | [Required] The author filename (from `authors` dir) that wrote this post. This must exactly match the filename for example (`peter`).        |
| minutes_to_read   | The number of estimated minutes to read. This should be an integer.      |
| publish_at   | [Required] The date this post is published at. This must be in the format `yyyy-mm-dd` however you may with to account for timezones and use a `ISO-8601` formatted datetime. Using this field you can hide your post automatically until it is supposed to be published with the client handling the logic. Note that you may need to rebuild your post on the publish date for your post in order for it to be built and published.  |
| category   | The category for this post (e.g. `travel` or `programming`). This can be whatever you wish, make sure you consistently use the same spelling for other posts in the category otherwise they will not appear under the category list together.  |

For Peter, let's create an example post. This post we can put in the `posts` directory as `my-trip-to-london.md`:

```

---
title: 'My trip to London'
publish_at: '2021-01-04T00:00:00.000Z'
thumb_src: 'images/posts/london.jpg'
author_id: 'peter'
minutes_to_read: 3
category: 'travel'
---

I recently had an opportunity at work to travel to London which I simply couldn't turn down! 
In this post I'm going to summarise some of the amazing tourist hotspots to visit including
some of my favourite restarants & cafés!

Upon arriving at London Gatwick I ventured... 

```

Now if you run `yarn dev` (or `npm run dev`) you can test your new blog, authors and posts! If everything
worked correctly you should see something resembling a blog.

##### Sitemap
When you run `yarn build` a `sitemap.xml` will automatically be built for you in the build directory.
This should help with SEO by making it easier for crawlers to crawl your blog and fine all your posts.
In order for this to work correctly you will need to set the `NEXT_PUBLIC_BLOG_URL` in your `.env` to be the
URL of your blog (e.g. `https//www.myawesomeblog.com` or `http://blog.mystore.info`).

## Deployment

When you are ready to deploy, you can run the following command

```
yarn build 
# or alternatively
npm run build
```

Then you can use a hosting service such as Vercel to host the app using `yarn start`.

If you want to extract your site into a separate build folder to host on a simple HTTP server, S3 bucket 
or platform like render.com, you can run the following:

```
yarn export
```

This will build your blog in the `/out` directory. You can simply upload this to a webserver if you wish or
you can use more some CI/CD to deploy the project from your GIT repository when you push your updates. You can 
use the likes of render.com or GitHub Actions to build your site and upload your assets.
