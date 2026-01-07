import { Component } from '@angular/core';
import { switchMap, interval, scan, startWith } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { CommonModule, DatePipe } from '@angular/common';

interface Reminder {
  text: string;
  time: string;
  expired: boolean;
}
@Component({
  selector: 'app-reminder',
  imports: [DatePipe,CommonModule],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss'
})
export class ReminderComponent {
 reminders: Reminder[] = [];
  timeSpeed$ = new BehaviorSubject<number>(1000); // normal time (1s)

  currentTime$ = this.timeSpeed$.pipe(
    switchMap(speed => interval(speed)),
    scan((time) => new Date(time.getTime() + 60000), new Date()), // add 1 min each tick
    startWith(new Date())
  );

  currentTime!: Date;

  constructor() {
    this.currentTime$.subscribe(time => {
      this.currentTime = time;
      this.checkExpired();
    });
  }

  fastForward() {
    this.timeSpeed$.next(1000);   // 1 sec = 1 min
  }

  normalSpeed() {
    this.timeSpeed$.next(60000);  // normal clock
  }

  addReminder(text: string, time: string) {
    this.reminders.push({ text, time, expired: false });
  }

  checkExpired() {
    const now = this.formatTime(this.currentTime);
    this.reminders.forEach(r => {
      if (now >= r.time) {
        r.expired = true;
      }
    });
  }

  formatTime(date: Date) {
    return date.toTimeString().substring(0, 5);
  }
}
