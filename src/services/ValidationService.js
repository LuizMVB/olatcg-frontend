const { getMessage } = require("./MessageService");

const validateFillingFields = (form) => {
    Object.keys(form).forEach(key => {
        if(!form[key]){
            throw getMessage('error.validation.fillingFields');
        }
    })
}

const validateSequences = (sequenceType, sequenceA, sequenceB) => {
    let re;

    if(sequenceType.toUpperCase() === 'DNA'){
        re = new RegExp('[atcgATCG]', 'g'); 
    }
    if(sequenceType.toUpperCase() === 'RNA'){
        re = new RegExp('[aucgAUCG]', 'g');
    }
    if(sequenceType.toUpperCase() === 'PROTEIN'){
        re = new RegExp('[acdefghiklmnpqrstvwyACDEFGHIKLMNPQRSTVWY]', 'g');
    }

    if(sequenceA.replaceAll(re, '') || sequenceB.replaceAll(re, '')){
        throw getMessage('error.valitation.sequences.format');
    }
}

const validateAlignmentForm = (alignmentForm) => {
    validateFillingFields(alignmentForm);
    validateSequences(alignmentForm.sequenceType, alignmentForm.sequenceA, alignmentForm.sequenceB);
}

module.exports = {
    validateAlignmentForm: validateAlignmentForm,
};