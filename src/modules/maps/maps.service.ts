import { Injectable } from '@nestjs/common';
import { SearchNearbyQueryRequestDto } from './dto/search-nearby-query.request.dto';

@Injectable()
export class MapsService {
  searchNearby(query: SearchNearbyQueryRequestDto) {
    return query;
  }
}
