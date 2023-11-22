import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default class Authentication {
    static privateKey() {
        return process.env.JWT_SECRET
    }

    static generateAuthToken(user) {
        const authToken = jwt.sign(
            { data: JSON.stringify(user) },
            this.privateKey(),
            {
                expiresIn: '1d',
                algorithm: 'HS256',
            }
        )
        return authToken
    }
    
    static extractUser(authToken) {
        // sent by frontend as 'Bearer <token>'
        if (authToken.startsWith('Bearer ')) {
            const splitToken = authToken.split(' ')
            try{
                const decoded = jwt.verify(splitToken[1], this.privateKey())
                console.log(decoded)
                return decoded;
            } catch(error) {
                res.status(401).send({
                    error: 'Incorrect Token',
                })
            }
            
        }
        throw new Error('Authorization header was not Bearer')
    }
}