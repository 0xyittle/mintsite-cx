import React from 'react' ;
import { Box, Button, Flex } from '@chakra-ui/react';
//import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
// import Facebook from "./assets/social-media-icons/facebook_32x32.png";
// import Twitter from "./assets/social-media-icons/twitter_32x32.png";
// import Email from "./assets/social-media-icons/email_32x32.png";

const NavBar = ({ accounts, setAccounts }) => {

    return(
        <Flex justify="space-between" align="center" padding="30px 30px">
            {/* Left Side - Social Media Icons */}
        {/* <Flex justify="space-between" width="40%" padding="0 75px">
                <Link href="https://facebook.com">
                    <Image src={Facebook} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href="https://twitter.com">
                    <Image src={Twitter} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href="https://gmail.com">
                    <Image src={Email} boxSize="42px" margin="0 15px" />
                </Link>
            </Flex>
    */}


            {/* Right Side - Social Media Icons */}
       
            <Flex
                justify="space-around"
                align="center"
                width="40%"
                padding="30px"
            >
                 {/*
            <Box margin="0 15px">About</Box>
            <Spacer />
            <Box margin="0 15px">Mint</Box>
            <Spacer />
            <Box margin="0 15px">Team</Box>
            <Spacer />

        */}


            </Flex>
        </Flex>
    );

};

export default NavBar ;