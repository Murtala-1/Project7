import React from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Data from './Data';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWtpbnllbWkxNDcyIiwiYSI6ImNrMXoyNW92dDBsZ2UzaG12Mm9xNGhmdGcifQ.RlIm2uIf_39XH1hbaG4C7A';
class MapContainer extends React.Component {
  state = {
    lng: 8.5601,
    lat: 11.9910,
    zoom: 13,
    loading: true,
    restuarant: [],
    userLocation: {},
  };
  handleClick = (map, ev) => {
    const zoom = [map.transform.tileZoom + map.transform.zoomFraction];
    this.setState({
      zoom: map.getCenter()
    });
  };

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    map.on('click', 'addMarker',  () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
    );

    Data.map((item) => {
      var el = document.createElement('div');
      el.className = 'marker';
      new mapboxgl.Marker(el)
        .setLngLat([item.lng, item.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<div>
              <img src=${item.picURL} width='180' />
                <h4>${item.restaurantName} </h4>
                <p> ${item.address}</p>
            ${item.ratings.map(e => "<p>" + e.comment + "</p>")}
              </div>`
            ),
        )
        .addTo(map);
    });
  }

  render() {
    return (
      <div>
        <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{' '}
            {this.state.zoom}
          </div>
        </div>

        <div ref={(el) => (this.mapContainer = el)} onClick={this.handleClick} className="mapContainer" />
      </div>
    );
  }
}

export default MapContainer;
