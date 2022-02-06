import { ObjectId } from "mongodb";

export default class ItoData {
    constructor(public date: Date, public mersisNo: string, public data: any, public id?: ObjectId) { }
}