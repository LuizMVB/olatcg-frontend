import { useState } from "react";
import { OlatcgStep } from "./OlatcgStep";

const AlignmentConfigurationStep = ({next}) => {

    const [isNextShowed, showNext] = useState(false);

    return <>
        {!isNextShowed ? 
            <OlatcgStep 
                onClickNext={() => showNext(true)}
            >
                <h1>olatcgConfigStep</h1>
            </OlatcgStep> : next()}
    </>
}

export { AlignmentConfigurationStep };