import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bidForm, bidType } from '../types/bidsType';

@Injectable({
  providedIn: 'root',
})
export class BidService {
  private apiUrl = 'http://localhost:3000/bids';

  constructor(private http: HttpClient) {}

  // Get bids
  getBids(): Observable<bidType[]> {
    return this.http.get<bidType[]>(this.apiUrl);
  }
  // Create bid
  createBid(bidData: bidForm): Observable<bidType> {
    return this.http.post<bidType>(this.apiUrl, bidData);
  }

  // Create bid
  updateBid(id: string, isWinBid: boolean) {
    return this.http.put(`${this.apiUrl}/${id}`, { isWinBid });
  }
}
