import { getMessage } from "../../services/MessageService";

export default class SequenceTypeEnum {
    static DNA = new SequenceTypeEnum(0)
    static RNA = new SequenceTypeEnum(1)
    static PROTEIN = new SequenceTypeEnum(2)

    constructor(code) {
        this.code = code
    }

    static getSelectStructure(){
        return Object.keys(SequenceTypeEnum).map(key=> 
            { 
                return {
                    code: SequenceTypeEnum[key], 
                    value: key, 
                    label: getMessage('enum.SequenceTypeEnum.' + key)
                }
            }
        );
    }
}