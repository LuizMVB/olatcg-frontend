import BaseEnumerator from "./BaseEnumerator";

export default class AlignmentTypeEnum extends BaseEnumerator {

    static global = new AlignmentTypeEnum(0);
    static local = new AlignmentTypeEnum(1);

    constructor(code) {
        super();
        this.code = code;
    }

}