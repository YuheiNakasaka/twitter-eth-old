import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "utils/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  if (process.browser) {
    nprogress.start();
  }

  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", (url) => {
      console.log(url);
      nprogress.done();
      gtag.pageView(url);
    });
    nprogress.done();
    return () => {
      router.events.off("routeChangeComplete", (url) => {
        gtag.pageView(url);
      });
    };
  }, [router.events]);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
