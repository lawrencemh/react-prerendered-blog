'use strict';

const path = require('path');

const fs = jest.createMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles       = Object.create(null);
let mockFileContent = Object.create(null);

function __setMockFiles(directory, files) {
    mockFiles[directory] = files;
}

function __setMockFileContent(directory, content) {
    mockFileContent[directory] = content;
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
    return mockFiles[directoryPath] || [];
}

function readFileSync(directoryPath) {
    return mockFileContent[directoryPath] || fs.readdirSync(directoryPath);
}

fs.__setMockFiles       = __setMockFiles;
fs.__setMockFileContent = __setMockFileContent;
fs.readdirSync          = readdirSync;
fs.readFileSync         = readFileSync;

module.exports = fs;
