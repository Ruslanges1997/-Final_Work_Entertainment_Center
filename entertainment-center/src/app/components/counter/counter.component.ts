import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() product: any;
  @Output() changeCount = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit(): void {
    // this.product.count = 0
  }

  productCount(status: boolean): void {
    if (status) {
      this.product.count++;
    }
    else {
      if (this.product.count > 1) {
        this.product.count--;
      }
    }
    this.changeCount.emit(true);
  }
}
