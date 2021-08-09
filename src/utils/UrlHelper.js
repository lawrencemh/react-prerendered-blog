export const normaliseUrlFromString = url => {
    return url.replace(/ /g, '-').toLowerCase();
};
