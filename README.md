# React prerendered blog

A backend-free blog platform built on top of React.

React prerendered blog is a simple blog platform you can host without needing to rely on any backend systems. Using some
simple configuration, you can write posts in markdown and configure all your posts and authors in two JSON files.

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
if you are running `start` to watch your changes dynamically, likewise you will have to exit this process and relaunch the
start command for the changes to take effect.

##### Blog title & logo
In your `.env` you can set your blog name by changing `REACT_APP_BLOG_NAME`. Additionally, you can swap out
the logo by updating the `REACT_APP_LOGO_SRC` path. For the logo, you may simply wish to replace the one included
in `public/images/static/example-logo.svg`, or add a new logo in your desired format in the static folder 
(remembering to update the path to reflect this). Alternatively, you can also base64 encode your logo and set this as 
the value for `REACT_APP_LOGO_SRC`.

##### Header
In the header of your blog (i.e. navbar), you can specify an external link should you wish to redirect users
away to your main site. By default, this is disabled. But you can enable it by setting `REACT_APP_SHOW_EXTERNAL_LINK` to 
`true`. You can change the link and text shown on the button by updating `REACT_APP_EXTERNAL_LINK_HREF` 
and `REACT_APP_EXTERNAL_LINK_TEXT` respectfully.

##### Favicons
The favicons are located in the `public` directory. Should you wish to change them you will need to update
the following:
```
favicon.ico
favicon-16x16.png
favicon-32x32.png
```

To generate all the favicons automatically & different sizes there are many free online tools available with
great documentation [[for example]](https://favicon.io/favicon-generator/). You can stick with simply updating 
the basic favicons above, or add all the different versions the generator generates which adds better support
for Android & iOS, however you may need to add the additional favicons to the `manifest.json` and `index.html`
files in the public directory.

## Content
Adding content should be fairly straight-forwards. In the public directory there is a `data` folder. This is 
essentially your "database" of posts and authors and is loaded by the client dynamically. The two files you will
need to make changes to here are:
- `authors.json`
- `posts.json`

Additionally, there is a `posts` directory which contains the markdown for each of your blog posts.

##### Adding authors
Each post requires an author. The `authors.json` file is simply an array of authors. Each author
should be unique and should have a unique identifier. This can be an integer (e.g. 1,2,3) or a 
[[UUID]](https://www.uuidgenerator.net/) (e.g. `4f9a1251-9282-49f5-afa4-d31359f4d5a5`). The identifier
you use must be consistent with the author_id you later specify for each post.

The properties available for each author are as follows:

| Property      | Description |
| ----------- | ----------- |
| id      | [Required] The unique identifier of the author in integer or UUID format       |
| name   | [Required] The author's name that will appear on posts        |
| slug   | [Required] The url path the author's posts can be found at e.g. blog.com/authors/peter-adams        |
| image_src   | The url path of the author's profile pic. As with the site logo, can be external or a local image in the public/images folder        |
| github_url   | The author's github URL - not currently used        |

To add two example authors Hannah & Peter we could add the following to the `authors.json` file:

```
[
    {
        "id": "9a0b7759-86e1-4588-9d17-47ee9ad33ebf",
        "name": "Hannah",
        "slug": "hannah-jones",
        "image_src": "/images/authors/hannah.jpg",
        "github_url": null
    },
    {
        "id": "a78a326a-a27f-4d99-93b4-3cc24358daa2",
        "name": "Peter",
        "slug": "peter-adams",
        "image_src": "/images/authors/peter.jpg",
        "github_url": null
    }
]
```

##### Adding posts
The `posts.json` file is also an array of posts with each item containing metadata that will help
us render the blog posts correctly. In addition to creating an item in the JSON file for each post, 
you will also need to make a new, unique markdown file which contains the post content in `public/data/posts`.

The properties available for each post are as follows:

| Property      | Description |
| ----------- | ----------- |
| permalink   | [Required] The url path the post. This shouldn‘t contain spaces and needs to be unique for each post        |
| title   | [Required] The post's title that will appear on the post page or in categories when the post is displayed        |
| thumb_src   | The url path of the image thumbnail you wish to use for the post. As with the site logo, can be external or a local image in the public/images folder        |
| author_id   | [Required] The author id (from `authors.json`) that wrote this post. This must exactly match the author id        |
| md_src   | [Required] The filename of the markdown file that contains the post's content. This should be located in `public/data/posts`        |
| minutes_to_read   | The number of estimated minutes to read. This should be an integer.      |
| publish_at   | [Required] The date this post is published at. This must be in the format `yyyy-mm-dd` however you may with to account for timezones and use a `ISO-8601` formatted datetime. Using this field you can hide your post automatically until it is supposed to be published with the client handling the logic. Note that due to how this blog is processed by the client, theoretically the client could still retreive the post content beforehand so this is in no means a secure way of preventing a post appearing beforehand (e.g. competition winners).  |
| category   | The category for this post (e.g. `travel` or `programming`). This can be whatever you wish, make sure you consistently use the same spelling for other posts in the category otherwise they will not appear under the category list together.  |

For Hannah & Peter (the example authors we made earlier) we can add two example posts to the `posts.json` file

```
[
    {
        "permalink": "hello-world",
        "title": "Hello World!",
        "thumb_src": "/images/posts/hello.jpg",
        "author_id": "9a0b7759-86e1-4588-9d17-47ee9ad33ebf",
        "md_src": "/data/posts/hello-world.md",
        "minutes_to_read": 1,
        "publish_at": "2019-10-01T23:00:00.000Z",
        "category": "programming"
    },
    {
        "permalink": "my-guide-to-great-cafes-in-las-vegas",
        "title": "My guide to great cafes in Las Vegas",
        "thumb_src": "/images/posts/las-vegas.png",
        "author_id": "a78a326a-a27f-4d99-93b4-3cc24358daa2",
        "md_src": "/data/posts/las-vegas.md",
        "publish_at": "2015-12-14T00:00:00.000Z",
        "category": "food"
    }
]
```

For the first post we would add a new markdown file `public/data/posts/hello-world.md` which can contain any markdown, for example:

```
# Hello world!
This is my first blog post
```

For the second post we would do similar and add the content here `public/data/posts/las-vegas.md`.

Now if you run `yarn start` (or `npm run start`) you can test your new blog, authors and posts!

## Deployment

When you are ready to deploy, you can run the following command

```
yarn build 
# or alternatively
npm run build
```

This will build your blog in the `/build` directory. You can simply upload this to a webserver if you wish or
you can use more some CI/CD to deploy the project from your GIT repository when you push your updates. You can 
use the likes of render.com or GitHub Actions to build your site and upload your assets.
