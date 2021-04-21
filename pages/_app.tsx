import { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Head from "next/head";
import Header from "@/components/Header";
// import "../styles/globals.css";

const GlobalStyle = createGlobalStyle`
/* @import url('https://fonts.googleapis.com/css2?family=Inconsolata&family=Roboto+Mono&display=swap'); */
    /* font-family: 'Inconsolata', monospace; */

@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');

.container {
    max-width: 960px; 
    width: 100%; 
    margin: 0 auto; 
    padding: 30px; 
    outline: 1px solid black;
}

body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

* {
    font-family: 'Open Sans', sans-serif;
    box-sizing: border-box;
    /* font-family: 'Roboto Mono', monospace; */
  }
`;

const theme = {
    colors: {
        primary: "#0070f3",
        secondary: "red",
    },
};

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Head>
                    <title>Create Next</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                {/* <Header isDark /> */}
                <Header />
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}

// ################################
// ################################
// ################################
// ################################
// ################################
// import { AppProps } from "next/app";
// import Head from "next/head";
// import Header from "@/components/Header";
// import "../styles/globals.css";

// function MyApp({ Component, pageProps }: AppProps) {
//     return (
//         <>
//             <Head>
//                 <title>Create Next</title>
//                 <link rel="icon" href="/favicon.ico" />
//             </Head>

//             <Header />

//             <Component {...pageProps} />
//         </>
//     );
// }

// export default MyApp;
