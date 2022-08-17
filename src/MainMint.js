import react, { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import roboPunksNFT from './RoboPunksNFT.json';
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
window.Buffer = window.Buffer || require("buffer").Buffer;

const MainMint = ({ accounts, setAccounts}) => {

    const roboPunksNFTAddress = "0x97934797183505802722aea0ad7ee549ac6f1801";

    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    const [errorText, setErrorText] = useState("");
    const [totalSupplyP, setTotalSupplyP] = useState("");
    const [mintPriceP, setMintPriceP] = useState("");

    const [proofP, setProofP] = useState("");


    const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
    );

    async function connectAccount() {
        if (window.ethereum) {

            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const networkId = await window.ethereum.request({
                    method: "net_version",
                });


                if (networkId == 4) {

                    const totalSupply = await contract.totalSupply()
                    const totalSupplyX = totalSupply.toString() // change  _hex to string
                    setTotalSupplyP(totalSupplyX)
                    console.log("minted : ", totalSupplyP ,"/1000")

                    const mintPrice = await contract.mintPrice();
                    const mintPriceX = ethers.utils.formatEther(mintPrice.toString()) // change wei to 0.0X eth
                    setMintPriceP(mintPriceX)
                    console.log("mint price : ", mintPriceX)

                    const userAddress = accounts[0]
                    console.log(userAddress)


                    let whitelistAddresses = [
                        "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
                        "0x5A641E5FB72A2FD9137312E7694D42996D689D99",
                        "0xDCAB482177A592E424D1C8318A464FC922E8DE40",
                        "0x6E21D37E07A6F7E53C7ACE372CEC63D4AE4B6BD0",
                        "0x09BAAB19FC77C19898140DADD30C4685C597620B",
                        "0xCC4C29997177253376528C05D3DF91CF2D69061A",
                        "0xdD870fA1b7C4700F2BD7f44238821C26f7392148",
                        "0x542A7F54569685f357Da5B8a6106Fe3DDcDA996b",
                        "0xD4F2CDE48EE30962aC4DBFEc193Ad46223bCbE6a",
                      ];

                      const leaves = whitelistAddresses.map((x) => keccak256(x))
                      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
                      console.log("2 tree : ", tree.toString())

                      const root = tree.getRoot()
                      console.log("3 root : ", root)

                      const leaf = keccak256(userAddress);
                      // const leaf = keccak256("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4")
                      console.log("Leaf : ",leaf)

                      const buf2hex = x => '0x' + x.toString('hex')
                      console.log("buff2hex(root) : ", buf2hex(tree.getRoot()))
                      console.log("leaf2hex : ", buf2hex(leaf))

                      const proof = tree.getProof(leaf).map(x => buf2hex(x.data))
                      setProofP(proof)
                        console.log("6 proof : ", proof)
                        console.log("6 proofP : ", proofP)

                        const verify = tree.verify(proof, leaf, root)
  
                        console.log("6 verify : ", verify)

                    
                    setErrorText("Connect metamask success.")
                    setAccounts(accounts);

                } else {
                    setErrorText("Please change network to Rinkeby.")

                }

            } catch (err){
                console.log(err)
                setErrorText("Something went wrong.")
            }
        } else {
            console.log("Please Install metamask.")
            setErrorText("Please install metamask.")
        }
    }

    //log
    console.log("minted : ", totalSupplyP ,"/1000")
    console.log("mint price : ",mintPriceP, "eth")

    console.log("6 proofP : ", proofP)

    
    async function handleMint() {
        if (window.ethereum) {
            try {


                // const response = 
                // await contract.publicMint
                // (
                //     BigNumber.from(mintAmount),
                //     {
                //         value: ethers.utils.parseEther((mintPriceP * mintAmount).toString()),
                //     }
                
                // );

                const response = 
                await contract.mintWhiteList
                (
                    BigNumber.from(mintAmount),
                    proofP,
                    {
                        value: ethers.utils.parseEther((mintPriceP * mintAmount).toString()),

                    }
                
                );

                console.log("response: ", response)


            } catch (err) {
                console.log("error: ", err)
                console.log("error: ", err.error.message)
                setErrorText(err.error.message)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    }

    return (
        <div>
            <Flex justify="center" align="center" height="100vh" paddingBottom="250px">
                <Box width="520px">
                    <div>
                        <Text
                        fontSize="48px"
                        textShadow="0 5px #000000"
                        fontFamily="Rubik"
                        >ChrisX</Text>
                        <Text
                            fontSize="30px"
                            letterSpacing="-5.5%"
                            fontFamily="Rubik"
                            textShadow="0 2px 2px #000000"
                            padding="15px 15px"
                        >
                            ChrisX NFT Live on Ethereum Rinkeby Blockchain. Mint ChrisX to find out.
                        </Text>
                        
                    </div>

                        {isConnected ? (
                            <div>
                                <Text
                                marginTop="20px"
                                fontSize="30px"
                                letterSpacing="-5.5%"
                                fontFamily="Rubik"
                                textShadow="0 3px #000000"
                                color="#D6517D"
                                
                                >Minted : {totalSupplyP}/1000</Text>
                                
                                <Flex align="center" justify="center">
                               
                                    <Button 
                                        backgroundColor="#D6517D"
                                        borderRadius="5px"
                                        boxShadow="0px 2px 2px 1px #0F0F0F"
                                        color="white"
                                        cursor="pointer"
                                        fontSize="20px"
                                        fontWeight="900"
                                        fontFamily="Rubik"
                                        padding="15px"
                                        marginTop="10px"
                                        onClick={handleDecrement}
                                    >
                                        -
                                    </Button>
                                    <Input
                                        readOnly
                                        fontSize="20px"
                                        fontFamily="Rubik"
                                        width="100px"
                                        height="40px"
                                        textAlign="center"
                                        paddingLeft="19px"
                                        marginTop="10px"
                                        type="number"
                                        value={mintAmount}
                                    />
                                    <Button 
                                        backgroundColor="#D6517D"
                                        borderRadius="5px"
                                        boxShadow="0px 2px 2px 1px #0F0F0F"
                                        color="white"
                                        cursor="pointer"
                                        fontSize="20px"
                                        fontFamily="Rubik"
                                        padding="15px"
                                        marginTop="10px"
                                        onClick={handleIncrement}
                                    >
                                        +
                                    </Button>
                                </Flex> 

                                <Button
                                    backgroundColor="#D6517D"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="white"
                                    cursor="pointer"
                                    fontSize="20px"
                                    fontFamily="Rubik"
                                    padding="15px"
                                    marginTop="10px"
                                    onClick={handleMint}
                                >
                                    Mint Now
                                </Button>

                                <Text
                                marginTop="20px"
                                fontSize="30px"
                                letterSpacing="-5.5%"
                                fontFamily="Rubik"
                                textShadow="0 3px #000000"
                                color="#D6517D"
                            >{errorText}</Text>

                            </div>
                        ) : (
                        <div>
                            <Text
                                marginTop="70px"
                                fontSize="30px"
                                letterSpacing="-5.5%"
                                fontFamily="Rubik"
                                textShadow="0 3px #000000"
                                color="#D6517D"
                            >
                                You must be connected to Mint.
                            </Text>
                            
                            <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="Rubik"
                            padding="15px"
                            margin="0 15px"
                            onClick={connectAccount}
                            >
                                Connect
                            </Button>
                            <Text
                                marginTop="20px"
                                fontSize="30px"
                                letterSpacing="-5.5%"
                                fontFamily="Rubik"
                                textShadow="0 3px #000000"
                                color="#D6517D"
                            >{errorText}</Text>

                        </div>
                        )}
                </Box>
            </Flex>
        </div>
    );

};

export default MainMint;