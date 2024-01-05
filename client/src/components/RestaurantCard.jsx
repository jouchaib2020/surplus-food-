import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function RestaurantCard({setModalShow}) {
  return (
    <Card style={{ width: '18rem', marginBottom:10 }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <Card.Link href="#">See details</Card.Link>
        <Button 
        variant="primary"
        onClick={()=> setModalShow(true)}
        >
            Add to Cart 
        </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RestaurantCard;