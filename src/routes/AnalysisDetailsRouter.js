import { useParams, useLocation } from "react-router-dom";
import { AlignmentAnalysisDetails } from "../pages/AlignmentAnalysisDetails";
import { HomologyAnalysisDetails } from "../pages/HomologyAnalysisDetails";
import PhyloTree from "../pages/PhyloTree";

const AnalysisDetailsRouter = () => {
    const {idAnalysis} = useParams();
    const location = useLocation();
    const type = location.state?.type;

    if (type==='ALIGNMENT') {
        return <AlignmentAnalysisDetails />
    }

    if (type === 'HOMOLOGY') {
        return <HomologyAnalysisDetails />
    }

    return <PhyloTree />
}

export  {AnalysisDetailsRouter};