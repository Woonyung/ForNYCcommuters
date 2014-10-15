/*
test drive for citi bike api : visualization
Oct 15th, 2014
woonyungchoi@gmail.com


*/

// NYC subway enterance
// var myURL = 'https://nycopendata.socrata.com/api/views/he7q-3hwy/rows.json?accessType=DOWNLOAD';


//////////////// LOAD THE MAP //////////////////
// Provide your access token
L.mapbox.accessToken = '---------TOKENS-------------';
// Create a map in the div #map
var map = L.mapbox.map('map', '--------MAP ID--------')
    .setView([40.73, -74.00], 13);
var geocoder = L.mapbox.geocoder('mapbox.places-v1');


// constructor function for object
function BikeData(lat, lng){
    this.lat = lat;
    this.lng = lng;
}

var bikeDataArray = [];



///////////////// BIKE DATA////////////////////
// get bike data
function getBikeData(){
    var myURL = 'http://api.citybik.es/citi-bike-nyc.json';
    // make AJAX request
    $.ajax({
        url: myURL,
        type: 'GET',
        dataType: 'json',
        error: function(data){
            console.log("error");
        },
        success: function(data){
            console.log("YAY! bike data works!");
            //console.log(data);
            for (var i = 0; i < data.length; i++){
                var tempObject = new BikeData(data[i].lat * 0.000001, data[i].lng * 0.000001);
                bikeDataArray.push(tempObject);
            }

            // call function for put markers on the map
            mapBikeData(bikeDataArray);
        }
    });
    //console.log(bikeDataArray);
}

// based on the data, draw the dots
function mapBikeData(dataArray){

    // draw single marker
    // L.circle([40.73, -74.00], 50, {
    //     stroke: false,
    //     fillColor: 'rgb(255,0,0)',
    //     fillOpacity: 1
    // }).addTo(map);

    // looping through all the array and put dots on the map
    for (var i =0; i < dataArray.length; i++){
        // console.log(bikeDataArray[i].lat);
        var bikeCircle = L.circle([dataArray[i].lat,dataArray[i].lng], 50,{
            stroke: false,
            fillColor: 'rgb(255,255,0)',
            fillOpacity: 1
        }).addTo(map)
        .bindPopup("yes this is bike station");
    }

}



///////////////// SUBWAY DATA ////////////////////
// get subway station and draw
function getStationData(){
    // load data from json file 
    $.getJSON('subway.json', function(json){
        var stations = json;
        console.log(stations[0].lat);
        // draw stations on the map
        for ( var i =0; i < stations.length; i++){
            var stationCircle = L.circle([stations[i].lat,stations[i].lng], 50,{
            stroke: false,
            fillColor: 'rgb(255,0,0)',
            fillOpacity: 1
            }).addTo(map)
            .bindPopup("yes this is subway station");
        }
   });
 
}

//=========== when window is loaded
$(document).ready(function(){
    getBikeData();
    getStationData();

});
