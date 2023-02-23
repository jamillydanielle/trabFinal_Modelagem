import { City } from "../entities/city.model";
import { CityNotFoundError } from "../errors/city-not-found.error";
import { CityRepository } from "./protocols/city-repository";

export class SearchCityService {


    constructor(private readonly repo: CityRepository) {}

    async searchByName(name: string): Promise<City[]> {
        if (!name || name.trim().length < 3) {
            return [];
        }

        const allCities = await this.repo.getAll();

        const filteredCities = allCities.filter(
            (city: City) => city.name.toLowerCase().indexOf(name.toLowerCase()) > -1
        );

        if (filteredCities.length == 0) {
            throw new CityNotFoundError();
        }

        return filteredCities;
    }

    async searchById(id: number): Promise<City> {
        const city = this.repo.getById(id);

        if (!city) {
            throw new CityNotFoundError();
        }

        return city;
    }
}