import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';
import actions from '../redux/actions';

const Layout = ({ children, title, isAuthenticated, deauthenticate }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="../static/favicon.ico"/>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {
      title!=="Home"?
    <div className="tabs is-centered">
      <ul>
        <Link href="/"><a>Home</a></Link>
        {!isAuthenticated && <Link href="/signin"><a>Sign In</a></Link>}
        {!isAuthenticated && <Link href="/signup"><a>Sign Up</a></Link>}
        {isAuthenticated && <li onClick={deauthenticate}><a>Sign Out</a></li>}
        <Link href="/palabra-clave"><a>KeywordTool</a></Link>
      </ul>
    </div>:null
    }

    <div className="has-text-centered">
      { children }
    </div>
  </div>
);

const mapStateToProps = (state) => (
  {isAuthenticated: !!state.authentication.token}
);

export default connect(mapStateToProps, actions)(Layout);
