import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "utils/gtag";
import Layout from "layouts/Layout";
import { ChainId, DAppProvider, Config } from "@usedapp/core";

const config: Config = {
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    [ChainId.Hardhat]: "http://localhost:8545",
  },
  multicallAddresses: {
    [ChainId.Hardhat]: "http://localhost:8545",
  },
};

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

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
    <DAppProvider config={config}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </DAppProvider>
  );
}

export default MyApp;
