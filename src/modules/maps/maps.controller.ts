import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { MapsService } from './maps.service';
import { SearchNearbyQueryRequestDto } from './dto/search-nearby-query.request.dto';
import { PlacesTypes } from './protocols/places.type';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get('search/nearby')
  async searchNearby(@Query() query: SearchNearbyQueryRequestDto) {
    const isValidType = PlacesTypes.includes(query.type);

    if (!isValidType) {
      throw new BadRequestException('Invalid type');
    }

    return this.mapsService.searchNearby(query);
  }
}
