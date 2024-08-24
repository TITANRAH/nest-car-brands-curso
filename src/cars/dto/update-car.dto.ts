// este es el tipado de la perticion post que espero recibir asi debe lucir lo que me envien
// desde el cliente

import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { version } from 'os';
import { v4 } from 'uuid';

export class UpdateCarDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString({ message: 'El brand debe ser un string' })
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsOptional()

  //@MinLength(3) // DEBE TENER AL MENOS 3 CARACETRES, PUEDE SERVIR PARA PASSWORDS
  readonly model?: string;
}
