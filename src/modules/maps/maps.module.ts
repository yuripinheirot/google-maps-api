import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import { MapsLoaderService } from '@/providers/maps-loader/maps-loader.service';

@Module({
  controllers: [MapsController],
  providers: [MapsService, MapsLoaderService],
})
export class MapsModule {}
