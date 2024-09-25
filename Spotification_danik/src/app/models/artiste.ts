import { Album } from "./album"
import { Concert } from "./concert"

export class Artiste {

    public chansons : Array<Album>
    public concerts : Array<Concert>

    constructor(public name : string, public image : string) {
        this.chansons = new Array<Album>()
        this.concerts = new Array<Concert>()
    }
}