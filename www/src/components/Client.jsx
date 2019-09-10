import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import socketIOClient from 'socket.io-client';

class Client extends React.Component {
    constructor (){
        super();
        this.state = {
            src:null
        }
    }
    componentDidMount() {
        const socket = socketIOClient();
        socket.on('stream', stream =>{
            this.setState({src:stream});
        })
    }
    render() {
        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={10} sm={10} xs={10} md={10}>
                        <img src={this.src}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Client;