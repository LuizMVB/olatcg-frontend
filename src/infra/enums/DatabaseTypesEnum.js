import BaseEnumerator from "./BaseEnumerator";

export default class DatabaseTypeEnum extends BaseEnumerator {

    static OLATCGDB = new DatabaseTypeEnum(0)

    constructor(code) {
        super();
        this.code = code;
    }
}