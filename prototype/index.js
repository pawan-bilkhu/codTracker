const API = require('call-of-duty-api')({platform: "battle"});
const fs = require('fs');
const path = require('path');
const root = path.dirname(path.dirname(__filename));

// API Authentication
async function authentication(SSO) {
    console.log("attempting login");
    try {
        await API.loginWithSSO(SSO);
    } catch (error) {
        console.error(error);
    }
}
// Entire Modern Warfare Multiplayer career statistics.
async function getLifetimeModernWarfareMultiplayerStats(username, platform) {
    let data = null;
    console.log("trying to retrieve data");
    try {
        data = await API.MWmp(username, platform);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
    return data;
}
// Entire Warzone career statistics.
// TODO: Fill in function with the API call using try and catch
async function getLifetimeModernWarfareWarzoneStats(username, platform){

}
// Recent Modern Warfare Multiplayer match information from the last 20 games played.
async function getRecentModernWarfareMultiplayerMatchDetails(username, platform) {
    let data = null;
    console.log("trying to retrieve data");
    try {
        data = await API.MWcombatmp(username, platform);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
    return data;
}
// Recent Warzone match information from the last 20 games played.
// TODO: Fill in function with the API call using try and catch
async function getRecentModernWarfareWarzoneMatchDetails(username, platform){

}
// Battle Royale and Plunder Statistics
// TODO: Fill in function with the API call using try and catch
async function getModernWarfareBattleRoyaleStatistics(username, platform){

}
// Weekly Statistics for Modern Warfare Multiplayer
// TODO: Fill in function with the API call using try and catch
async function getModernWarfareMultiplayerWeeklyStats(username, platform){

}
// "Analytical" information from the last 20 Modern Warfare Multiplayer matches
// TODO: Fill in function with the API call using try and catch
async function getModernWarfareMultiplayerMatchAnalysis(username, platform){

}
// Detailed "information" for specific Modern Warfare Multiplayer match
// TODO: Fill in function with the API call using try and catch
async function getModernWarfareMultiplayerMatchStats(matchId, platform){

}
// Detailed "information" for specific Modern Warfare Warzone match
// TODO: Fill in function with the API call using try and catch
async function getModernWarfareWarzoneMatchStats(matchId, platform) {

}

// write JSON to file
function writeJSON(data, filename) {
    if (data){
        let json = JSON.stringify(data, null, 4);
        console.log(filename);
        fs.writeFile(filename, json, 'utf8', function () {
            console.log(`writing to ${filename} successful`)
        });
    }
}

async function resourceHandler(filename, username, platform, sso, resource) {
    let date = new Date();
    let jsonpath = path.join(root, "data", `${filename}_${dateHandler(date)}.json`);
    let data = null;
    try {
        data = require(jsonpath);
    } catch (error) {
        console.error(error);
    }
    if (data) {
        console.log(`file ${jsonpath} already exists`);
    } else {
        await authentication(sso);
        data = await resource(username, platform);
        writeJSON(data, jsonpath);
    }
}

function dateHandler(date){
    return `${date.getFullYear()}_${date.getMonth()}_${date.getDay()}`;
}

async function main() {
    let username = "THEDARKKNIGHT15";
    let platform = "acti";
    let SSO = "ODMxMzkwMDczMTMyOTQxMzUwMjoxNjQ1NjU0Njg5MzI0OmQ4MDBmODQ4YjFhMjNiZTA2YjBkNDYxYzY3NWYwMTYy";

    await resourceHandler('MW_multiplayer', username, platform, SSO, getLifetimeModernWarfareMultiplayerStats);
    // FIXME: match details resource handler doesn't return the expected data
    await resourceHandler('MW_matchDetails', username, platform, SSO, getRecentModernWarfareWarzoneMatchDetails);
}

main();

