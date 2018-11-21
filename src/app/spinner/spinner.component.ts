import { Component, OnInit, Input } from "@angular/core";

@Component ({
  selector:"spinner",
  template:`
    <div class="spinner-wrapper">
      <div class="inner-spinner">
        <div class="spinner-img">
          <img src="assets/spn.gif" alt="">
        </div>
        <div class="loading">
          <div class="loading-bar"></div>
        </div>
        <span>{{this.message}}</span>
      </div>
    </div>
  `
})

export class SpinnerComponent implements OnInit {
  @Input() message:string
  constructor() {
  }

  ngOnInit() {

  }
}

