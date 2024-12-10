import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageRow from '../components/ImageRow';
import Frontis1 from '../assets/Frontis1.png';
import Frontis2 from '../assets/Frontis2.png';
import Frontis3 from '../assets/Frontis3.png';

const Home = () => {
  return (
    <div>
      <Header />
      <ImageRow imgSrc={Frontis1} title="Tienda de Ropa Alternativa" subtitle="Prendas en tendencia" />
      <ImageRow imgSrc={Frontis2} title="Colección Verano" subtitle="50% DSC." />
      <ImageRow imgSrc={Frontis3} title="Colección Bikini" subtitle="30% DSC." />
      <Footer />
    </div>
  );
};

export default Home;
