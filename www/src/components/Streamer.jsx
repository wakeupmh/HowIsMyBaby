import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import socketIOClient from 'socket.io-client';

class Client extends React.Component {
    videoRef = React.createRef();

    componentDidMount() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true, audio:true}).then((stream) => this.videoRef.current.srcObject = stream);
            const getFrame = () => {
                const canvas = document.createElement('canvas');
                canvas.width = this.videoRef.videoWidth;
                canvas.height = this.videoRef.videoHeight;
                canvas.onload = function() {
                    canvas.getContext('2d').drawImage(this.videoRef, 0, 0);
                }
                
                const data = canvas.toDataURL('image/webp');
                return data;
            }
            const socket = socketIOClient();
            setInterval(()=>{
                socket.emit("stream", getFrame());
            });
        }
    }
    render() {
        return(
            <Container>
                <Row className="justify-content-md-center">
                    <Col lg={10} sm={10} xs={10} md={10}>
                        <video autoPlay ref={this.videoRef}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Client;