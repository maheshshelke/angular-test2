import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Poll } from './poll.interface';
@Injectable({
  providedIn: 'root',
})
export class PollService {
    private API_URL = "https://hn.algolia.com/api/v1/search_by_date?tags=story";
  constructor(private http: HttpClient) { }

  getPollData(){
      return this.http.get<Poll>(this.API_URL);
  }

}