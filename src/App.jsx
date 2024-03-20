
import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import AppTabs from "./component/AppTabs";
import useCollections from "./hooks/useCollections";
import useMyNfts from "./hooks/useMyNfts";
import useMintNFT from "./hooks/useMintNfts";
import { useState } from "react";
import TransferModal from "./component/TransferModal";
import "./output.css";

configureWeb3Modal();

function App() {
  const [edition, setEdition] = useState("");
  const mint = useMintNFT(edition);
  const tokensData = useCollections();
  const myTokenIds = useMyNfts();

  const myTokensData = tokensData.filter((x, index) =>
    myTokenIds.includes(index)
    // console.log(index)
  );

  const viewNFT = (tokenId) => {
    window.open(
      `https://testnets.opensea.io/assets/mumbai/${
        import.meta.env.VITE_contract_address
      }/${tokenId}`
    );
  };

  return (
    <Container>
      <Header />
      <main className="mt-6">
        <AppTabs
          MyNfts={
            <Flex align="center" gap="8" wrap={"wrap"}>
              {myTokensData.length === 0 ? (
                <Text>No NFT owned yet</Text>
              ) : (
                myTokensData.map((x) => (
                  <Box key={x.dna} className="w-[20rem]">
                    <img
                      src={x.image}
                      className="w-full object-contain"
                      alt={x.name}
                    />
                    <Text className="block text-2xl">Name: {x.name}</Text>
                    <Text className="block">Description: {x.description}</Text>
                    <Flex className="justify-center" gap="2">
                      <Button
                        onClick={() => viewNFT(x.edition)}
                        className="px-8 py-2 mt-2"
                      >
                        View NFT
                      </Button>
                      <TransferModal />
                    </Flex>
                  </Box>
                ))
              )}
            </Flex>
          }
          AllCollections={
            <Flex align="center" gap="8" wrap={"wrap"}>
              {tokensData.length === 0 ? (
                <Text>Loading...</Text>
              ) : (
                tokensData.map((x) => (
                  <Box key={x.dna} className="w-[20rem]">
                    <img
                      src={x.image}
                      className="w-full object-contain"
                      alt={x.name}
                    />
                    <Text className="block text-2xl">Name: {x.name}</Text>
                    <Text className="block">Description: {x.description}</Text>
                    {myTokensData.includes(x) ? (
                      <Button
                        onClick={() => viewNFT(x.edition)}
                        className="px-8 py-2 mt-2"
                      >
                        View NFT
                      </Button>
                    ) : (
                      <Button
                        onClick={() => mint(setEdition(x.edition))}
                        className="px-8 py-2 mt-2"
                      >
                        Mint
                      </Button>
                    )}
                  </Box>
                ))
              )}
            </Flex>
          }
        />
        <ToastContainer />
      </main>
    </Container>
  );
}

export default App;