/* eslint-disable prettier/prettier */
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'your_jwt_secret', // Replace with a secure secret
            // secretOrKey: process.env.JWT_SECRET, // Replace with a secure secret
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}