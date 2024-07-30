import { Box, Button, Flex, Heading, Img,Text } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// TODO: answer here
const Detail = () => {
    // TODO: answer here
    const {id} = useParams()
    const [photoData,setPhotoData] = useState({})
    const [userData,setUserData] = useState({})
    const navigate = useNavigate()
    useEffect(()=> {
        fetch("http://localhost:3001/photos/"+id)
        .then((rsp)=>rsp.json())
        .then((json)=>{
            setPhotoData(json)
            fetch("http://localhost:3001/users/"+json.userId)
            .then((response)=> response.json())
            .then((output) => setUserData(output))
        })
    },[id])

    const handleDelete = () => {
        fetch("http://localhost:3001/photos/"+id,{
            method:"DELETE"
        })
        .then((rsp) => {
            if(rsp.ok) {
                navigate("/")
            }
        })
    }

    return (
        <Flex className="detail-photo-page" width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Flex flexDirection={"row"} h={"60vh"} gap={"1rem"}>
                <Flex backgroundColor={"black"} justifyContent={"center"} alignItems={"center"} h={"100%"}>
                    <Img src={photoData.url} alt={photoData.caption} h={"50vh"}></Img>
                </Flex>
                <Flex flexDirection={"column"} justifyContent={"space-between"} h={"100%"}>
                    <Flex flexDirection={"row"} gap={"1rem"}>
                        <Img src={userData.profilePic} h={"5vh"} w={"5vh"} objectFit={"cover"} borderRadius={"50%"}></Img>
                        <Box maxW={"30vw"}>
                        <Text as={"b"}>{userData.username}</Text><Text margin={"0"} textAlign={"justify"}>{photoData.caption}</Text>
                        </Box>
                    </Flex>
                    <Button variant={"ghost"} colorScheme="red" onClick={handleDelete}>Delete Photo</Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Detail;
