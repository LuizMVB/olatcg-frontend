import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Learn from '../pages/Learn';
import Tools from '../pages/Tools';

export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/learn" element={<Learn/>} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
}