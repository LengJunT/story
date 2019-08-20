const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

class TokenService extends Service {
    async handleToken(token) {

    }
    // 生成
    async generateToken(data) {
        let created = Math.floor(Date.now() / 1000);
        let cert = await fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem'));//私钥
        let token = jwt.sign({
            data,
            exp: created + 3600 * 24
        }, cert, { algorithm: 'RS256' });
        return token;
    }

    async decryptionToken(token) {
        let cert = await fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem'));
        try{
            let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
            let {exp = 0} = result,current = Math.floor(Date.now()/1000);
            if(current <= exp){
                res = result.data || {};
            }
        }catch(e){
        
        }
        return res
    }

}
module.exports = TokenService;
