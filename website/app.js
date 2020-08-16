/* Global Variables */

// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}


let Apikey = '&appid=c0c4fc75220223e601b90cc3c2c06303';
let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//
document.getElementById('generate').addEventListener('click', getDynamicData);

function getDynamicData(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zipCode, Apikey)

        .then(function (data){
            // Add data to POST request
            postData('/weatherData', {date: newDate, temp: data.list[0].main.temp,  usrFeeling: feelings });            
            // UI Updates
            updateUI();            
        })
}


/* GET Web API Data */

const getWeather = async (baseURL, zip, key)=>{
    const res = await fetch(baseURL + zip + key)
    // console.log(res);

    try {
      const userData = await res.json();
      return userData;
    } catch (error) {
      console.log("error", error);
    }
  }
    

  
// Async POST
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

// Update user interface
const updateUI = async () => {
    const request = await fetch('/allData');
    try {
        const dataReq = await request.json();
        // console.log(dataReq)
        document.getElementById('date').innerHTML = `Date: ${dataReq[0].date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${dataReq[0].temp}`;
        document.getElementById('content').innerHTML = `Feeling: ${dataReq[0].usrFeeling}`;
    }
    catch (error) {
        console.log('error', error);
    }
}