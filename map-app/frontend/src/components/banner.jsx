import { Button, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Banner({data}) {
    console.log(data);
    const {title, content, destination, label} = data;
    const navigate = useNavigate();

    return(
        <Row>
            <Col>
                <h1 className='text-center'>{title}</h1>
                <p className='text-center'>{content}</p>
                <div className='text-center orderButton'>
                    <Button onClick={() => navigate(destination)}>{label}</Button>
                </div>
            </Col>
        </Row>
    )
}

export default Banner;