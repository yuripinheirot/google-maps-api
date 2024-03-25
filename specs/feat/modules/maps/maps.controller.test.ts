import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { buildTestingModule } from '@specs/support/specs.module';
import * as request from 'supertest';

describe('[FEAT] [maps/maps.controller] - [searchNearby()]', () => {
  const sut = '/maps/search/nearby';
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await buildTestingModule().compile();
    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    app = undefined;
  });

  describe('Validations', () => {
    test('Should validate invalid query params', async () => {
      const { statusCode, body } = await request(app.getHttpServer()).get(sut);

      expect(statusCode).toBe(400);
      expect(body.message).toEqual([
        'lat must be a number conforming to the specified constraints',
        'lng must be a number conforming to the specified constraints',
        'radius must be a number conforming to the specified constraints',
        'type must be one of the following values: ',
      ]);
    });

    test('Should pass with valid query params', async () => {
      const { statusCode } = await request(app.getHttpServer()).get(sut).query({
        lat: 10,
        lng: 10,
        radius: 1000,
        type: 'restaurant',
      });

      expect(statusCode).toBe(200);
    });
  });
});
