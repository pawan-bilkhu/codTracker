const API = require('call-of-duty-api')({platform: "battle"});
const fs = require('fs');
const path = require('path');
const root = path.dirname(path.dirname(__filename));

async function main() {
    let jsonpath = path.join(root, "data", "MW_multiplayer.json");
    let data = null;
    try {
        data = require(jsonpath);
    } catch (e) {
        console.log(e.error);
    }

    if (data) {
        console.log(`file ${jsonpath} already exists`);
    } else {
        console.log("attempting login");
        try {
            await API.loginWithSSO("ODMxMzkwMDczMTMyOTQxMzUwMjoxNjQ1NjU0Njg5MzI0OmQ4MDBmODQ4YjFhMjNiZTA2YjBkNDYxYzY3NWYwMTYy");
        } catch (Error) {
            console.error(Error);
        }
        console.log("trying to retrieve data");
        try {
            let data = await API.MWmp("THEDARKKNIGHT15", "acti");
            console.log(data);

            let json = JSON.stringify(data, null, 4);
            console.log(jsonpath);

            fs.writeFile(jsonpath, json, 'utf8', function () {
                console.log(`writing to ${jsonpath} successful`)
            });
        } catch (Error) {
            console.error(Error);
        }
    }

}

main();

