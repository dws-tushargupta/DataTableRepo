import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DataService {

  constructor(public http:HttpClient) { }
  public submitKey(total_data): Observable<any> {
    // return this.http.get(`https://jsonplaceholder.typicode.com/comments?postId=1`)
  return this.http.get(`http://clusterrank.rankwatch.com/getRankings?pid=${total_data.pid}&s_id=${total_data.s_id}&date_from=${total_data.date_from}&date_to=${total_data.date_to}&skip=${total_data.skip}`)
  // return this.http.get('http://clusterrank.rankwatch.com/getRankings?pid=15103&s_id=1.00038&date_to=20181111&date_from=20181109&skip=10');  
  //return this.http.get(`http://clusterrank.rankwatch.com/getRankings/`)
  
}
}
