// Marcadores
var standardIcon = L.Icon.extend({
    options: {
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }
})
var redMarker = new standardIcon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'})
var greenMarker = new standardIcon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'})
var blueMarker = new standardIcon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png'})
var violetMarker = new standardIcon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png'})
/**
 * Updates the text content of an HTML element with a given ID.
 * @param {string} identificator - The ID of the HTML element to update.
 * @param {string} newText - The new text to set as the content.
 */
const updateText = (identificator, newText)=>{
    let oldText = document.getElementById(identificator)
    if(oldText){
        oldText.textContent = newText
    }
}
/**
 * Shows the prices for a given tour.
 * @param {string} identificator - The ID of the HTML element to update.
 * @param {Object} precios - Prices list
 */
const showPrices = (identificator, prices)=>{
    let container = document.getElementById(identificator)
    if(container){
        container.innerHTML = ""
        let ul = document.createElement("ul")
        for(let [key,value] of Object.entries(prices)){
            let li = document.createElement("li")
            li.textContent = `${key}: ${value}`
            ul.appendChild(li)
        }
        container.appendChild(ul)
    }
}
const tourList = ["Cancun", "Chiapas", "Chela Tour", "Oaxaca"]
/**
 * Shows the prices for a given tour.
 * @param {string} identificator - The ID of the HTML element to update.
 * @param {string[]} tours - Tours list
 */
const showTours = (identificator, tours) => {
    let container = document.getElementById(identificator)
    if(container){
        container.innerHTML = ""
        tours.forEach(tour => {
            const li = document.createElement("li")
            li.textContent = tour
            container.appendChild(li)
        })
    }
}
const itineraryOldHTML = '<h3 id="resumenTitle">Conoce nuestros tours</h3><p id="resumen"></p><ul id="list"><li>Cancun</li><li>Tlaxcala</li><li>Queretaro</li><li>Michoacan</li><li>Chiapas</li></ul>'
/**
 * Shows the itinerary for the day
 * @param {string} identificator - The ID of the HTML element to update.
 * @param {string} itinerary - Brief description of the day.
 */
const showItinerary = (identificator, itinerary) => {
    let container = document.getElementById(identificator)
    if(container){
        container.innerHTML = itinerary
    }
}
/**
 *  Binds properties to markers
 * @param {object} marker - Marker to bind.
 * @param {string} popupText - Text for the popup
 * @param {string} description - Description for the day
 */
const bindMarkerEvents = (marker, popupText, description) => {
    marker.bindPopup(popupText)
    marker.on("mouseover", function(){
        this.openPopup()
    })
    marker.on("mouseout", function(){
        this.closePopup()
    })
    marker.on("click", function(e){
        showItinerary("infoContainer", description)
        e.originalEvent.stopPropagation()
    })
}


export { redMarker, greenMarker, blueMarker, violetMarker, updateText, showPrices, showTours,showItinerary, tourList, itineraryOldHTML, bindMarkerEvents }