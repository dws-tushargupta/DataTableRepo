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
  public skip: any;
  public collectedData: any[];
  public noData: boolean;
  public showspinner: boolean;
  public dtOptions: any;

  constructor(private dataService: DataService) { 
    this.pid=  15103; // default values
    this.s_id= 2; //default values
    this.skip = 0;
    this.collectedData = [];
    this.noData = false;
    this.showspinner = false;
  }
  ngOnInit() {
    this.dtOptions = {
      "paging": false,
      "filter": false,
      "info": false,
      "oLanguage": {"sZeroRecords": "", "sEmptyTable": ""}
    };
  }
  
  formatDate(date) {
    let dateObject = new Date(date.year, date.month, date.day);
    let dd = dateObject.getDate();
    let mm = dateObject.getMonth();
    let yyyy = dateObject.getFullYear();
    
    function pad(n) {  //for trailing zeros
      return n<10 ? '0'+n : n;
    }
    let formattedDate = '' + yyyy + pad(mm) + pad(dd);
    return(formattedDate)
  }


  onFormSubmit( skip ) {
    this.collectedData = [];

    this.showspinner = true;
    let total_data={
      pid: this.pid,
      s_id : this.s_id,
      date_from : this.formatDate(this.date_from), 
      date_to : this.formatDate(this.date_to),
      skip: skip
    }

    // Calling Data Service
    this.dataService.submitKey(total_data).subscribe((data) => {

      if(data.data.error == 0 ){
        this.showspinner = false;
        let returnedData = data.data.result;
        if(returnedData.length != 0) {
          for(let i=0; i<returnedData.length ; i++){
            this.collectedData.push( {
              rank: returnedData[i].show[0].rank,
              r_url: decodeURIComponent(returnedData[i].show[0].r_url),
              kw: decodeURIComponent(returnedData[i].show[0].kw),
              diff: returnedData[i].show[0].diff,
              dirc: returnedData[i].show[0].dirc
            })
          }
        } else {
          this.noData = true;
        }
      }
    })
 }  //onFormSubmit() ends

 onPageChange(type) {
   if (type == "up") {
     this.skip = this.skip + 10;
     this.onFormSubmit(this.skip);
   }
   if (type == "down") {
     this.skip = this.skip - 10;
     this.noData = false;
    this.onFormSubmit(this.skip);
  }
 }

}
