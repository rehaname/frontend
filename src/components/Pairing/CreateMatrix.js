import axios from 'axios';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {
    await sleep(500); // simulate server latency
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);

    axios.get('http://localhost:8888/api/pairingsave?jsonString=test',
    {headers: {'Content-Type': 'application/json'}}
        ).then(res => {
            console.log(res);
            alert("Received Successful response from server!");
        }, err => {
            alert("Server rejected response with: " + err);
        });
});