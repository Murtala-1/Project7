import React from 'react';
import { Row, Col, Card } from 'reactstrap';
import { GiPositionMarker } from 'react-icons/gi';
import { MdStar } from 'react-icons/md';
import { MdModeComment } from 'react-icons/md';
function RestaurantList(props) {
  const styles = {
    width: 100,
    height: 100,
  };

  return (
    <div className='m-0'>
      <Card style={{ width: 500, height: 'auto' }} >
        <Row>
          <Col sm={3}>
            <img
              className="rounded-circle"
              style={styles}
              src={props.picture}
              alt="retaurant-pictures"
            />
          </Col>
          <Col sm={9}>
            <h6>{props.restaurantName}</h6>
            <span>
              <GiPositionMarker /> {props.address}
            </span>
            <br></br>
            <Row>
              <span>
                <MdModeComment style={{ marginLeft: 18 }} /> {props.comment}
              </span>
              <hr className="m-1 p-0"></hr>
              <h6><MdStar /> {props.rating}</h6>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default RestaurantList;
