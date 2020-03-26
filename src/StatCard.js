import React from 'react'
import Card from 'react-bootstrap/Card'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import AIcon from '@material-ui/icons/AccessAlarm';

class CardTile extends React.Component {
    render() {
        return (
            <div>
                <Card text="white" style={{ backgroundColor: this.props.color }}>
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text style={{ fontSize: "48px" }}>

                            {this.props.value}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        )
    }
}

export default CardTile