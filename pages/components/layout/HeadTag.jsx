import Head from 'next/head'

const HeadTag = () => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      <meta charSet='UTF-8'/>
      <link rel="icon" href="./favicon.ico" sizes="16*16" type="image/png"/>
      <title>West-Mec Veterinary</title>
    </Head>
  );
}

export default HeadTag