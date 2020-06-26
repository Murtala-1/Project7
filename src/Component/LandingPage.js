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

class LandingPage extends React.Component {
  state = {
    address: '',
    data: [],
    restaurant : '',
    modals: false,
  };
  handleSummit = (e) => {
    this.setState({
      address: e.address,
      
    });
  };
  updateAddress = (address) => {
    this.setState(() => ({
      address: address.trim()
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
    
  componentDidMount() {
    fetch("https://tripadvisor1.p.rapidapi.com/restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=30&currency=USD&lang=en_US&location_id=293919", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
		"x-rapidapi-key": "c25632a82cmshe1eea9b7f4ebb7ep15df2ejsn56f040c948d9"
	}
})
.then(raw => raw.json())
.then(response => this.setState({data:response.data}))
.catch(err => {
	console.log(err);
});
  }

  render() {
    const dataComponent = [];
    this.state.data.forEach((item) => {
      if (
        item.address && item.address.toLowerCase().indexOf(this.state.address.toLowerCase()) ===
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
      );
    });

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
                    type="text"
                    name="address"
                    id="exampleAddress"
                    placeholder="Enter your Address"
                    value={this.state.address}
                    onChange={(e) => this.updateAddress(e.target.value)}
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
          <div className="mt-2 m-0">
            {dataComponent}
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
