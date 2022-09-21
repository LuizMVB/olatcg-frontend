import { getMessage } from "../services/MessageService";

import ConfigurationStep from "../components/ConfigurationStep";
import StepByStep from "../components/StepByStep";
import HomologySearchFileInputStep from "../components/HomologySeachFileInputStep";
import FollowYourHomologyAnalysisStep from "../components/FollowYourHomologyAnalysisStep";

const Homology = () => {

    const steps = [
        {
            label: getMessage('alignment.step0.label'),
            content: <ConfigurationStep hasDabaseType={true} />
        },
        {
            label: getMessage('alignment.step1.label'),
            content: <HomologySearchFileInputStep />
        },
        {
            label: getMessage('alignment.step2.label'),
            content: <FollowYourHomologyAnalysisStep />
        }
    ]

    return <>
        <StepByStep steps={steps} />
    </>
}

export default Homology;