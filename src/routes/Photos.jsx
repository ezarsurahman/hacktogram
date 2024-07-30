// TODO: answer here
import { Box, Container, Flex, Heading, Img, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const Photos = () => {
    // TODO: answer here
    const [username,setUsername] = useState("")
    const [userObject,setUserObject] = useState("")
    const [userPhotos,setUserPhotos] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        setUsername(localStorage.getItem("username"))
        const username = localStorage.getItem("username")

        let id;

        fetch("http://localhost:3001/users")
        .then((rsp) => rsp.json())
        .then((json) => {
            json.forEach((user) => {
                if(user.username === username) {
                    setUserObject(user)
                }
            })
        })
    },[])

    useEffect(() => {
        const lists = []
        fetch("http://localhost:3001/photos")
        .then((rsp) => rsp.json())
        .then((json) => {
            json.forEach((photo)=> {
                if(photo.userId === userObject.id) {
                    lists.push(photo)
                }
            })
            setUserPhotos(lists)
            setIsLoading(false)
        })
    },[userObject])

    



    return (
        <Flex className="photos-page" w={"100%"} h={"100%"} justifyContent={"center"} alignContent={"center"}>
            <Flex  flexDirection={"column"} justifyContent={"flex-start"} h={"100%"} padding={"1rem"} gap="1rem">
                <Flex flexDirection={"row"} gap={"1rem"} padding={"1rem"}>
                    <Img src={userObject.profilePic} height={"100px"} width={"100px"} objectFit={"cover"} borderRadius={"50%"}></Img>
                    <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"flex-start"}>
                        <Text fontWeight={"bold"} fontSize={"1.5rem"}>{username}</Text> 
                        <Text>{userPhotos.length} Photos</Text>
                        <Flex flexDirection={"column"} alignItems={"flex-start"}gap={"0.2rem"}>
                            <Text>{userObject.fullname}</Text>
                            <Text>{userObject.desc}</Text>
                        </Flex>
                        
                    </Flex>
                </Flex>
                <hr />
                {isLoading ? (
                    <SimpleGrid columns={3} spacing={1}>
                        <Box className="photo-loading-template" w={"200px"} h={"200px"} backgroundColor={"gray.200"}></Box>
                        <Box className="photo-loading-template" w={"200px"} h={"200px"} backgroundColor={"gray.200"}></Box>
                        <Box className="photo-loading-template" w={"200px"} h={"200px"} backgroundColor={"gray.200"}></Box>
                    </SimpleGrid>) : (
                    <SimpleGrid columns={3} spacing={1}>
                        {userPhotos.map((photo) => {
                            return (
                            <Link to={`/${photo.id}`} key={photo.id}>
                                <Img src={photo.url} objectFit={"cover"} w={"200px"} h={"200px"} alt={photo.caption}></Img>
                            </Link>
                        )
                        })}
                    </SimpleGrid>
                    )}
            </Flex>
        </Flex>
    );
};

export default Photos;
