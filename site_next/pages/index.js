import Head from 'next/head';
import Script from 'next/script';

import Menu from '../components/Menu';
import Footer from '../components/Footer';

function Home({ data }) {
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

      <section className="img-top top">
        <style>
          {`.img-top{
                        background-image: url(` +
            data.urlImage +
            data.dataHome.image_top +
            `);
                        background-repeat: no-repeat;
                        background-position: center;
                    }`}
        </style>
        <div className="max-width">
          <div className="top-content">
            <div className="text-1">{data.dataHome.title_top_one}</div>
            <div className="text-2">{data.dataHome.title_top_two}</div>
            <div className="text-3">{data.dataHome.title_top_three}</div>
            <a href={data.dataHome.btn_link_top}>
              {data.dataHome.btn_text_top}
            </a>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="max-width">
          <h2 className="title">{data.dataHome.ser_title}</h2>
          <div className="serv-content">
            <div className="card">
              <div className="box">
                <i className={data.dataHome.ser_icon_one}></i>
                <div className="text">{data.dataHome.ser_title_one}</div>
                <p>{data.dataHome.ser_desc_one}</p>
              </div>
            </div>

            <div className="card">
              <div className="box">
                <i className={data.dataHome.ser_icon_two}></i>
                <div className="text">{data.dataHome.ser_title_two}</div>
                <p>{data.dataHome.ser_desc_two}</p>
              </div>
            </div>

            <div className="card">
              <div className="box">
                <i className={data.dataHome.ser_icon_three}></i>
                <div className="text">{data.dataHome.ser_title_three}</div>
                <p>{data.dataHome.ser_desc_three}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="premium">
        <div className="max-width">
          <h2 className="title">{data.dataHome.title_ser_prem}</h2>
          <div className="premium-content">
            <div className="column left">
              <img
                src={data.urlImage + data.dataHome.image_ser_prem}
                alt="Serviço premium"
              />
            </div>
            <div className="column right">
              <div className="text">{data.dataHome.subtitle_ser_prem}</div>
              <p> {data.dataHome.desc_ser_prem}</p>
              <a href={data.dataHome.btn_link_ser_prem}>
                {data.dataHome.btn_text_ser_prem}
              </a>
            </div>
          </div>
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
  const response = await fetch(`http://localhost:8080/site-home/view-home`);
  const data = await response.json();
  //console.log(data);

  return { props: { data } };
}

export default Home;
