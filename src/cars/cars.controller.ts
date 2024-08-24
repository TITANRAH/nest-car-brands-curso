import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,

} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

// en los servicios construyo la accion en los controladores la ruta y llamo a esa accionx

@Controller('cars')
// si ubico este usespipes validator pipe digo que todos sus meetodos usaran el validador
// @UsePipes(ValidationPipe)
export class CarsController {
  // llamo a mis servicios aca
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }
  //   esto transforma anumero ParseIntPipe si o si
  //  esto ParseUUIDPipe dice que el is pasado en la url debe ser un uuid si o si por que asi esta
  //   definida ademas mi data, cada id es un uuuid
  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    console.log({ id: id });

    const car = this.carsService.findById(id);

    if (car) {
      return car;
    } else {
      return { msg: 'Car not found' };
    }
  }

  @Post()
  //   la idea de este pipe es validar que la data que recibe el post sea como la declarada en el dto
  // esto necesita de class validator
  createCar(@Body() createCarDto: CreateCarDto) {
    console.log({ body: createCarDto });

    const newCar = this.carsService.createCar(createCarDto);
    return newCar;
  }

  @Patch(':id')
  updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateCarDto) {

    return this.carsService.update(id, body);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.deleteCar(id);
  }
}
