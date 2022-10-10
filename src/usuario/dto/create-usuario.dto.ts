import { IsString, IsAlpha, IsEmail, IsPhoneNumber, IsIn, MaxLength, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @MinLength(8)
    nome: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    @MinLength(9)
    @MaxLength(20)
    telefone: string;

    @IsAlpha()
    @IsIn(["Masculino", "Feminino"])
    sexo: string;
}
