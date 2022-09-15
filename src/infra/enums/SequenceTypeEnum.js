import BaseEnumerator from "./BaseEnumerator";

export default class SequenceTypeEnum extends BaseEnumerator {

    static DNA = new SequenceTypeEnum(0)
    static RNA = new SequenceTypeEnum(1)
    static PROTEIN = new SequenceTypeEnum(2)

    constructor(code) {
        super();
        this.code = code;
    }
}