const locationForm = document.querySelector('#location-form');
const bathroomUl = document.querySelector('#bathroom-data');

// api handler function
function getBathroom(url) {
    fetch(url)
    .then(function (res) {
       return res.json();
    })
    .then(function (data) {
        console.log(data);

        // map through the retrieved data and print to the page
        data.map(function(data) {
            console.log(data);
            const newBathroomElHeader = document.createElement("li");
            newBathroomElHeader.textContent = data.name;
            bathroomUl.append(newBathroomElHeader);

            // check if the bathroom is marked as accessible
            if (data.accessible) {
                newBathroomElHeader.append(' ♿ ');
            };

            // check if the bathroom is marked as unisex
            if (data.unisex) {
                newBathroomElHeader.append(' Unisex ');
            };

            
        })
    })
};

function getData(event) {

    event.preventDefault();

    let location = document.querySelector('#location-input').value;
    let latitude = "33.753746";
    let longitude = "-84.386330";
    
    // check to make sure we have the proper data to make the api call
    if (latitude && longitude) {
        let bathroomApiUrl = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=${latitude}&lng=${longitude}`;
        getBathroom(bathroomApiUrl);
    }
}

// event listener for form submission
locationForm.addEventListener('submit', getData)