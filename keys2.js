const axios = require('axios');
const fs = require('fs');

// Define the API URL
const apiUrl = 'https://keys4.fun/';

// Fetch data from the API
axios.get(apiUrl)
    .then(response => {
        // Extract keys from the "rabbitstream" section
        const rabbitstreamKeys = response.data.rabbitstream.keys;

        // Format the keys into pairs with a space between each item
        const formattedKeys = [];
        for (let i = 0; i < rabbitstreamKeys.length; i += 2) {
            // Push the key pairs without quotes, each key pair represented as a string
            formattedKeys.push([rabbitstreamKeys[i], rabbitstreamKeys[i + 1]]);
        }

        // Format the keys into one long string
        const longStringKeys = rabbitstreamKeys.join(',');

        // Write the formatted keys to a file
       // fs.writeFileSync('keys', JSON.stringify(formattedKeys));

       // Write the long string keys to another file with square brackets
fs.writeFileSync('key.txt', '[' + longStringKeys.replace(/\"/g, '') + ']');

        console.log('Keys extracted and saved to key.txt');
       // console.log('Formatted keys:', formattedKeys);
        console.log('Long string keys:', '[' + longStringKeys.replace(/\"/g, '') + ']');


        // Push changes to keys branch
        const simpleGit = require('simple-git')();
        simpleGit.checkout('keys.txt', (err) => {
            if (!err) {
                simpleGit.add('.')
                    .commit('Update keys')
                    .push(['-u', 'origin', 'keys'], () => {
                        console.log('Keys pushed to keys branch');
                    });
            } else {
                console.error('Error checking out keys branch:', err);
            }
        });
    })
    .catch(error => {
        console.error('Error fetching or processing data:', error.message);
    });
