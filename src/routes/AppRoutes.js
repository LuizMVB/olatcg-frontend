import { Routes, Route, Navigate } from 'react-router-dom';
import Alignment from '../pages/Alignment';
import Home from '../pages/Home';
import Learn from '../pages/Learn';
import Tools from '../pages/Tools';
import Tutorials from '../pages/Tutorials';
import Homology from '../pages/Homology';
import { Analysis } from '../pages/Analysis';
import { HomologyAnalysis } from '../pages/HomologyAnalysis';
import { AlignmentAnalysis } from '../pages/AlignmentAnalysis';
import { PhylogeneticTreeAnalysis } from '../pages/PhylogeneticTreeAnalysis';
import { AlignmentAnalysisDetails } from '../pages/AlignmentAnalysisDetails';
import { HomologyAnalysisDetails } from '../pages/HomologyAnalysisDetails';
import PhyloTree from '../pages/PhyloTree';
import {AnalysisDetailsRouter} from './AnalysisDetailsRouter.js';
import { Experiment } from '../pages/Experiment.js';

export default function AppRoutes(){
    return (
        <Routes>
            <Route path="home" element={<Home />} />
            <Route path="learn" element={<Learn />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="tool" element={<Tools />}>
                <Route path="alignment" element={<Alignment />} />
                <Route path="homology" element={<Homology />} />
            </Route>
            <Route path="analysis" element={<Analysis />} />
            <Route path="/analysis/:idAnalysis" element={<AnalysisDetailsRouter/> }/>
            <Route path="*" element={<Navigate to="home" />} />
            <Route path="experiment" element={<Experiment />} />
        </Routes>
    );
}
