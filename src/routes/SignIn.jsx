import { Button, Container, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO: answer here
const SignIn = () => {
    // TODO: answer here
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [users,setUsers] = useState([])
    const [isAuth,setIsAuth] = useState(true)
    const navigate = useNavigate()

    const handleSubmit = (e) => {

        if(!username || !password) {
            alert("Enter both username and password!")
            return
        }

        fetch("http://localhost:3001/users")
        .then((rsp) => rsp.json())
        .then((json) => {
            setUsers(json)
            users.forEach((user) => {
                if (user.username == username && user.password == password) {
                    localStorage.setItem("username",username)
                    localStorage.setItem("password",password)
                    navigate("/")
                    return
                }
            })
            setIsAuth(false)
            setUsername("")
            setPassword("")
        })
        
    }

    return (
        
            <Container w={"50%"} h={"100%"} >
                
                <Flex flexDirection={"column"} gap={"1rem"} justifyContent={"center"} h={"100%"}>
                    <Heading>HackTo-gram</Heading>
                    {isAuth ? (<></>) : (
                        <Text color={"red"}>Invalid username or password</Text>
                    )}

                    <Text>Username</Text>
                    <Input data-testid="username" placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}}></Input>
                    
                    <Text>Password</Text>
                    <Input data-testid="password" type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}></Input>
                    <Button colorScheme="blue" onClick={handleSubmit}>Sign In</Button>
                    <Text alignSelf={"center"} data-testid="signin-button">Don't have an account?</Text>
                    <Button colorScheme="blue" variant={"outline"} data-testid="register-button" onClick={(e) => {navigate("/register")}}>Register</Button>
                </Flex>

            </Container>
            
            
            
        
    );
};

export default SignIn;
