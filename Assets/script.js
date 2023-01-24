var apiButton = document.getElementById('button');

function hitApi() {
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={28772289c59f5c8ee8bb358bf22e23be}";

    fetch(requestUrl) 
    .then( 
        (response) => {
            console.log(response);
            return response.json(); 

    }
    );
}


apiButton.addEventListener('click', hitApi);