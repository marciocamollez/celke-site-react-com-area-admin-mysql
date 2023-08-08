import Head from 'next/head';
import Script from 'next/script';

import Menu from '../components/Menu';
import Footer from '../components/Footer';

function SobreEmpresa({ data }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content={data.dataSeo.description} />
        <meta name="author" content="Cesar - Celke" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <title>{data.dataSeo.title}</title>
      </Head>
      <Menu />

      <section className="about">
        <div className="max-width">
          <h2 className="title">Sobre Empresa</h2>

          {data.abouts.map((about) => (
            <div key={about.id} className="about-content">
              <div className="column left">
                <img
                  src={data.urlImage + about.image_about}
                  alt={about.title_about}
                />
              </div>
              <div className="column right">
                <div className="text">{about.title_about}</div>
                <p> {about.desc_about}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer data={data.dataFooter} />

      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy="beforeInteractive"
      />

      <Script src="custom.js" strategy="afterInteractive" />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:8080/site-about/list-about`);
  const data = await response.json();
  console.log(data);
  return { props: { data } };
}

export default SobreEmpresa;
