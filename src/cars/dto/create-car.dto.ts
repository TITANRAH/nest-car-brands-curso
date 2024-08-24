// este es el tipado de la perticion post que espero recibir asi debe lucir lo que me envien
// desde el cliente

import { IsString, MinLength } from 'class-validator';

export class CreateCarDto {
  @IsString({message: 'El brand debe ser un string'})
  readonly brand: string;

  @IsString()
  @MinLength(3) // DEBE TENER AL MENOS 3 CARACETRES, PUEDE SERVIR PARA PASSWORDS
  readonly model: string;
}
