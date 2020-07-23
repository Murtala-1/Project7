import React from 'react';
import ReactMapboxGl, {
  Layer, Feature,Marker,
  Popup,
  ZoomControl,
  RotationControl,
} from 'react-mapbox-gl';
import { MdStar } from 'react-icons/md';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, FormGroup, Input  } from 'reactstrap';



const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYWtpbnllbWkxNDcyIiwiYSI6ImNrMXoyNW92dDBsZ2UzaG12Mm9xNGhmdGcifQ.RlIm2uIf_39XH1hbaG4C7A',
});
const StyledPopup = {
  background: "white",
  color: "#3f618c",
  fontSize: 10 ,
  fontWeight: 400,
  padding: "5px",
  borderRadius: "2px",
  width: '25em'

}


class MapGL extends React.Component {
  state = {
    width: "100vw",
    height: "100vh",
    longitude: 100.869281,
    latitude: 12.906024,
    loading: true,
    restaurant: undefined,
    fitBounds: undefined,
    center: [],
    modals: false,
    toggle: false,
    addReview: '',
    addRatings: '',
    newRestuarantName: '',
    newRestuarantAddress: '', 
    newRestuarant: {},
    userLocation: {
      longitude: 0,
    latitude: 0,
    }

  };

handleOnChange = (e) => {
  const {name, value} = e.target
  this.setState( prev => ({
    newRestuarant: {
      ...prev.newRestuarant,
      [name] : value
    },
   
  }))
}
  handtoggle = () => {
    this.setState( prev => ({
      modals: !prev.modals,
    }))
  }
 
  onNameChange = event => {
    const {name, value} = event.target
    this.setState({
      [name] : value,
    });
  };

 
 markerClick = (restaurant) => {
   console.log(restaurant)
    this.setState({
      center:[this.state.longitude, this.state.latitude],
      restaurant,
      modals: false,
      toggle: false
      });
      
  };

 onStyleLoad = (map) => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  onDrag = () => {
    if (this.state.data) {
      this.setState({ data: undefined });
    }
  };

  _onClickMap = (_map, evt)=> {  
    this.setState({
      newRestuarant : {
        name: '',
        _address: '',
        latitude: evt.lngLat.wrap().lat,
        longitude: evt.lngLat.wrap().lng,
        photo: {
          images: {
            small: {
              url: ''
            }
          }
        },
        reviews: [],
      },
    })
   
    if(this.state.restaurant === undefined ){ 
      return this.handtoggle()
    }else{
      return null
    }
      }
  reviewsReset = () => {
    this.setState({
      addReview : '',
      addRatings : ''
    })
  }

  addItem = () => {
    const { addReview, restaurant, addRatings } = this.state;
    
    if (restaurant.reviews){
      let newb = restaurant.reviews.concat({
        rating: addRatings,
        title: addReview
    })
       this.setState(prev => ({
      restaurant: {
        ...prev.restaurant,
         reviews: newb
      }
    }));
    }else {
      let newb = {
        rating: addRatings,
        title: addReview
    }
       this.setState(prev => ({
      restaurant: {
        ...prev.restaurant,
         reviews: [newb]
      }
    }));
    }
    this.reviewsReset()
  };

  saveRestaurant = () => {
  this.props.saveRestuarant(this.state.newRestuarant)
  this.handtoggle()
}

handleUserLocation = (position)=>{
  // console.log('',position)
  this.setState({
    userLocation: {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
    }
  })
}
componentDidMount() {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    this.handleUserLocation(position)
  });
}
  render() {
    const image = new Image();
    image.src=`${require('../marker.png')}`
    const images= ['marker', image];
    const layoutLayer = { 'icon-image': 'marker' }
    const { modals, addReview,restaurant, userLocation, addRatings } = this.state;
    return (
      <Map
        onClick={this._onClickMap}
        onStyleLoad={this.onMapLoad}
        center={[this.state.longitude, this.state.latitude]}
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '140vh',
          width: '66vw',
        }}
        >
        <div className="sidebarStyle">
          <div>
            Longitude: {this.state.longitude} | Latitude: {this.state.latitude} | Zoom:
            {this.state.zoom}
          </div>
       {/* {JSON.stringify(userLocation)} */}
        </div>
         <Marker
         coordinates={[userLocation.longitude, userLocation.latitude]} anchor="bottom"
         center={[userLocation.longitude, userLocation.latitude]}
         >
         <image src={require('../marker2.png')} width="50px" alt="marker"/>
         </Marker>
        
      <Layer type="symbol" id="marker" layout={layoutLayer} images={images}>
          {this.props.data.map((item, index) =>
          <Feature key={item.id} coordinates={[item.longitude, item.latitude]} 
          // key={index}
          onClick={() => this.markerClick(item)}
          />
          )}
    </Layer>
          
      {restaurant &&(
          <Popup
            key={restaurant.id}
            anchor="bottom-right"
            coordinates={[restaurant.longitude, restaurant.latitude]}
            style={StyledPopup}
           >
              
            <div > 
            <button type="button" class="close" aria-label="Close" onClick={()=> this.setState({restaurant: undefined})}>
            <span aria-hidden="true">&times;</span>
          </button>
              <image src={restaurant.photo.images.small.url} width="193px" height="250" alt="res image"/>
              <h4>{restaurant.name} </h4>
              <p> {restaurant._address}</p>
              <div className="">
                <input
                  value={addReview} onChange={this.onNameChange}
                  className="form-control mb-1"
                  type="text"
                  name="addReview"
                  placeholder="Add your review"
                />
                <input
                value={addRatings} onChange={this.onNameChange}
                className="form-control mb-1"
                type="number"
                name="addRatings"
                placeholder="Add your rating"
              />
                <button className="btn btn-success btn-block" onClick={this.addItem}>Add</button>
              </div>
            {restaurant.reviews && restaurant.reviews.length ? restaurant.reviews.map(item => 
              <li key={item.id}>
                  {item.title} <MdStar />
                  {item.rating}
                </li>
            ): null}           
                
          
            </div>
          
          </Popup>
         
        )} 
      
        <Modal isOpen={modals} toggle={this.handtoggle} >
        <ModalHeader toggle={this.handtoggle}>Add Restuarant</ModalHeader>
        <ModalBody>
        <FormGroup row>
        <Col sm={10}>
          <Input type="name" 
            name="name"
            onChange={this.handleOnChange} 
            value={this.state.newRestuarant.name} 
            placeholder="Restuarant Name" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={10}>
          <Input type="_address" 
          name="_address" 
          onChange={this.handleOnChange} 
          value={this.state.newRestuarant._address}
          placeholder="Restuarant Address" />
        </Col>
      </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.saveRestaurant}>Save</Button>{' '}
          <Button color="secondary" onClick={this.handtoggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
        

        <ZoomControl />
        <RotationControl />
      </Map>
    );
  }
}

export default MapGL;
