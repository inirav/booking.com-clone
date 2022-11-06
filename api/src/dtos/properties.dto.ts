import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator'
import PropertyTypes from '../constants/propertyTypes'

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNotEmpty()
  @IsEnum(PropertyTypes)
  type!: PropertyTypes

  @IsNotEmpty()
  @IsString()
  city!: string

  @IsNotEmpty()
  @IsString()
  address!: string

  @IsNotEmpty()
  @IsString()
  desc!: string

  @IsNotEmpty()
  @IsNumber()
  cheapestPrice!: number

  @IsNotEmpty()
  @IsArray()
  // @ArrayMinSize(4)
  images!: string[]

  @IsNotEmpty()
  @IsNumber()
  distance!: number

  @IsNotEmpty()
  @IsBoolean()
  freeAirportTaxi!: boolean

  @IsNotEmpty()
  @IsBoolean()
  freeCancellation!: boolean

  @IsNotEmpty()
  @IsBoolean()
  featured!: boolean

  @IsNotEmpty()
  @IsString()
  highlights!: string
}
