import { Routes, Route, Navigate } from 'react-router-dom';
import Alignment from '../pages/Alignment';
import Home from '../pages/Home';
import Learn from '../pages/Learn';
import Tools from '../pages/Tools';
import Tutorials from '../pages/Tutorials';
import Homology from '../pages/Homology';

export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/alignment" element={<Alignment />} />
            <Route path="/homology" element={<Homology />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
    );
}