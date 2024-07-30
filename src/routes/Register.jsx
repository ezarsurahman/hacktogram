// TODO: answer here

import { Button, Container, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    // TODO: answer here
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [fullname,setFullname] = useState("")
    const [description,setDescription] = useState("")
    const [profilePicture,setProfilePicture] = useState("")
    const [users,setUsers] = useState([])
    const [isUsernameTaken,setIsUsernameTaken] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!username || !password || !fullname || !description || !profilePicture) {
            alert("Please fill in all the details!")
            return
        }

        fetch("http://localhost:3001/users")
        .then((rsp) => rsp.json())
        .then((json) => {
            setUsers(json)
            const userObject = {
                id:String(json.length + 1),
                username: username,
                password: password,
                fullname: fullname,
                desc: description,
                profilePic: profilePicture   
            }

            for(let i = 0; i<json.length;i++) {
                const user = json[i]
                if(user.username === username) {
                    setIsUsernameTaken(true)
                    return
                }
            }

            if (isUsernameTaken) {
                return
            }

            fetch("http://localhost:3001/users", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(userObject)
            })
            .then((response) => {
                if(response.ok) {
                    localStorage.setItem("username",username)
                    localStorage.setItem("password",password)
                    navigate("/")
                }
            })
        })
        
        
        
    }

    return (
        <>
            <Container w={"50%"} h={"100%"} >
                
                <Flex flexDirection={"column"} gap={"1rem"} justifyContent={"center"} h={"100%"}>
                    <Heading>Welcome, newborn Hackers!</Heading>
                    {!isUsernameTaken ? (<></>) : (
                        <Text color={"red"}>Username is taken</Text>
                    )}

                    <Text>Username</Text>
                    <Input data-testid="username" placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}}></Input>
                    
                    <Text>Password</Text>
                    <Input data-testid="password" type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}></Input>

                    <Text>Fullname</Text>
                    <Input data-testid="fullname" placeholder="Full Name" value={fullname} onChange={(e) => {setFullname(e.target.value)}}></Input>
                    
                    <Text>Description</Text>
                    <Input data-testid="description" placeholder="Enter Description" value={description} onChange={(e) => {setDescription(e.target.value)}}></Input>

                    <Text>Profile Picture</Text>
                    <Input data-testid="profile-picture" placeholder="Photo URL..." value={profilePicture} onChange={(e) => {setProfilePicture(e.target.value)}}></Input>

                    <Button colorScheme="blue" data-testid="register-button"variant={"outline"} onClick={handleSubmit}>Register</Button>
                    <Text alignSelf={"center"} data-testid="signin-button">Already have an account?</Text>
                    <Button colorScheme="blue"  data-testid="signin-button" onClick={(e) => {navigate("/signin")}}>Sign In</Button>
                </Flex>

            </Container>
        </>
    );
};

export default Register;
