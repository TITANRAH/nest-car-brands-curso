import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    // },
  ];
  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;

    const brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime(),
    };

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandBD = this.findOne(id);

    if (!brandBD) throw new NotFoundException(`Brand with id ${id} not found`);

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandBD.updatedAt = new Date().getTime();
        brandBD = { ...brandBD, ...updateBrandDto };
        return brandBD;
      }
      return brand;
    });

    return { msg: `Brand Update`, brand: brandBD };
  }

  remove(id: string) {
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return `This action removes a #${id} brand`;
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }
}
