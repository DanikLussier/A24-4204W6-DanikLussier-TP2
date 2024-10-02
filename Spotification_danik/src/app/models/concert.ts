export class Concert {
    //Ajout de la localisation du concert
    constructor(public date : Date, public pays : string, public ville : string, public lat : number, public lng : number) {

    }
}