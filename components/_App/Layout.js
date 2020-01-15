import Head from "next/head";
import { useRouter } from "next/router";
import Header from "./Header";
import HeadContent from "./HeadContent";

function Layout({ children, user }) {
  const router = useRouter();
  const loginOrsingup =
    router.pathname === "/login" || router.pathname === "/signup";
  return (
    <>
      <Head>
        <HeadContent />
        {/* Stylesheets */}
        {/* Stylesheets */}
        <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Exo+2&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Exo+2|Quintessential&display=swap"
          rel="stylesheet"
        />

        <title>M.E.Gallery</title>
      </Head>
      {!loginOrsingup && <Header user={user} />}
      <main>{children}</main>
    </>
  );
}

export default Layout;
