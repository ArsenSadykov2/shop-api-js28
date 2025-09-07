import './App.css'
import {Container, CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes } from 'react-router-dom';
import Products from "./features/products/Products.tsx";
import {ToastContainer} from "react-toastify";
import NewProduct from "./features/products/NewProduct.tsx";

const App = () => {

    return (
        <>
            <CssBaseline/>
            <ToastContainer/>
            <header>
                <AppToolbar>

                </AppToolbar>
            </header>
            <main>
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Products/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/products/new" element={<NewProduct/>}/>
                        <Route path="*" element={<Typography variant="h4">Not Found Page</Typography>}/>
                    </Routes>
                </Container>
            </main>

        </>
    )
};

export default App
