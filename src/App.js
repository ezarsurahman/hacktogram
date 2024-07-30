import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute"
import Photos from "./routes/Photos"
import Home from "./layout/Home.jsx"
import CreatePhoto from "./routes/CreatePhoto.jsx"
import Detail from "./routes/Detail.jsx"
import SignIn from "./routes/SignIn.jsx"
import Register from "./routes/Register.jsx"
import NotFound from "./routes/NotFound.jsx"
// TODO: answer here

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute>
                <Home></Home>
            </ProtectedRoute>}>
                <Route index element={<Photos></Photos>}></Route>
                <Route path="create" element={<CreatePhoto></CreatePhoto>}></Route>
                <Route path=":id" element={<Detail></Detail>}></Route>
            </Route>

            <Route path="/signin" element={<SignIn></SignIn>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes> 
    );
};

export default App;
