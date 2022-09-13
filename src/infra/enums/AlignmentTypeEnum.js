import BaseEnumerator from "./BaseEnumerator";

export default class AlignmentTypeEnum extends BaseEnumerator {

    static GLOBAL = new AlignmentTypeEnum(0);
    static LOCAL = new AlignmentTypeEnum(1);

    constructor(code) {
        super();
        this.code = code;
    }
}