import { Injectable } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEED } from './data/cars.seed';
import { BrandsService } from 'src/brands/brands.service';
import { BRANDS_SEED } from './data/brand.seed';

@Injectable()
export class SeedService {
  constructor(private carsService: CarsService, private brandsServices: BrandsService) {}

  populateDB() {
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandsServices.fillBrandsWithSeedData(BRANDS_SEED)

    return `Seed executed`;
  }
}
