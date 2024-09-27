import { Chanson } from "./chansons";

export class Album {

    public chansons : Array<Chanson>

    constructor(public title : string, public image : string, public id : string) {
        this.chansons = new Array<Chanson>()
    }
}