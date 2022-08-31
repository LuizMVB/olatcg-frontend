import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Tools from '../pages/Tools';

export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/tools" element={<Tools />}></Route>
            <Route path="*" element={<Navigate to="/home" />}></Route>
        </Routes>
    );
}