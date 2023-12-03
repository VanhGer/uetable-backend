import Authentication from './authentication.js'

export const auth = (req, res, next) => {
    try {
        // const authToken = req.get('Authorization')
        const authToken = req.cookies.authToken;
        // console.log(authToken)
        if (!authToken) {
            res.status(400).json({
                error: new Error('Auth token not provided'),
            })
            return
        } else {
            const decodedUser = Authentication.extractUser(authToken)
            console.log({decodedUser})
            if (!decodedUser?.Id) {
                res.status(401).json({
                    error: 'Invalid auth token',
                })
                return
            }
            // console.log(decodedUser)

            res.locals.decodedUser = decodedUser
            next()
        }
    } catch (e) {
        console.log(e)
        res.status(401).json({
            error: 'Invalid request!',
        })
        return
    }
}
