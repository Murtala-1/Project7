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
import MapContainer from './Map';
import RestaurantList from './RestaurantList';
import { FaSearchLocation } from 'react-icons/fa';
import Data from './Data';

import { Route, Switch, BrowserRouter } from 'react-router-dom'

class LandingPage extends React.Component {
  state = {
    address: '',
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

  render() {
    const dataComponent = [];
    Data.forEach((item) => {
      if (
        item.address.toLowerCase().indexOf(this.state.address.toLowerCase()) ===
        -1
      )
        return;
      dataComponent.push(
        <RestaurantList
          key={item.id}
          restaurantName={item.restaurantName}
          address={item.address}
          picture={item.picURL}
          comment={item.ratings[1].comment}
          rating={item.ratings[1].stars}
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
            {' '}
            <CardHeader>
              Enter your address to find local restaurants around you{' '}
            </CardHeader>
          </center>
          <CardBody>
            <Row>
              <Col sm={9}>
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
                  Search{' '}
                  <FaSearchLocation size={15} style={{ marginRight: 5 }} />{' '}
                </Button>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>Log in for your recent addresses.</CardFooter>
        </Card>

        <Row>
          <Col md={3} className="mt-5 ml-4">
            {dataComponent}
          </Col>
          <Col md={8} className='' style={{ marginTop: 115, marginLeft: '70px' }}>
            <Card>
              <MapContainer />
            </Card>{' '}
          </Col>
        </Row>
      </div>
    );
  }
}

export default LandingPage;
