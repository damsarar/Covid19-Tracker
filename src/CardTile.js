import React from 'react'
import Card from 'react-bootstrap/Card'
// import Icon from '@material-ui/icons/Star';

class CardTile extends React.Component {
    render() {
        return (
            <div>
                <Card text="white" style={{ minWidth: '15rem', backgroundColor: this.props.color }}>
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text style={{ fontSize: "48px" }}>
                            {/* <Icon>Star</Icon> */}

                            {this.props.value}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        )
    }
}

export default CardTile