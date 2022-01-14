/* Global Variables */

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=fc2a1d90aba7f670bb4e0e5d24a2b0ae&units=imperial'

let userData = {};


document.getElementById("generate").addEventListener("click", performFun);

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

function performFun() {

    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById("feelings").value;
    //Get Data
    getData(baseUrl, zipCode, apiKey)
    .then (res => {
        // add data to POST request
        postData('/postData', { temp: userData.temp, date: newDate, userResponse: userResponse })
        //updating UI
    }).then(res=> {
          retrieveData()
    })
}


//Get Request
const getData = async (baseUrl, zipCode, apiKey) => {
    const res = await fetch(baseUrl +zipCode+ apiKey)
    try {
        let data = await res.json();
        userData.temp = data.main.temp;

    } catch (error) {
        console.log("error", error);
    }
}

//Post Request
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
       console.log("error", error);
    }
}
 //Dynamic UI
const retrieveData = async () =>{
    const request = await fetch('/getData');
    try {
  
    const allData = await request.json();
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('content').innerHTML =allData.userResponse;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }