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
            const decoded = jwt.verify(splitToken[1], this.privateKey())
            return JSON.parse(decoded.data)
        }
        throw new Error('Authorization header was not Bearer')
    }
}