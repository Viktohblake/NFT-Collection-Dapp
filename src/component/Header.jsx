import { Flex } from "@radix-ui/themes";

export default function Header() {
    return (            
            <Flex gap={"4"} align={"center"} justify={"between"}>
                <div>Mata NFT</div>
                <w3m-button />
            </Flex>
    );
}
