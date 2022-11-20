import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  public user!: string

  @IsNotEmpty()
  @IsString()
  public property!: string

  @IsNotEmpty()
  @IsNumber()
  public totalAmount!: number

  @IsNotEmpty()
  public rooms!: { id: string; roomNumbers: { number: number; unavailableDates: Date[] }[] }[]
}
