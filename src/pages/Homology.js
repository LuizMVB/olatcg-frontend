import { getMessage } from "../services/MessageService";

import ConfigurationStep from "../components/ConfigurationStep";
import FollowYourAlignmentAnalysisStep from "../components/FollowYourAlignmentAnalysisStep";
import StepByStep from "../components/StepByStep";
import HomologySearchFileInputStep from "../components/HomologySeachFileInputStep";

const Homology = () => {

    const steps = [
        {
            label: getMessage('alignment.step0.label'),
            content: <ConfigurationStep />
        },
        {
            label: getMessage('alignment.step1.label'),
            content: <HomologySearchFileInputStep />
        },
        {
            label: getMessage('alignment.step2.label'),
            content: <FollowYourAlignmentAnalysisStep />
        }
    ]

    return <>
        <StepByStep steps={steps} />
    </>
}

export default Homology;