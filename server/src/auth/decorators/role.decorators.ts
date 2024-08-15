import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export const CheckRole = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const jwtService = new JwtService()
		const token = request.headers.authorization.split(' ')[1]
		const decodeToken = jwtService.decode(token)

		if (decodeToken && decodeToken.role === 'admin') {
			return true
		}

		return false
	}
)
