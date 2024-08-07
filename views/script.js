// Marcadores
var leafIcon = L.Icon.extend({
    options: {
        iconSize: [10, 18],
        iconAnchor: [0, 18]
    }
})
var redMarker = new leafIcon({ iconUrl: "./images/marcadores/redMarker.png"})
    greenMarker = new leafIcon({ iconUrl: "./images/marcadores/greenMarker.png"})
    blueMarker = new leafIcon({ iconUrl: "./images/marcadores/blueMarker.png"})
// Inicializacion del mapa
const center = [23.511096, -102.416464]
const zoom = 5
var map = L.map('map').setView(center, zoom)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map)
// goHome
var addedMarkers = []
var addedCurve
map.on("click", function(){
    map.setView(center, zoom)
})
// Peninsula
var cancunMarker = L.marker(peninsulaTour.cancun.xy, { icon: blueMarker}).addTo(map)
    .bindPopup("Cancun tour")
var campecheMarker = L.marker(peninsulaTour.Campeche.xy, { icon: greenMarker })
var meridaMarker = L.marker(peninsulaTour.Merida.xy, { icon: blueMarker })
var uxmalMarker = L.marker(peninsulaTour.Uxmal.xy, { icon: blueMarker })
var chichenItzaMarker = L.marker(peninsulaTour.chichenItza.xy, { icon: blueMarker })
var playaCarmenMarker = L.marker (peninsulaTour.playaCarmen.xy, { icon: blueMarker })
var palenqueMarker = L.marker(peninsulaTour.palenque.xy, { icon: redMarker })
var penisulaCenterMarker = L.marker([19.453290, -89.210680])
var peninsulaCurve = L.curve(
    [
        // Campeche
        'M', peninsulaTour.Campeche.xy,
        // Merida
        'C', [20.5, -90.3], [21.3, -90], peninsulaTour.Merida.xy,
        // Uxmal
        'C', [20.7, -89.5], [20.5, -89.6], peninsulaTour.Uxmal.xy,
        // Chichen Itza
        'C', [19.8, -90.1], [20.1, -88.7], peninsulaTour.chichenItza.xy,
        // Cancun
        'C', [21.3, -88.3], [21.5, -87], peninsulaTour.cancun.xy,
        // Playa del Carmen
        'C', [21.1, -86.7], [20.8, -86.8], peninsulaTour.playaCarmen.xy,
        // Palenque
        'C', [19.7, -88], [17.8, -90], peninsulaTour.palenque.xy   
    ],
    {
        color: "black",
        weight: 1,
        dashArray: "5, 5",
        opacity: 0.6
    }
)
// Cambia el itinerario
const updateItinerario = (nuevoItinerario) => {
    const list = document.getElementById("itinerario")
    if(list){
        list.innerHTML = ""
        nuevoItinerario.forEach(item => {
            const li = document.createElement("li")
            li.textContent = item
            list.appendChild(li)
        })
    }
}
const itinerario = ["viajar", "comer", "nadar"]
// Mostrar tour Peninsula

// Muestra marcadores y Ploigono
cancunMarker.on("click", function(e){
    cancunMarker.setIcon(blueMarker)
    map.setView(penisulaCenterMarker.getLatLng(), 6.5)
    chichenItzaMarker.addTo(map)
    campecheMarker.addTo(map)
    meridaMarker.addTo(map)
    uxmalMarker.addTo(map)
    playaCarmenMarker.addTo(map)
    palenqueMarker.addTo(map)
    peninsulaCurve.addTo(map)
    addedMarkers = [chitzaMarker, campecheMarker, meridaMarker, uxmalMarker, playaCarmenMarker, palenqueMarker]
    addedCurve = peninsulaCurve
    // Al dar click fuera de los marcadores, salimos del tour
    let tourName = document.getElementById("tourName")
    if(tourName){
        tourName.textContent = "Cancun"
    }
    // Añade un resumen del itinerario
    updateItinerario(itinerario)
    // Esto evita que al darle click en el marcador se ejecute goHome
    e.originalEvent.stopPropagation();
})
// Al dar click fuera de los marcadores, salimos del tour
map.on("click", function(){
    addedMarkers.forEach(marker => map.removeLayer(marker))
    if(addedCurve){
        map.removeLayer(addedCurve)
    }
    map.setView(center, zoom)
    let tourName = document.getElementById("tourName")
    if(tourName){
        tourName.textContent = "Tours"
    }
    const tours = ["Cancun", "Tlaxcala", "Queretaro", "Michoacan", "Chiapas",]
    let list = document.getElementById("itinerario")
    if(list){
        list.innerHTML = ""
        tours.forEach(item => {
            const li = document.createElement("li")
            li.textContent = item
            list.appendChild(li)
        })
    }
})