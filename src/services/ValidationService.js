import { getMessage } from "./MessageService";


const validateIfFieldsAreFilled = (form) => {
    Object.keys(form).forEach(key => {
        if(!form[key]){
            throw getMessage('error.validation.fillingFields');
        }
    })
}

const validateSequences = (sequenceType, ...sequences) => {
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

    if(sequences.find(sequence => sequence.replaceAll(re, ''))){
        throw getMessage('error.valitation.sequences.format');
    }
}

const validateAlignmentForm = (alignmentForm) => {
    validateIfFieldsAreFilled(alignmentForm);
    validateSequences(alignmentForm.sequenceType, alignmentForm.sequenceA, alignmentForm.sequenceB);
}

const validateSequenceFileContent = content => {
    let re1 = new RegExp('\\n', 'g');
    let re2 = new RegExp('[atcgATCG]', 'g');
    if(content.replaceAll(re1, '').replaceAll(re2, '').trim().length !== 0){
        throw getMessage('error.validation.sequenceFile.format');
    }
}

const validateTextFileType = file => {
    if(file.type !== 'text/plain'){
        throw getMessage('error.validation.sequenceFile.type');
    }
}

const ValidationService = {
    validateAlignmentForm: validateAlignmentForm,
    validateIfFieldsAreFilled: validateIfFieldsAreFilled,
    validateTextFileType: validateTextFileType,
    validateSequenceFileContent: validateSequenceFileContent
};

export default ValidationService;