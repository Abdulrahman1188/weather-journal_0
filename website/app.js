/* Global Variables */

//personal API Key for openWeatherMap
const apiKey = ',&appid=e9d1f16c2e45edfa2475e082af25de33&units=imperial';
const apiUrl = 'http://localhost:8000/';

const zipCodeElement = document.getElementById('zip');
const feelingsCodeElement = document.getElementById('feelings');
const dateElement = document.getElementById('date');
const tempElement = document.getElementById('temp');
const contentElement = document.getElementById('content');

const catchError = (error) => console.error('Some Error Has Been =>', error);

//event listener to add function to existing HTML DOM Element
document.getElementById('generate').addEventListener('click', onGenerate);

//post data to API
function onGenerate(){
    let data = {
        zipCode: zipCodeElement.value,
        content: feelingsCodeElement.value,
        Date: new Date()
    };
    
    //post data to API for get zip code information
    getZipCodeInformation(data.zipCode).then(zipInfo => {
        //return and show alert if city is not found
        if (zipInfo.cod != 200)
           return alert(zipInfo.message);

           //now post data to server for save and display in holder section
           data.temp = zipInfo.list[0].main.temp;
           postDateToServer(data);
    }).catch(catchError);
};

//get zip code information from API
async function getZipCodeInformation(zipCode) {
    return await (await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKey}`)).json()
}

//post data to server for saving
async function postDateToServer(data){
    let response = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    try {
        if(!response.ok) {
            alert('Process Not Successfully');
            return;
        }

        response.json().then(data => {
            if (response.ok)
                updateUI();
            else
                alert('Process Not Successfully');
        }).catch(catchError);
    }
    catch (error) {
        catchError(error);
    }
}

//Update UI

async function updateUI() {
    let response = await fetch(`${apiUrl}getAll`);

    try{
        response.json().then(data => {
            dateElement.innerHTML = `Date Is: ${data.date}`;
            tempElement.innerHTML = `Temp Is: ${data.temp}`;
            contentElement.innerHTML = `My Feeling Is: ${data.content}`;
        }).catch(catchError);
    } catch (error) {
        catchError(error);
    };
};