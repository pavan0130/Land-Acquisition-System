import './style.css';

import Map from 'ol/Map.js';
import View from 'ol/View.js';

import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import OSM from 'ol/source/OSM.js';

import Overlay from 'ol/Overlay.js';

import { fromLonLat } from 'ol/proj.js';


// -----------------------------------
// OpenStreetMap Base Layer
// -----------------------------------

const osmLayer = new TileLayer({
    source: new OSM()
});


// -----------------------------------
// GeoServer Land Parcel Layer
// -----------------------------------

const landParcelSource = new TileWMS({
    url: 'http://localhost:8080/geoserver/urban_land/wms',

    params: {
        'LAYERS': 'urban_land:land_parcels',
        'TILED': true
    },

    serverType: 'geoserver'
});


const landParcelLayer = new TileLayer({
    source: landParcelSource
});


// -----------------------------------
// Create Popup
// -----------------------------------

const popupElement = document.getElementById('popup');

const popupOverlay = new Overlay({
    element: popupElement,
    autoPan: {
        animation: {
            duration: 250
        }
    }
});


// -----------------------------------
// Create Map
// -----------------------------------

const map = new Map({
    target: 'map',

    layers: [
        osmLayer,
        landParcelLayer
    ],

    overlays: [
        popupOverlay
    ],

    view: new View({
        center: fromLonLat([76.959, 10.923]),
        zoom: 15
    })
});


// -----------------------------------
// Click Parcel
// -----------------------------------

map.on('singleclick', function (event) {

    const viewResolution = map.getView().getResolution();

    const viewProjection = map.getView().getProjection();


    // Generate GeoServer GetFeatureInfo URL

    const url = landParcelSource.getFeatureInfoUrl(
        event.coordinate,
        viewResolution,
        viewProjection,
        {
            'INFO_FORMAT': 'application/json',
            'FEATURE_COUNT': 10,
            'BUFFER': 5
        }
    );


    if (!url) {
        return;
    }


    // Show loading message

    popupElement.innerHTML = `
        <div class="popup-content">
            <strong>Loading...</strong>
        </div>
    `;

    popupOverlay.setPosition(event.coordinate);


    // Request information from GeoServer

    fetch(url)
        .then(response => {

            if (!response.ok) {
                throw new Error('GeoServer request failed');
            }

            return response.json();
        })

        .then(data => {

            console.log('GeoServer response:', data);


            // No parcel found

            if (!data.features || data.features.length === 0) {

                popupElement.innerHTML = `
                    <div class="popup-content">
                        <strong>No parcel found</strong>
                    </div>
                `;

                return;
            }


            // Get first parcel

            const properties = data.features[0].properties;


            // Display parcel information

            popupElement.innerHTML = `
                <div class="popup-content">

                    <button id="popup-close" class="popup-close">
                        ×
                    </button>

                    <h3>Land Parcel</h3>

                    <hr>

                    <p>
                        <strong>Parcel ID:</strong>
                        ${properties.parcel_id ?? '-'}
                    </p>

                    <p>
                        <strong>Project:</strong>
                        ${properties.project_name ?? '-'}
                    </p>

                    <p>
                        <strong>State:</strong>
                        ${properties.state ?? '-'}
                    </p>

                    <p>
                        <strong>District:</strong>
                        ${properties.district ?? '-'}
                    </p>

                    <p>
                        <strong>Village:</strong>
                        ${properties.village ?? '-'}
                    </p>

                    <p>
                        <strong>Area:</strong>
                        ${properties.area_hectares ?? '-'} ha
                    </p>

                    <p>
                        <strong>Acquisition Status:</strong>
                        ${properties.acquisition_status ?? '-'}
                    </p>

                    <p>
                        <strong>Compensation:</strong>
                        ₹${properties.compensation ?? '0'}
                    </p>

                    <p>
                        <strong>Possession:</strong>
                        ${properties.possession_status ?? '-'}
                    </p>

                </div>
            `;


            // Close popup

            document
                .getElementById('popup-close')
                .addEventListener('click', function () {

                    popupOverlay.setPosition(undefined);

                });

        })

        .catch(error => {

            console.error('GetFeatureInfo error:', error);

            popupElement.innerHTML = `
                <div class="popup-content">

                    <strong>Error loading parcel</strong>

                    <p>
                        Check GeoServer and browser console.
                    </p>

                </div>
            `;

        });

});