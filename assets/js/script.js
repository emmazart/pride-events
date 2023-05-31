const locationForm = document.querySelector('#location-form');

function getBathroom(url) {
    fetch(url)
    .then(function (res) {
       return res.json();
    })
    .then(function (data) {
        console.log(data);
    })
};

function getData(event) {

    event.preventDefault();
    let location = document.querySelector('#location-input').value;
    console.log(location);
    let latitude = "33.753746";
    let longitude = "-84.386330";
    let bathroomApiUrl = `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=${latitude}&lng=${longitude}`;
    
    if (latitude && longitude) {
        getBathroom(bathroomApiUrl);
    }
}

locationForm.addEventListener('submit', getData)