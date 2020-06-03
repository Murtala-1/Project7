import React from 'react';
import ReactMapboxGl, {
  Layer,
  Popup,
  Marker,
  ZoomControl,
  RotationControl,
} from 'react-mapbox-gl';
import { MdStar } from 'react-icons/md';
import Data from './Data';
import mapboxgl from 'mapbox-gl';


const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYWtpbnllbWkxNDcyIiwiYSI6ImNrMXoyNW92dDBsZ2UzaG12Mm9xNGhmdGcifQ.RlIm2uIf_39XH1hbaG4C7A',
});

class MapGL extends React.Component {
  state = {
    lng: 8.5601,
    lat: 11.991,
    zoom: 13,
    loading: true,
    restuarant: [],
    userLocation: {},
    data: Data,
    popupInfo: false

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

  renderPopup = (index) => {
    {this.state.data.map(item => (
      this.state.popupInfo && (
      <Popup
      anchor="bottom-right"
      className="hide"
        coordinates={[item[index].lng, item[index].lat]}
        offset={{
          'bottom-left': [12, -38],
          bottom: [0, -38],
          'bottom-right': [-12, -38],
        }}
        onMouseLeave={() => this.setState({popupInfo: false})}
        closeOnClick={true}
       
        >
          
        <div onClick={this._onClosePopup}>
          <img src={item.picURL} width="180" />
          <h4>{item.restaurantName} </h4>
          <p> {item.address}</p>
          <form onClick={this.handInputSubmit}>
            <input
              class="form-control"
              type="text"
              placeholder="Add your review"
            />
          </form>
          {item.ratings.map(e => (
            <li>
              {e.comment} <MdStar />
              {e.stars}
            </li>
          ))}
        </div>
      
      </Popup>
      )
    ))}
  }

  handInputSubmit = (e) => {
    e.preventDefault()
    console.log("Hello World")
  }
  render() {
    return (
      <Map
      
          onStyleLoad={this.onMapLoad}
        center={[this.state.lng, this.state.lat]}
        zoom={[this.state.zoom]}
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '140vh',
          width: '64vw',
        }}>
        <ZoomControl />
        <RotationControl />
        <div className="sidebarStyle">
          <div>
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{' '}
            {this.state.zoom}
          </div>
        </div>
        <Layer
          type="symbol"
          id="marker"
          layout={{ 'icon-image': 'marker-15' }}></Layer>

        

        {this.state.data.map(item => (
          <Marker coordinates={[item.lng, item.lat]}  anchor="bottom" >
            <img src={require('../marker.png')} 
          onMouseEnter={()=>this.setState({popupInfo: true})}
          onMouseLeave={()=>this.setState({popupInfo: false})} 
         />
          </Marker>
        ))}
      </Map>
    );
  }
}

export default MapGL;
