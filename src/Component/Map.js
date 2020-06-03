import React from 'react';
import mapboxgl from 'mapbox-gl';
import Data from './Data';

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWtpbnllbWkxNDcyIiwiYSI6ImNrMXoyNW92dDBsZ2UzaG12Mm9xNGhmdGcifQ.RlIm2uIf_39XH1hbaG4C7A';
class MapContainer extends React.Component {
  state = {
    lng: 8.5601,
    lat: 11.991,
    zoom: 13,
    loading: true,
    restuarant: [],
    userLocation: {},
    data: Data,
    review: [],
  };

  set = e => {
    this.setState(prev => ({
      data: [
        ...prev.data,
        {
          restaurantName: '',
          address: '',
          lat: e.lngLat.wrap().lat,
          lng: e.lngLat.wrap().lng,
          picURL: '',
          ratings: [],
        },
      ],
    }));
  };

  renderMap = () => {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    // map.on('click', 'addMarker',  () => {
    //   this.setState({
    //     lng: map.getCenter().lng.toFixed(4),
    //     lat: map.getCenter().lat.toFixed(4),
    //     zoom: map.getZoom().toFixed(2),
    //   });
    // });
    map.on('click', this.set);

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    this.state.data.map(item => {
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
              <form onsubmit="return submitForms(e)">
              <input class='form-control' type="text" placeholder="Add your review"  />
              </form>
             ${item.ratings.map(e => '<li>' + e.comment + '</li>')}
             <script> 
             function submitForms(e){
               e.preventDefault()
               console.log(e.target.value)
             } </script>
            </div>`
            )
        )
        .addTo(map);
    });
  };
  submitForm = event => {
    event.preventDefault()
    console.log('heloooooooo');
  };

  componentDidMount() {
    this.renderMap();
  }

  componentDidUpdate() {
    this.renderMap();
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

        <div ref={el => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default MapContainer;
