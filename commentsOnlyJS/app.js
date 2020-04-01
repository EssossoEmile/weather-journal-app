// Personal API Key for OpenWeatherMap API
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apikey = 'a1aff4cdace90981368abe34d463b032';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', listener);
/* Function called by event listener */
function listener(e){
    const newZip = document.getElementById('zip').value;
    const newFeeling = document.getElementById('feelings').value;
    console.log(newZip);
    console.log(newFeeling);
    getAPIData(baseUrl, newZip, apikey)
        .then(function(response){
            console.log(response.main)
            postData("/addwheatherinfo", {temp: response.main, date: newDate, content: newFeeling})
                .then(getProjectData());
        });
};

/* Function to GET Web API Data*/
const getAPIData = async (baseUrl, zip, key)=>{
    console.log("Fetching data...")
    const res = await fetch(baseUrl+zip+"&appid="+key);
    try {
        const data = await res.json();
        console.log(data)
        return data
    } catch(error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
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

/* Function to GET Project Data */
const getProjectData = async () => {
    const req = await fetch('/all')
    
    try {
        const allData = await req.json();
        console.log("Updating Project Data...: ", allData);
        document.getElementById('date').innerHTML = "Current Time: " + allData.date;
        ddocument.getElementById('temp').style.display = "block";
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