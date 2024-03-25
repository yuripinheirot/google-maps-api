import { Injectable } from '@nestjs/common';
import { SearchNearbyQueryRequestDto } from './dto/search-nearby-query.request.dto';
import { MapsLoaderService } from '@/providers/maps-loader/maps-loader.service';

@Injectable()
export class MapsService {
  constructor(private readonly mapsLoaderService: MapsLoaderService) {}

  async searchNearby(query: SearchNearbyQueryRequestDto) {
    return this.mapsLoaderService.searchNearby(query);
  }
}
