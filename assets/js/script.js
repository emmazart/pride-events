const locationForm = document.querySelector('#location-form');
const bathroomUl = document.querySelector('#bathroom-data');

// api handler function
function getBathroom(url) {
    fetch(url)
    .then(function (res) {
       return res.json();
    })
    .then(function (data) {

        // map through the retrieved data and print to the page
        data.map(function(data) {
            console.log(data);

            // create card style for each bathroom
            const newBathroomDiv = document.createElement("div");
            const newBathroomElHeader = document.createElement("h4");
            const newBathroomUl = document.createElement("ul");
            const newBathroomAddress = document.createElement("li");
            const newBathroomDir = document.createElement("li");
            const newBathroomDist = document.createElement("li");

            newBathroomElHeader.textContent = data.name;
            if (data.street) {
                newBathroomAddress.textContent = data.street;
                newBathroomUl.append(newBathroomAddress);
            };

            if (data.directions) {
                newBathroomDir.textContent = data.directions;
                newBathroomUl.append(newBathroomDir);
            }

            if (data.distance) {
                newBathroomDist.textContent = data.distance;
                newBathroomUl.append(newBathroomDist);
            }

            newBathroomDiv.append(newBathroomElHeader, newBathroomUl);
            bathroomUl.append(newBathroomDiv);

            // check if the bathroom is marked as accessible
            if (data.accessible && data.unisex) {
                newBathroomElHeader.append(' ♿ ');
                const details = document.createElement('li');
                details.textContent = "Accesssible & Unisex";
                newBathroomUl.append(details);
            };

            if (data.accessible && !data.unisex) {
                newBathroomElHeader.append(' ♿ ');
                const details = document.createElement('li');
                details.textContent = "Accesssible";
                newBathroomUl.append(details);
            };

            // check if the bathroom is marked as unisex
            if (data.unisex && !data.accessible) {
                const details = document.createElement('li');
                details.textContent = "Unisex";
                newBathroomUl.append(details);
            };


        })
    })
};

function getLocation(location){
    const apiKey = 'fbf47f22714547c1853dbbc99509e1cc';
    let limit = 10;
    let weatherApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location.city},${location.state},US&limit=${limit}&appid=${apiKey}`;

    fetch(weatherApiUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            let lat = data[0].lat;
            let long = data[0].lon;
            let coordinates = {
                lat: lat,
                long: long
            };
            return coordinates;
        })
        .then(function(coordinates) {
            //destructure coordinates object into the two values
            let {lat, long} = coordinates;

            // check to make sure we have the proper data to make the api call
            if (lat && long) {
                let bathroomApiUrl = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=${lat}&lng=${long}`;
                getBathroom(bathroomApiUrl);
            }
        
        })
};

function getCoordinates(event) {

    event.preventDefault();

    let location = {
        city: document.querySelector('#location-input').value,
        state: 'Minnesota'
    };

    getLocation(location);
};

// event listener for form submission
locationForm.addEventListener('submit', getCoordinates)