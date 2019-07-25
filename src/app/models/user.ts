export class User {

    public readonly ID: string;
    public Username: string;
    public Email: string;
    public Deleted: boolean;
    public IsAdmin: boolean;

    constructor(o: any) {
        this.ID = o.ID;
        this.Username = o.Username;
        this.Email = o.Email;
        this.Deleted = o.Deleted;
        this.IsAdmin = o.IsAdmin;
    }
}
