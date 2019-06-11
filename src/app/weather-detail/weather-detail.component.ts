import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';


@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css']
})
export class WeatherDetailComponent implements OnInit {
 city: string;
 cityWeather: any;
 
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) { }

  ngOnInit() {
    this.city = this.route.snapshot.paramMap.get('city');

    
    const httpOptions = {
      headers: new HttpHeaders({
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': 'd21cd90114msh085a8122c34d08cp1622cdjsn4e776c2ad067'
      }),
      responseType: 'text' as 'json'
    };
    this.http.get("https://community-open-weather-map.p.rapidapi.com/weather?callback=test&id=2172797&units=%22metric%22+or+%22imperial%22&mode=xml%2C+html&q=" + this.city + ",pk", httpOptions)
    .subscribe((response: any)=>{
      this.cityWeather = response.substring(5);
      this.cityWeather = this.cityWeather.substring(0, this.cityWeather.length - 1)
      this.cityWeather = JSON.parse (this.cityWeather);
      console.log(this.cityWeather);
    });

    
  }
  goBack(): void {
    this.location.back();
  }

}
