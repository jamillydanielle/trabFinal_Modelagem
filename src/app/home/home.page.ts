import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../domain/entities/city.model';
import { SearchCityService } from '../domain/services/search-city.service';

// import { Cidade } from "src/app/models/cidade";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // ** Recupera as pesquisas realizadas

  errorMessage = null;
  cities: City[] = [];
  keys: string[] = Object.keys(localStorage);


  constructor(
    private readonly cityService: SearchCityService,
    private readonly router: Router
  ) { }

  async onSearch(query: string) {
    try {
      this.errorMessage = null;
      this.cities = await this.cityService.searchByName(query)
    } catch (error) {
      this.errorMessage = error.message
    }
  }


  async onSelect(city: City) {
    // ** Salva o objeto  no localStorage
    localStorage.setItem(''+ city.id + ' ' + city.name +  ' - ' + city.state, JSON.stringify({id: city.id, cidade: city.name, estado: city.state}));
    // localStorage.setItem(''+ city.id , JSON.stringify({id: city.id, cidade: city.name, estado: city.state}));

    await this.router.navigateByUrl(`/weather/${city.id}`, { replaceUrl: true })

  }
  
}
