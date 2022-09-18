import { getMessage } from "../services/MessageService";

import ConfigurationStep from "../components/ConfigurationStep";
import SequenceInputStep from "../components/SequenceInputStep";
import FollowYourAlignmentAnalysisStep from "../components/FollowYourAlignmentAnalysisStep";
import StepByStep from "../components/StepByStep";

const Alignment = () => {

    const steps = [
        {
            label: getMessage('alignment.step0.label'),
            content: <ConfigurationStep  hasAlignmentType={true} hasSequenceType={true}/>
        },
        {
            label: getMessage('alignment.step1.label'),
            content: <SequenceInputStep />
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

export default Alignment;