import { IsEmail, IsString, isEmail, isString } from 'class-validator'

export class CreateUserDto {
    @IsEmail()
    email: string
    @IsString()
    password: string
}