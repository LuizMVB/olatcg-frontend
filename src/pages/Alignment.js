import FollowYourAlignmentAnalysisStep from "../components/alignmentSteps/FollowYourAlignmentAnalysisStep";
import { AlignmentSequenceInputStep } from "../components/AlignmentSequenceInputStep";
import { AlignmentConfigurationStep } from "../components/AlignmentConfigurationStep";

const Alignment = () => {
    return <>
        <AlignmentConfigurationStep next={() =>
            <AlignmentSequenceInputStep next={(idAnalysis) =>
                <FollowYourAlignmentAnalysisStep idAnalysis={idAnalysis} />}/>}/>
    </>
}

export default Alignment;