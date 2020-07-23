import React from 'react';
import { Row, Card } from 'reactstrap';
import { GiPositionMarker } from 'react-icons/gi';
import { MdStar } from 'react-icons/md';
import { MdModeComment } from 'react-icons/md';


function RestaurantList(props) {
  const styles = {
    width: '200px',
    height: '100px'
  }
  return (
   
      <Card style={{ width: 500, height: 'auto' }} >
        <div className="justify-content-between d-flex">
          <div >
            <img
              className="rounded"
              style={styles}
              src={props.picture}
              alt="retaurant-pictures"
              width="193px" height="250"
            />
          </div>
          <div className="p-2">
            <h5>{props.name}</h5>
            <span>
              <GiPositionMarker /> {props.address}
            </span>
            {props.reviews && props.reviews.length ? props.reviews.map(item => 
            <Row>
                <span>
                <MdModeComment style={{ marginLeft: 18 }} /> {item.title}
              </span>
              <hr className="m-1 p-0"></hr>
              <h6><MdStar /> {item.rating}</h6>
            </Row>
           ) : null}
          </div>
        </div>
      </Card>
      
  );
}

export default RestaurantList;
