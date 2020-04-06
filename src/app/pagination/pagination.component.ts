import { Component, OnInit, Input } from '@angular/core';
import { Filter } from './../shared/object/filter';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})


export class PaginationComponent implements OnInit {
    @Input() public filter: Filter;

    constructor() { }

    ngOnInit() {
    }
}
