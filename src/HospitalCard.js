import React from "react";
import { Card } from "react-bootstrap";

class HospitalCard extends React.Component {
  render() {
    return (
      <div>
        <Card border="secondary" text="dark">
          <Card.Body>
            <Card.Title>{this.props.name}</Card.Title>
            <Card.Text>
              <h6>Currently on treatment</h6>{" "}
              <h3>{this.props.totalTreatment}</h3>
              Locals - {this.props.localTreatment}
              <br></br>
              Foreigners - {this.props.foreignTreatment}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default HospitalCard;
