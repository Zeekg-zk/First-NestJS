import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constant';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      // 这种场景适用于在数据库连接之前进行一些操作
      useFactory: async (connection: Connection): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve(['buddy, brew', 'nrescafe']);
        console.log('[!] Async factory');
        return coffeeBrands;
      },
      inject: [Connection],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
