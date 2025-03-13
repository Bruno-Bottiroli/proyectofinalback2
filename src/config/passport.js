import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import User  from '../models/user.model.js'
import dotenv from 'dotenv'

dotenv.config()

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, 
}

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (!user) return done(null, false); 
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  })
)
