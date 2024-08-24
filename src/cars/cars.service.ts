import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // { id: uuid(), brand: 'Toyota', model: 'Corolla' },
  ];

  //   si no pongo que es publico es publico por defecto
  findAll() {
    return this.cars;
  }

  findById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car con id ${id} no encontrado`);

    return car;
  }

  createCar(createCarDto: CreateCarDto) {
    const newCar = { id: uuid(), ...createCarDto };

    // aqui hariamos la insersion a la base de datos

    if (newCar) {
      this.cars.push(newCar);
    }

    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    // encuentro como un let el carroque corresponde al id
    let carBD = this.findById(id);

    // si mandan el id y es distinto al id del carro que se quiere actualizar lanzar error
    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`No puedes cambiar el id del carro`);

    // recorro los carros
    this.cars = this.cars.map((car) => {
      // si el carro que encuentre el map es igual al id
      if (car.id === id) {
        // returno el carecontrado primero con la nueva data
        return (carBD = { ...car, ...updateCarDto, id });
      }

      // si no retornara car que es el carro que no se actualizo
      return car;
    });

    return carBD;
  }

  deleteCar(id: string) {
    // encuentro como un let el carroque corresponde al id
    let carBD = this.findById(id);

    if (!carBD) throw new NotFoundException(`Car con id ${id} no encontrado`);

    // filtro los carros que no sean el carro que se quiere eliminar
    this.cars = this.cars.filter((car) => car.id !== id);

    // retorno el carro que se elimino
    return { msg: `Car con id ${id} eliminado` };
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
// todos los servicios son providers
// no todos los providers son servicios
// creo el servicio aqui y lo declaro en module
