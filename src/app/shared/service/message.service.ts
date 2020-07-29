import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MessengerService {
    private messageSource: BehaviorSubject<boolean> = new BehaviorSubject(true); 
    public message = this.messageSource.asObservable();
    public buttonClicked(value: boolean) {
        this.messageSource.next(value);
    }
}