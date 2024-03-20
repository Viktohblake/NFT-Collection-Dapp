import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import useTransfer from "../hooks/useTransferNfts";
import useCollections from "../hooks/useCollections";
import useMyNfts from "../hooks/useMyNfts";

const TransferModal = () => {
  const [addressTo, setAddressTo] = useState("");
  const [edition, setEdition] = useState("");
  const handleTransfer = useTransfer(addressTo, edition);
  const tokensData = useCollections();
  const myTokenIds = useMyNfts();

  const myTokensData = tokensData.filter((x, index) =>
    myTokenIds.includes(index)
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="px-8 py-2 mt-2 bg-red-500">Transfer NFT</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              New Owner Address
            </Text>
            <TextField.Input
              value={addressTo}
              onChange={(e) => setAddressTo(e.target.value)}
              placeholder="0x0000..."
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" className="bg-gray-300">
              Cancel
            </Button>
          </Dialog.Close>
          {tokensData.map((x) => (
            <Dialog.Close>
              {myTokensData.includes(x) && (
                <Button
                  onClick={() => handleTransfer(setEdition(x.edition))}
                  className="bg-red-500"
                >
                  Transfer
                </Button>
              )}
            </Dialog.Close>
          ))}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TransferModal;