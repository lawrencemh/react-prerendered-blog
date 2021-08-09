#!/usr/bin/env node

const axios   = require('axios');
const authors = require('../../public/data/authors');
const topics  = [
    // Hotels
    {
        name           : 'hotels',
        category       : 'hotels',
        sentences      : [
            'Top 10 hotels in {x}',
            'Great home swaps in {x}',
            'After visiting {x} I was amazed by their hotels',
            '5 of the best stays in {x}!',
        ],
        imageSearchTerm: '{x} hotels',
    },

    // General travel
    {
        name           : 'travel',
        category       : 'travel',
        sentences      : [
            'Guide to traveling in {x}',
            'Have you thought about visiting {x}?',
            'Top 10 must dos in {x}!',
            'I visited {x}',
            'My experience in {x}',
        ],
        imageSearchTerm: '{x} destination',
    },

    // Best food
    {
        name           : 'food',
        category       : 'food',
        sentences      : [
            'What to eat in {x}',
            'Must see restaurants when visiting {x}',
            'My guide to great cafes in {x}',
            '5 of the yummiest meals you can find throughout {x}!',
        ],
        imageSearchTerm: '{x} food',
    },

];

const countries = [
    'Hong Kong',
    'Singapore',
    'Bangkok',
    'London',
    'Macau',
    'Kuala Lumpur',
    'Shenzhen',
    'New York City',
    'Antalya',
    'Paris',
    'Istanbul',
    'Rome',
    'Dubai',
    'Guangzhou',
    'Phuket',
    'Mecca',
    'Pattaya',
    'Taipei City',
    'Prague',
    'Shanghai',
    'Las Vegas',
    'Miami',
    'Barcelona',
    'Moscow',
    'Beijing',
    'Los Angeles',
    'Budapest',
    'Vienna',
    'Amsterdam',
    'Sofia',
    'Madrid',
    'Orlando',
    'Ho Chi Minh City',
    'Lima',
    'Berlin',
    'Tokyo',
    'Warsaw',
    'Chennai',
    'Cairo',
    'Nairobi',
    'Hangzhou',
    'Milan',
    'San Francisco',
    'Buenos Aires',
    'Venice',
    'Mexico City',
    'Dublin',
    'Seoul',
    'Mugla',
    'Mumbai',
    'Denpasar',
    'Delhi',
    'Toronto',
    'Zhuhai',
    'St Petersburg',
    'Burgas',
    'Sydney',
    'Djerba',
    'Munich',
    'Johannesburg',
    'Cancun',
    'Edirne',
    'Suzhou',
    'Bucharest',
    'Punta Cana',
    'Agra',
    'Jaipur',
    'Brussels',
    'Nice',
    'Chiang Mai',
    'Sharm el-Sheikh',
    'Lisbon',
    'East Province',
    'Marrakech',
    'Jakarta',
    'Manama',
    'Hanoi',
    'Honolulu',
    'Manila',
    'Guilin',
    'Auckland',
    'Siem Reap',
    'Sousse',
    'Amman',
    'Vancouver',
    'Abu Dhabi',
    'Kiev',
    'Doha',
    'Florence',
    'Rio de Janeiro',
    'Melbourne',
    'Washington D.C.',
    'Riyadh',
    'Christchurch',
    'Frankfurt',
    'Baku',
    'Sao Paulo',
    'Harare',
    'Kolkata',
    'Nanjing',
];


/**
 * Get a random image for the search term.
 *
 * @param {string} searchTerm
 *
 * @returns {Promise<() => string>}
 */
async function getFirstImageThumb(searchTerm) {
    const response         = await axios.get(`https://unsplash.com/napi/search?query=${searchTerm}&per_page=10&xp=`);
    const imageKeyToSelect = Math.floor(Math.random() * 10);

    return response.data.photos.results[imageKeyToSelect].urls.small;
}

/**
 * Get a random author UUID.
 *
 * @returns {String}
 */
function getRandomAuthorId() {
    return authors[Math.floor(Math.random() * authors.length)].id;
}

/**
 * Get a random date.
 *
 * @param {String} from
 * @param {String} to
 *
 * @returns {Date}
 */
function getRandomDate(from, to) {
    const fromTime = new Date(from).getTime();
    const toTime   = new Date(to).getTime();
    let date       = (new Date(fromTime + Math.random() * (toTime - fromTime)));
    date.setHours(0, 0, 0, 0);

    return date;
}

/**
 * Handle writing the given post to the posts data JSON file.
 *
 * @param post
 */
function addPostToPostsFile(post) {
    const fs  = require('fs');
    let posts = require('../../public/data/posts.json');
    posts.items.push(post);

    fs.writeFile('./public/data/posts.json', JSON.stringify(posts), err => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Added new post ${post.title}`);
        }
    });
}

countries.forEach(country => {
    let topic           = topics[Math.floor(Math.random() * topics.length)];
    let imageSearchTerm = topic.imageSearchTerm.replace('{x}', country);

    getFirstImageThumb(imageSearchTerm)
        .then(imageSrc => {
            let sentenceTemplate = topic.sentences[Math.floor(Math.random() * topic.sentences.length)];
            let title            = sentenceTemplate.replace('{x}', country);
            let post             = {
                'permalink'      : title
                    .replace(/ /g, '-')
                    .replace(/[^a-zA-Z0-9-]/g, '')
                    .toLowerCase(),
                'title'          : title,
                'thumb_src'      : imageSrc,
                'author_id'      : getRandomAuthorId(),
                'md_src'         : '/data/posts/test.md',
                'minutes_to_read': Math.floor(Math.random() * 30) + 1,
                'publish_at'     : getRandomDate('2015-01-01', '2023-01-01'),
                'category'       : topic.category,
            };

            addPostToPostsFile(post);
        });
});

