import React from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWtpbnllbWkxNDcyIiwiYSI6ImNrMXoyNW92dDBsZ2UzaG12Mm9xNGhmdGcifQ.RlIm2uIf_39XH1hbaG4C7A';
class MapContainer extends React.Component {
  state = {
    lng: 5,
    lat: 34,
    zoom: 2,
    loading: true,
    restuarant: [],
    userLocation:{} ,
  };

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    map.on('move', () => {
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
      enableHighAccuracy: true
      },
      trackUserLocation: true
      })
      );
      var marker = new mapboxgl.Marker({
        draggable: true
        })
        .setLngLat([0, 0])
        .addTo(map);
         
        function onDragEnd() {
        var lngLat = marker.getLngLat();
        }
         
        marker.on('dragend', onDragEnd);
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
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default MapContainer;
