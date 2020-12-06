export class Token {
    stateCode: number;
    requestAt: string;
    expiresIn: number;
    accessToken: string;
    refreshToken: string;

    constructor(obj?: Token) {
        this.stateCode = obj && obj.stateCode ? obj.stateCode : 0;
        this.requestAt = obj && obj.requestAt ? obj.requestAt : new Date().toDateString();
        this.expiresIn = obj && obj.expiresIn ? obj.expiresIn : 0;
        this.accessToken = obj && obj.accessToken ? obj.accessToken : "";
        this.refreshToken = obj && obj.refreshToken ? obj.refreshToken : "";
    }
}
