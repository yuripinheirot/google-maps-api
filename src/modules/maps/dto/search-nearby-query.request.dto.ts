import { IsEnum, IsNumber } from 'class-validator';
import { PlacesTypes } from '../protocols/places.type';

export class SearchNearbyQueryRequestDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsNumber()
  radius: number;

  @IsEnum(PlacesTypes.map((type) => type))
  type: string;
}
