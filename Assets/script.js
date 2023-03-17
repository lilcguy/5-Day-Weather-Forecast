var apiButton = document.getElementById('button');
var citySearch = document.getElementById('search');

var pastSearchesDiv = document.getElementById('past');

let dummyArray = ['minneapolis', 'chicago', 'davenport'];
let dummyCity = 'bobert';

//do local storage stuff, delete obsolete dirREADME file and submit.

//function for local storage handling
    
function localStorageHandler(city) {
    
    //if statement: if something exists at this key, get it out and add to it.
        //if it returns false or nothing is in there, create it and add to it.

    if (localStorage.getItem("pastSearches")) {
        console.log("relevant localStorage Found. Working...")
        let searches = localStorage.getItem("pastSearches"); //take it out.
        console.log(searches); //returns string
        let searchesArray = searches.split(','); //split the string at commas, returns an array.
        console.log(searchesArray); 
        searchesArray.push(city); //add the city in the parameters to the array.

        var pastSearchElement = document.createElement('li'); //create the element on the page with the city.
        pastSearchElement.innerHTML = city;
        pastSearchesDiv.appendChild(pastSearchElement);
        //console.log(city);
        localStorage.setItem("pastSearches", searchesArray); //put the array back in with the new city added to it.

        
    } else {
        console.log("nothing found in localStorage. adding to it.");
        var pastSearchElement = document.createElement('li'); //create the element on the page with the city.
        pastSearchElement.innerHTML = city;
        pastSearchesDiv.appendChild(pastSearchElement);
        localStorage.setItem('pastSearches', city);
    }

}

//localStorageHandler(dummyCity);

//function to create card of wetaher data
function createCard (weatherData, index, divValue) {
    var div = document.getElementById(`${divValue}`);

    var date = document.createElement('h3');
        date.innerHTML = weatherData.list[index].dt_txt;
        div.appendChild(date);

    var icon = document.createElement('img');
        icon.src=`https://openweathermap.org/img/wn/${weatherData.list[index].weather[0].icon}@2x.png`
            div.appendChild(icon);
    var temp = document.createElement('h3');
        temp.innerHTML = `Temp: ${weatherData.list[index].main.temp}`;
            div.appendChild(temp);
    var wind = document.createElement('h3');
        wind.innerHTML = `Wind speed: ${weatherData.list[index].wind.speed}`;
            div.appendChild(wind);
    var humid = document.createElement('h3');
        humid.innerHTML = `Humidity: ${weatherData.list[index].main.humidity}`;
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
        temp.innerHTML = `Temp: ${weatherData.main.temp}`;
            div.appendChild(temp);
    var wind = document.createElement('h3');
        wind.innerHTML = `Wind speed: ${weatherData.wind.speed}`;
            div.appendChild(wind);
    var humid = document.createElement('h3');
        humid.innerHTML = `Humidity: ${weatherData.main.humidity}`;
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

//localStorage handling funciton

localStorageHandler(city);

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



// just thinking below this point. // 

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