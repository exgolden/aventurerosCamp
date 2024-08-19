// Imports
import { cancunObject } from "./utils/cancun/cancunObject.js"
import { redMarker, greenMarker, blueMarker, violetMarker, updateText, showPrices, showTours, showItinerary, tourList, itineraryOldHTML } from "./utils/scripts.js"
// -------------------------------------------------- Mapa ---------------------------------------------------------
const center = [23.51, -102.41]
const zoom = 4.5
var addedMarkers = []
var addedCurve
var map = L.map('map').setView(center, zoom)
map.dragging.disable();
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map)

// -------------------------------------------------- Cancun Tour --------------------------------------------------
var cancunTourMarker = L.marker(cancunObject.cancunTour.xy, {icon: violetMarker}).addTo(map)
var cancunMarker = L.marker(cancunObject.cancun.xy, {icon: blueMarker})
var campecheMarker = L.marker(cancunObject.campeche.xy, {icon: greenMarker})
var meridaMarker = L.marker(cancunObject.merida.xy, {icon: blueMarker})
var uxmalMarker = L.marker(cancunObject.uxmal.xy, {icon: blueMarker})
var chichenItzaMarker = L.marker(cancunObject.chichenItza.xy, {icon: blueMarker})
var playaCarmenMarker = L.marker(cancunObject.playaCarmen.xy, {icon: blueMarker})
var palenqueMarker = L.marker(cancunObject.palenque.xy, {icon: redMarker})
var cancunCurve = L.curve(
    [
        "M", cancunObject.campeche.xy,
        "C", cancunObject.merida.bz[0], cancunObject.merida.bz[1], cancunObject.merida.xy,
        "C", cancunObject.uxmal.bz[0], cancunObject.uxmal.bz[1], cancunObject.uxmal.xy,
        "C", cancunObject.chichenItza.bz[0], cancunObject.chichenItza.bz[1], cancunObject.chichenItza.xy,
        "C", cancunObject.cancun.bz[0], cancunObject.cancun.bz[1], cancunObject.cancun.xy,
        "C", cancunObject.playaCarmen.bz[0], cancunObject.playaCarmen.bz[1], cancunObject.playaCarmen.xy,
        "C", cancunObject.palenque.bz[0], cancunObject.palenque.bz[1], cancunObject.palenque.xy
    ],
    {
        color: "black",
        weight: 1,
        dashArray: "5, 5",
        opacity: 0.6
    }
)
// Mostrar tour
cancunTourMarker.on("click", function(e){
    cancunTourMarker.remove()
    map.setView(cancunObject.center, cancunObject.zoom)
    campecheMarker.addTo(map)
    meridaMarker.addTo(map)
    uxmalMarker.addTo(map)
    chichenItzaMarker.addTo(map)
    cancunMarker.addTo(map)
    playaCarmenMarker.addTo(map)
    palenqueMarker.addTo(map)
    cancunCurve.addTo(map)
    // Global scope
    addedMarkers = [campecheMarker, meridaMarker, uxmalMarker, chichenItzaMarker, cancunMarker, playaCarmenMarker, palenqueMarker]
    addedCurve = cancunCurve
    // Muestra el nombre del tour
    updateText("tourName", cancunObject.nombre)
    // Muestra el resumen del tour
    updateText("resumenTitle", "")
    updateText("resumen", cancunObject.resumen)
    // Muestra precios
    showPrices("list", cancunObject.precios)
    e.originalEvent.stopPropagation()
})
// Mostrar tour Cancun
cancunTourMarker.bindPopup(cancunObject.cancunTour.popUp)
cancunTourMarker.on("mouseover", function(e){
    cancunTourMarker.openPopup()
})
// Mostrar Campeche
campecheMarker.bindPopup(cancunObject.campeche.popUp)
campecheMarker.on("mouseover", function(e){
    campecheMarker.openPopup()
})
campecheMarker.on("click", function(e){
    showItinerary("infoContainer", cancunObject.campeche.description)
    e.originalEvent.stopPropagation()
})
// Mostrar Merida
meridaMarker.bindPopup(cancunObject.merida.popUp)
meridaMarker.on("mouseover", function(e){
    meridaMarker.openPopup()
})
meridaMarker.on("click", function(e){
    showItinerary("infoContainer", cancunObject.merida.description)
    e.originalEvent.stopPropagation()
})
// Mostrar Uxmal
uxmalMarker.bindPopup(cancunObject.uxmal.popUp)
uxmalMarker.on("mouseover", function(e){
    uxmalMarker.openPopup()
})
uxmalMarker.on("click", function(e){
    showItinerary("infoContainer", cancunObject.uxmal.description)
    e.originalEvent.stopPropagation()
})
// Mostrar Chichen Itza
chichenItzaMarker.bindPopup(cancunObject.chichenItza.popUp)
chichenItzaMarker.on("mouseover", function(e){
    chichenItzaMarker.openPopup()
})
chichenItzaMarker.on("click", function(e){
    showItinerary("infoContainer", cancunObject.chichenItza.description)
    e.originalEvent.stopPropagation()
})
// Mostrar Playa del Carmen
playaCarmenMarker.bindPopup(cancunObject.playaCarmen.popUp)
playaCarmenMarker.on("mouseover", function(e){
    playaCarmenMarker.openPopup()
})
playaCarmenMarker.on("click", function(e){
    showItinerary("infoContainer", cancunObject.playaCarmen.description)
    e.originalEvent.stopPropagation()
})
// Mostrar Cancun
cancunMarker.bindPopup(cancunObject.cancun.popUp)
cancunMarker.on("mouseover", function(e){
    cancunMarker.openPopup()
})
cancunMarker.on("click", function(e){
    showItinerary("infoContainer", cancunObject.cancun.description)
    e.originalEvent.stopPropagation()
})
// Mostrar Palenque
palenqueMarker.bindPopup(cancunObject.palenque.popUp)
palenqueMarker.on("mouseover", function(e){
    palenqueMarker.openPopup()
})
palenqueMarker.on("click", function(e){
    showItinerary("infoContainer", cancunObject.palenque.description)
    e.originalEvent.stopPropagation()
})
// Oculta tour
map.on("click", function(e){
    cancunTourMarker.addTo(map)
    addedMarkers.forEach(marker => {
        map.removeLayer(marker)
    })
    if(addedCurve){
        map.removeLayer(addedCurve)
    }
    // Reestablecemos el lado izquierdo
    updateText("tourName", "Tours")
    updateText("resumenTitle", "Conoce nuestros tours")
    updateText("resumen", "")
    showItinerary("infoContainer", itineraryOldHTML)
    showTours("list", tourList)
    map.setView(center, zoom)
})
// Oculta tour Cancun
cancunTourMarker.on("mouseout", function(e){
    cancunTourMarker.closePopup()
})
// Oculta Campeche
campecheMarker.on("mouseout", function(e){
    campecheMarker.closePopup()
})
// Oculta Merida
meridaMarker.on("mouseout", function(e){
    meridaMarker.closePopup()
})
// Oculta Uxmal
uxmalMarker.on("mouseout", function(e){
    uxmalMarker.closePopup()
})
// Oculta Chichen Itza
chichenItzaMarker.on("mouseout", function(e){
    chichenItzaMarker.closePopup()
})
// Oculta Playa del Carmen
playaCarmenMarker.on("mouseout", function(e){
    playaCarmenMarker.closePopup()
})
// Oculta Cancun
cancunMarker.on("mouseout", function(e){
    cancunMarker.closePopup()
})
// Oculta Palenque
palenqueMarker.on("mouseout", function(e){
    palenqueMarker.closePopup()
})