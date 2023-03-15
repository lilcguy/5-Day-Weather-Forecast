var apiButton = document.getElementById('button');
var citySearch = document.getElementById('search');

var pastSearchesDiv = document.getElementById('past');

// var arr = JSON.parse(localStorage.getItem("pastSearch"));
// console.log(arr);

// for (let i=0; i < pastSearches.length; i++) {
//     var past = document.createElement('h4');
//     past.innerHTML = pastSearches[i];
//     pastSearchesDiv.appendChild(past);
// }

//function to create card
function createCard (weatherData, index, divValue) {
    var div = document.getElementById(`${divValue}`);

    var date = document.createElement('h3');
        date.innerHTML = weatherData.list[index].dt_txt;
        div.appendChild(date);

    var icon = document.createElement('img');
        icon.src=`https://openweathermap.org/img/wn/${weatherData.list[index].weather[0].icon}@2x.png`
            div.appendChild(icon);
    var temp = document.createElement('h3');
        temp.innerHTML = weatherData.list[index].main.temp;
            div.appendChild(temp);
    var wind = document.createElement('h3');
        wind.innerHTML = weatherData.list[index].wind.speed;
            div.appendChild(wind);
    var humid = document.createElement('h3');
        humid.innerHTML = weatherData.list[index].main.humidity;
            div.appendChild(humid);
}
//for current card only sad face
function createCurrentCard(weatherData) {
    var div = document.getElementById("0");

    var date = document.createElement('h3');
        date.innerHTML = new Date();
        div.appendChild(date);

    var icon = document.createElement('img');
        icon.src=`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
            div.appendChild(icon);
    var temp = document.createElement('h3');
        temp.innerHTML = weatherData.main.temp;
            div.appendChild(temp);
    var wind = document.createElement('h3');
        wind.innerHTML = weatherData.wind.speed;
            div.appendChild(wind);
    var humid = document.createElement('h3');
        humid.innerHTML = weatherData.main.humidity;
            div.appendChild(humid);

}


console.log(citySearch.value);

function hitApi() {
    //forecast with lat lon API
    var latLonUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=51.50&lon=-0.127&appid=da19b83ebf45ed6902f1c6e45f186dfb";
    //geocoding URL
    var forecastUrl = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=da19b83ebf45ed6902f1c6e45f186dfb"

//city is passed in first for geocoding API.
//that returns lat and lot values that can be used for the forecast API.

var lat = 0;
var lon = 0;
console.log(lat, lon);

var city = citySearch.value; 
// var arr = [];

// arr.push(city);
// localStorage.setItem("pastSearch", JSON.stringify(arr));
// //localStorage

// var pastSearches = JSON.parse(localStorage.getItem("pastSearch"));
// console.log(pastSearches);

// for (let i=0; i < pastSearches.length; i++) {
//     var past = document.createElement('h4');
//     past.innerHTML = pastSearches[i];
//     pastSearchesDiv.appendChild(past);


// }




//current
// fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=da19b83ebf45ed6902f1c6e45f186dfb`)
// .then((response) => {
//     return response.json();
// }).then((data) => {
//     console.log("CURRENT WEATHER: " + data);
// });

//city/geocoding first
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=da19b83ebf45ed6902f1c6e45f186dfb`) 
    .then((response) => {
        return response.json();  
    })
    .then((data) => {
        console.log("Woo!", data[0].lat, data[0].lon);
        lat = data[0].lat; //set the lat and lon variables to use in the forecast API call
        lon = data[0].lon;
        console.log(`lat lon: ${lat} ${lon}`); 

        //current
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=da19b83ebf45ed6902f1c6e45f186dfb`)
        .then((response) => {
           return response.json();
        }).then((data) => {
            console.log(data);
            createCurrentCard(data);
        });
            //forecast
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=da19b83ebf45ed6902f1c6e45f186dfb`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            //console.log(data.list[0].dt_txt); //splice date at the space? " "
            //console.log(data.list[0].main.temp);
            //console.log(data.list[0].weather[0].icon);
            createCard(data, 3, 1);
            createCard(data, 11, 2);
            createCard(data, 19, 3);
            createCard(data, 27, 4);
            createCard(data, 35, 5);
        });
    });



}

apiButton.addEventListener('click', hitApi);
//citySearch.addEventListener('submit', hitApi);



//every 3 hours...
    //go through and find where date changes.
        //each day as 8 iterations, 40 iterations. easy math
        

//is dt just a timestamp to be formatted?
//dt_text - date

//wind object speed - wind

//weather.description - for icon (list.weather.icon) with a template literal? -- how do i use that? do i need to save them locally?
    //using icon urls?  
        // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
            // https://openweathermap.org/img/wn/10d@2x.png
                //

//main.humidity



//date, temp, wind speed, humidity, icon representation (in weather); 

//submit event listener for textaera;
    //how to insert that value into geocoder API url call? template litearl and a variable?
        // var x = search
        //url = ` http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=da19b83ebf45ed6902f1c6e45f186dfb ` 


    //store searches in local storage...
        //for loop to populate those items
    

// search form takes value, hits geocoder API with city name.
//that returns coordinates, take them, hit forecast API with imperial unit parameter set for temperature.
//use that returned information.

//eventually change button to the search functionality. funciton will probably take an argument of 'search.'

//array nums:
//0, 8, 16, 24, 32

//if divisible by 8
// % 

//add to array, stringify, add to local storage