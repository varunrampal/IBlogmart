import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/_services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private route: ActivatedRoute, private locationService: LocationService) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.locationService.categoriesEmitted.emit(data.categories);
      });
  }
}
