import { Controller, Get, Query } from '@nestjs/common';
import { MapsService } from './maps.service';
import { SearchNearbyQueryRequestDto } from './dto/search-nearby-query.request.dto';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get('search/nearby')
  async searchNearby(@Query() query: SearchNearbyQueryRequestDto) {
    return this.mapsService.searchNearby(query);
  }
}
