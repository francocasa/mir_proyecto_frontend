import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  width: 300px;
`;

const ProductCard = ({ title, price }) => {
  return (
    <Card>
      <h3>{title}</h3>
      <p>Price: ${price}</p>
    </Card>
  );
};

export default ProductCard;
