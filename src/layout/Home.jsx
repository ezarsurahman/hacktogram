import React, { useEffect } from "react";
import {Box, Button, Container, Flex, Heading} from '@chakra-ui/react';
import { Outlet, useNavigate } from "react-router-dom";
// TODO: answer here
const Home = () => {
    // TODO: answer here
    const navigate = useNavigate()
    
    const handleHome = () => {
        navigate("/")
    }

    const handleCreate = () => {
        navigate("/create")
    }

    const handleLogout = () => {
        localStorage.removeItem("username")
        localStorage.removeItem("password")
        navigate("/signin")

    }

    return (
    <Flex flexDirection={"row"} h={"100%"} alignItems={"center"}>
            <Flex flexDirection={"column"} justifyContent={"space-between"} padding={"1rem"} h="100%">
                <Button data-testid="home-button" variant={"ghost"} onClick={handleHome}>Home</Button>
                <Flex flexDirection={"column"}>
                    <Button data-testid="create-button" variant={"ghost"} onClick={handleCreate}>Create</Button>
                    <Button data-testid="logout-button" variant={"ghost"} color="red" onClick={handleLogout}>Logout</Button>
                </Flex>
            </Flex>
            <Box backgroundColor={"gray"} h={"97%"} borderColor={"black"} w="1px"></Box>
            <Outlet></Outlet>
        </Flex>
    
    );
};

export default Home;
