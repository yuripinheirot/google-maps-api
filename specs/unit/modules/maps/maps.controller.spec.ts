import { SearchNearbyQueryRequestDto } from '@/modules/maps/dto/search-nearby-query.request.dto';
import { MapsController } from '@/modules/maps/maps.controller';
import { MapsService } from '@/modules/maps/maps.service';
import { TestingModule } from '@nestjs/testing';
import { buildTestingModule } from '@specs/support/specs.module';

describe('[UNIT] [maps/maps.controller] - [searchNearby()]', () => {
  let sut: MapsController;
  let mapsService: MapsService;

  beforeAll(async () => {
    const module: TestingModule = await buildTestingModule().compile();

    sut = module.get<MapsController>(MapsController);
    mapsService = module.get<MapsService>(MapsService);
  });

  test('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('Validations', () => {
    test('Should call maps service with query params', async () => {
      const query: SearchNearbyQueryRequestDto = {
        lat: null,
        lng: null,
        radius: null,
        type: 'restaurant',
      };

      const mapsServiceSpy = jest.spyOn(mapsService, 'searchNearby');

      await sut.searchNearby(query);

      expect(mapsServiceSpy).toHaveBeenCalledWith(query);
    });
  });
});
