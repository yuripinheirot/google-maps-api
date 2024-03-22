import { IsNumber, IsString } from 'class-validator';

export class SearchNearbyQueryRequestDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsNumber()
  radius: number;

  @IsString()
  type: string;
}
