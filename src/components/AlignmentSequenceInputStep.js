import { useState } from "react";
import { OlatcgStep } from "./OlatcgStep";

const AlignmentSequenceInputStep = ({next}) => {
    
    const [idAnalysis, setIdAnalysis] = useState();

    return <>
        {!idAnalysis ? 
            <OlatcgStep 
                onClickNext={() => setIdAnalysis(idAnalysis)}
            >
                <h1>alnseqinputstep</h1>
            </OlatcgStep> : next(idAnalysis)}
    </>
}

export { AlignmentSequenceInputStep };