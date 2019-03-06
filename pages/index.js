import { connect } from 'react-redux';
import Link from 'next/link';
import initialize from '../utils/initialize';
import Layout from '../components/Layout';

const Index = () => (
  <Layout title="Home">
    <h2 className="title is-2">SERP Keywords Tools</h2>
    <p>
    SERP es la mejor alternativa para el planificador de Palabras Claves de Googgle y otras herramientas de Palabra Claves
    </p>
    <Link href="/signin"><a>Ingresar</a></Link>
  </Layout>
);

Index.getInitialProps = function(ctx) {
  initialize(ctx);
};

export default connect(state => state)(Index);
