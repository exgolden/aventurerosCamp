// Imports
import { cancunObject } from "./utils/cancun/cancunObject.js"
import { redMarker, greenMarker, blueMarker, violetMarker, updateText, showPrices, showTours, showItinerary, tourList, itineraryOldHTML, bindMarkerEvents } from "./utils/scripts.js"
// -------------------------------------------------- Mapa ---------------------------------------------------------
const center = [23.51, -102.41]
const zoom = 4.5
let addedMarkers = []
let addedCurve
const map = L.map('map').setView(center, zoom)
map.dragging.disable()
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map)
// -------------------------------------------------- Cancun Tour --------------------------------------------------
const cancunMarkersData = [
    { marker: L.marker(cancunObject.cancunTour.xy, {icon: violetMarker}), popup: cancunObject.cancunTour.popUp, description: cancunObject.cancunTour.description },
    { marker: L.marker(cancunObject.cancun.xy, {icon: blueMarker}), popup: cancunObject.cancun.popUp, description: cancunObject.cancun.description },
    { marker: L.marker(cancunObject.campeche.xy, {icon: greenMarker}), popup: cancunObject.campeche.popUp, description: cancunObject.campeche.description },
    { marker: L.marker(cancunObject.merida.xy, {icon: blueMarker}), popup: cancunObject.merida.popUp, description: cancunObject.merida.description },
    { marker: L.marker(cancunObject.uxmal.xy, {icon: blueMarker}), popup: cancunObject.uxmal.popUp, description: cancunObject.uxmal.description },
    { marker: L.marker(cancunObject.chichenItza.xy, {icon: blueMarker}), popup: cancunObject.chichenItza.popUp, description: cancunObject.chichenItza.description },
    { marker: L.marker(cancunObject.playaCarmen.xy, {icon: blueMarker}), popup: cancunObject.playaCarmen.popUp, description: cancunObject.playaCarmen.description },
    { marker: L.marker(cancunObject.palenque.xy, {icon: redMarker}), popup: cancunObject.palenque.popUp, description: cancunObject.palenque.description }
]
// Bind events to markers
cancunMarkersData.forEach(data => {
    bindMarkerEvents(data.marker, data.popup, data.description)
})
// Cancun tour marker
const cancunTourMarker = cancunMarkersData[0].marker
cancunTourMarker.addTo(map)
cancunTourMarker.on("click", function(e) {
    cancunTourMarker.remove()
    map.setView(cancunObject.center, cancunObject.zoom)
    addedMarkers = cancunMarkersData.slice(1).map(data => {
        data.marker.addTo(map)
        return data.marker
    })
    addedCurve = L.curve(
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
    ).addTo(map)
// Updates tour name
    updateText("tourName", cancunObject.nombre)
    updateText("resumenTitle", "")
// Updates cancun resumee
    updateText("resumen", cancunObject.resumen)
    showPrices("list", cancunObject.precios)
    e.originalEvent.stopPropagation()
})
// Hide Tour
map.on("click", function() {
    cancunTourMarker.addTo(map)
    addedMarkers.forEach(marker => map.removeLayer(marker))
    if (addedCurve) {
        map.removeLayer(addedCurve)
    }
    updateText("tourName", "Tours")
    updateText("resumenTitle", "Conoce nuestros tours")
    updateText("resumen", "")
    showItinerary("infoContainer", itineraryOldHTML)
    showTours("list", tourList)
    map.setView(center, zoom)
})