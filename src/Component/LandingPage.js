import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col,
} from 'reactstrap';
import NavBar from './NavBar';
import RestaurantList from './RestaurantList';
import { FaSearchLocation } from 'react-icons/fa';
import MapGL from './MapGL'
import FreeScrollBar from 'react-free-scrollbar';

class LandingPage extends React.Component {
  state = {
    rating: '',
    data: [],
    restaurant : '',
    modals: false,
  };
  handleSummit = (e) => {
    this.setState({
      rating: e.rating,
      
    });
  };
  updateRating = (rating) => {
    this.setState(() => ({
      rating: rating.trim()
    }));
  };
  saveRestuarant = (newRestuarant) => {
    this.setState(prev => ({
      data: [
        ...prev.data,
        newRestuarant
      ],
      modals : false
    }))
    }

    // _locateUser = () => {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.updateViewport({
    //       longitude: position.coords.longitude,
    //       latitude: position.coords.latitude
    //     });
    //   });
    // }
    
  componentDidMount() {
//     fetch("https://tripadvisor1.p.rapidapi.com/restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=30&currency=USD&lang=en_US&location_id=293919", {
//       "method": "GET",
//       "headers": {
//         "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
//         "x-rapidapi-key": "116c2bb966mshd64fa6a42cc8e5bp10a7fajsncf0effb5a79d"
//       }
//     })
// .then(raw => raw.json())
// .then(response => this.setState({data:response.data}))
// .catch(err => {
// 	console.log(err);
// });
// this._locateUser()
}


  render() {
    let dataComponent = [];
    this.state.data.forEach( item => {
      if (
        item.rating && item.rating.toLowerCase().indexOf(this.state.rating.toLowerCase()) ===
        -1
      )
        return;
      dataComponent.push(
        <RestaurantList
          key={item.id}
          name={item.name}
          address={item.address}
          picture={item.photo && item.photo.images.small.url}
          reviews={item.reviews}
        />,
      )
    })

    return (
      <div
        style={{
          backgroundImage: `url(${require('../img/backgroungImage.jpeg')})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '30em',
         
        }}
      >
        <NavBar />

        <Card className="w-50 ml-5 mt-5">
          <center>
            <CardHeader>
              Search for your address to find local restaurants around you.
            </CardHeader>
          </center>
          <CardBody>
            <Row>
              <Col sm={9}>
                {/* {JSON.stringify(this.state.data)} */}
                <FormGroup>
                  <Input
                    type="number"
                    name="rating"
                    placeholder="Search best rating of the restaurant around you"
                    value={this.state.rating}
                    onChange={(e) => this.updateRating(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col sm={3}>
                <Button color="danger" onClick={this.handleSummit}>
                  Search
                  <FaSearchLocation size={15} style={{ marginRight: 5 }} />
                </Button>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>Log in for your recent addresses.</CardFooter>
        </Card>

        <div className="justify-content-between d-flex">
          
        <div className="mt-3" style={{width: '33em', height: '68em'}}>
    <FreeScrollBar>
            {dataComponent}
            </FreeScrollBar>
      </div>  
          <div className='mt-5' >
            <Card>
              <MapGL 
             data={this.state.data}
             saveRestuarant={this.saveRestuarant}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
