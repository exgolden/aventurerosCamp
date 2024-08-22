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
// HTML Snippets
const rightPanelOldHTML = `
<h3>Conoce nuestros tours</h3>
<ul id="list">
    <li>Cancun, Sureste Mexicano.</li>
    <li>Val'Quirico y Tlaxcala.</li>
    <li>Chelatour, Queretaro.</li>
    <li>Sierra Gorda y Pinal de los Amoles, Queretaro.</li>
    <li>El Oro y Tlalpujahua, Michoacan.</li>
    <li>10 Cascadas Honey y Pahuatlan, Puebla.</li>
    <li>Dia de Muertos, Michoacan.</li>
    <li>Chiapas, La Ultima Frontera.</li>
</ul>
`

/**
 * Replace HTML
 * @param {string} indetificator - The ID of the HTML element to update
 * @param {string} newHTML - New HTML element to show
 */
const updateHTML = (indentificator, newHTML) => {
    let container = document.getElementById(indentificator)
    if(container){
        container.innerHTML = newHTML
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
        updateHTML("infoContainer", description)
        e.originalEvent.stopPropagation()
    })
}
export { redMarker, greenMarker, blueMarker, violetMarker, showPrices, bindMarkerEvents, updateHTML, rightPanelOldHTML }