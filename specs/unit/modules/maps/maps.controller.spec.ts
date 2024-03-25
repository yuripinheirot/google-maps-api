import { SearchNearbyQueryRequestDto } from '@/modules/maps/dto/search-nearby-query.request.dto';
import { MapsController } from '@/modules/maps/maps.controller';
import { TestingModule } from '@nestjs/testing';
import { buildTestingModule } from '@specs/support/specs.module';

describe('[UNIT] [maps/maps.controller] - [searchNearby()]', () => {
  let sut: MapsController;

  beforeAll(async () => {
    const module: TestingModule = await buildTestingModule().compile();

    sut = module.get<MapsController>(MapsController);
  });

  test('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('Validations', () => {
    test.skip('Should validate query params', async () => {
      const query: SearchNearbyQueryRequestDto = {
        lat: null,
        lng: null,
        radius: null,
        type: '',
      };

      const requestPromise = sut.searchNearby(query);

      await expect(requestPromise).toThrow();
    });
  });
});
