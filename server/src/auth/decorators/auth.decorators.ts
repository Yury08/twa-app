import { UseGuards } from '@nestjs/common'
import { JwtGuards } from '../guards/jwt.guards'

export const Auth = () => UseGuards(JwtGuards)
