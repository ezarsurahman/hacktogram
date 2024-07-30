import React, { useEffect } from "react";
import {Box, Button, Container, Flex, Heading} from '@chakra-ui/react';
import { Outlet } from "react-router-dom";
// TODO: answer here
const Home = () => {
    // TODO: answer here
    

    return (
    <Flex flexDirection={"row"} h={"100%"} alignItems={"center"}>
            <Flex flexDirection={"column"} justifyContent={"space-between"} padding={"1rem"} h="100%">
                <Button data-testid="home-button" variant={"ghost"}>Home</Button>
                <Flex flexDirection={"column"}>
                    <Button data-testid="create-button" variant={"ghost"}>Create</Button>
                    <Button data-testid="logout-button" variant={"ghost"} color="red">Logout</Button>
                </Flex>
            </Flex>
            <Box backgroundColor={"gray"} h={"97%"} borderColor={"black"} w="1px"></Box>
        </Flex>
        
    );
};

export default Home;
