import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsString()
  desc!: string

  @IsNotEmpty()
  @IsNumber()
  price!: number

  @IsArray()
  @ArrayMinSize(1)
  roomNumbers!: number[]
}
