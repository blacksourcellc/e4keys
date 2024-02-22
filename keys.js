const axios = require('axios');
const fs = require('fs');

// Define the API URL
const apiUrl = 'https://keys4.fun/';

// Fetch data from the API
axios.get(apiUrl)
    .then(response => {
        // Extract keys from the "rabbitstream" section
        const rabbitstreamKeys = response.data.rabbitstream.keys;

        // Format the keys into pairs
        const formattedKeys = [];
        for (let i = 0; i < rabbitstreamKeys.length; i += 2) {
            formattedKeys.push([rabbitstreamKeys[i], rabbitstreamKeys[i + 1]]);
        }

        // Write the formatted keys to a file
        fs.writeFileSync('keys', JSON.stringify(formattedKeys, null, 2));

        console.log('Keys extracted and saved to keys');
    })
    .catch(error => {
        console.error('Error fetching or processing data:', error.message);
    });
