import { Injectable } from '@nestjs/common';

import { Client } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';
import { SearchNearbyQueryRequestDto } from '@/modules/maps/dto/search-nearby-query.request.dto';

@Injectable()
export class MapsLoaderService extends Client {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  private readonly clientSecret = this.configService.getOrThrow(
    'GOOGLE_MAPS_CLIENT_SECRET',
  );

  async searchNearby(query: SearchNearbyQueryRequestDto) {
    try {
      const { data } = await this.placesNearby({
        params: {
          location: {
            lat: query.lat,
            lng: query.lng,
          },
          radius: query.radius,
          type: query.type,
          key: this.clientSecret,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  }
}
