export class JWTTOKEN
{
    static verify(token)
    {
        if(token.algorythm.typ != 'JWT')
        {
            return null;
        }

        return token;
    }

    constructor(b64Val)
    {
        this.algorythm = this.parseJwt(b64Val, 0)
        this.data = this.parseJwt(b64Val, 1);
        this.signature = this.parseSign(b64Val);
    }

    parseJwt(b64Val, part) 
    {
        return JSON.parse(Buffer.from(b64Val.split('.')[part], 'base64').toString());
    }

    parseSign(b64Val) 
    {
        return Buffer.from(b64Val.split('.')[2], 'base64');
    }

    getAuthority()
    {
        return {
            realm : this.data.realm_access.roles,
            resources : this.data.resource_access['gamer-net-front'].roles,
        }
    }
}