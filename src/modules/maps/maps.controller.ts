import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { MapsService } from './maps.service';
import { SearchNearbyQueryRequestDto } from './dto/search-nearby-query.request.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('maps')
@UseInterceptors(CacheInterceptor)
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get('search/nearby')
  async searchNearby(@Query() query: SearchNearbyQueryRequestDto) {
    return this.mapsService.searchNearby(query);
  }
}
