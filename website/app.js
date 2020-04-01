/* Global Variables */
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apikey = 'a1aff4cdace90981368abe34d463b032';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData = async (url = '', data = {})=>{
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData

    } catch(error){
        console.log("error", error);
    }
}


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    getInfo(baseUrl, zipCode, apikey)
        .then(function(response){
            postData("/addInfo", {temp: response.main, date: newDate, content: userResponse})
                .then(upDateUI());
        });
};

// Get data from Weather API and Web app
const getInfo = async (baseUrl, zip, key )=>{
    console.log("Fetching data...")
    const response = await fetch(baseUrl+zip+"&appid="+key);
    try {
        const data = await response.json();
        console.log(data)
        return data
    } catch(error) {
        console.log("error", error);
    }
}

// Update UI with data received from wheather API and Web app
const upDateUI = async () => {
    const req = await fetch('/all')
    
    try {
        const allData = await req.json();
        console.log("Updating data: ", allData);
        document.getElementById('date').innerHTML = "Current Time: " + allData.date;
        document.getElementById('temp').style.display = "block";
        document.getElementById('tempp').innerHTML = allData.temp.temp;
        document.getElementById('pressure').innerHTML = allData.temp.pressure;
        document.getElementById('humidity').innerHTML = allData.temp.humidity;
        document.getElementById('temp_min').innerHTML = allData.temp.temp_min;
        document.getElementById('temp_max').innerHTML = allData.temp.temp_max;
        document.getElementById('content').innerHTML = "How you Feel Today: " + allData.content;
        
    } catch(error){
        console.log("error", error)
    }
}

