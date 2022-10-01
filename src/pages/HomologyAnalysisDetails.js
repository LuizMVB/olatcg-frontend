import { useEffect } from "react";
import { useParams } from "react-router-dom";

const HomologyAnalysisDetails = () => {
    let { idAnalysis } = useParams(); 

    useEffect(() => {
        console.log(`/something/${idAnalysis}`);
    }, [idAnalysis]);

    return <>
        homology analysis details
    </>
};

export { HomologyAnalysisDetails };