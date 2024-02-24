import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  //   Parse the request
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1930)
  @Max(2025)
  year: number;

  //   Parse the request
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  //   Parse the request
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lat: number;

  //   Parse the request
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lng: number;
}
