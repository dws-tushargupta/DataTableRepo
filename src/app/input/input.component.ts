import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],

})
export class InputComponent implements OnInit {
  public pid: number;
  public s_id: number;
  public date_from: number;
  public date_to: number;
  public skip: any
  public collectedData: any[]

  constructor(private dataService: DataService) { 
    this.pid=  15103; // default values
    this.s_id= 2; //default values
    this.skip = 5;
    this.collectedData = [];
  }
  ngOnInit() {
  }
  
  formatDate(date) {
    date = parseInt(date.year.toString()+date.month.toString()+date.day.toString())
    return date;
  }

  onFormSubmit() {
    this.collectedData = [];
    let total_data={
      pid: this.pid,
      s_id : this.s_id,
      date_from :  this.formatDate(this.date_from), 
      date_to : this.formatDate(this.date_to),
      skip: this.skip
    }

    // Calling Data Service
    this.dataService.submitKey(total_data).subscribe((data) => {

      let returnedData = data.data.result;
      for(let i=0; i<returnedData.length ; i++){
        this.collectedData.push( {
          rank: returnedData[i].show[0].rank,
          r_url: decodeURIComponent(returnedData[i].show[0].r_url),
          kw: decodeURIComponent(returnedData[i].show[0].kw),
          diff: returnedData[i].show[0].diff,
          dirc: returnedData[i].show[0].dirc
        })
      }      
    })
 }  //onFormSubmit() ends
}
