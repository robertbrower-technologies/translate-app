import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export class Totals {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  elapsedTime: number = 31626061001;

  constructor(private translate: TranslateService) {
    debugger;
    translate.setTranslation('en', {
      "@elapsedTime": '{{years}} {{yearUnits}} {{days}} {{dayUnits}} {{hours}} {{hourUnits}} {{minutes}} {{minuteUnits}} {{seconds}} {{secondUnits}} {{milliseconds}} {{millisecondUnits}} ago',
      "year": 'hour',
      "years": 'years',
      "day": 'day',
      "days": 'days',
      "hour": 'hour',
      "hours": 'hours',
      "minute": 'minute',
      "minutes": 'minutes',
      "second": 'second',
      "seconds": 'seconds',
      "millisecond": 'millisecond',
      "milliseconds": 'milliseconds'
    });

    translate.setTranslation('de', {
      "@elapsedTime": 'Vor {{years}} {{yearUnits}} {{days}} {{dayUnits}} {{hours}} {{hourUnits}} {{minutes}} {{minuteUnits}} {{seconds}} {{secondUnits}} {{milliseconds}} {{millisecondUnits}}',
      "year": 'Jahr',
      "years": 'Jahre',
      "day": 'Tag',
      "days": 'Tage',
      "hour": 'Stunde',
      "hours": 'Stunden',
      "minute": 'Minute',
      "minutes": 'Minuten',
      "second": 'Sekunde',
      "seconds": 'Sekunden',
      "millisecond": 'Millisekunde',
      "milliseconds": 'Millisekunden'
    });

    this.translate.setDefaultLang('en');
    this.translate.use('de');
  }

  public translateElapsedTime(elapsedTime: number): Promise<string> | null {
    let total: Totals = this.calculateTotals(elapsedTime);
    let _units: any;
    return new Promise(resolve => {
      debugger;
      this.translate.get(
        [
          total.years > 1 ? 'years' : 'year',
          total.days > 1 ? 'days' : 'day',
          total.hours > 1 ? 'hours' : 'hour',
          total.minutes > 1 ? 'minutes' : 'minute',
          total.seconds > 1 ? 'seconds' : 'second',
          total.milliseconds > 1 ? 'milliseconds' : 'millisecond'
        ]).subscribe((units: any) => {
          _units = units;
          debugger;
          return this.translate.get(
            '@elapsedTime',
            {
              years: total.years,
              yearUnits: total.years > 1 ? units.years : units.year,
              days: total.days,
              dayUnits: total.days > 1 ? units.days : units.day,
              hours: total.hours,
              hourUnits: total.hours > 1 ? units.hours : units.hour,
              minutes: total.minutes,
              minuteUnits: total.minutes > 1 ? units.minutes : units.minute,
              seconds: total.seconds,
              secondUnits: total.seconds > 1 ? units.seconds : units.second,
              milliseconds: total.milliseconds,
              millisecondUnits: total.milliseconds > 1 ? units.milliseconds : units.millisecond,
            }).subscribe((res: string) => {
              debugger;
              return resolve(res);
            });
        });
    });
  }

  private calculateTotals(elapsedTime: number): Totals {
    let years = Math.floor(elapsedTime / 31536000000);
    let yearsInMilliseconds = years * 31536000000;
    let remainingMilliseconds = elapsedTime - yearsInMilliseconds;

    let days = Math.floor(remainingMilliseconds / 86400000);
    let daysInMilliseconds = days * 86400000;
    remainingMilliseconds = remainingMilliseconds - daysInMilliseconds;

    let hours = Math.floor(remainingMilliseconds / 3600000);
    let hoursInMilliseconds = hours * 3600000;
    remainingMilliseconds = remainingMilliseconds - hoursInMilliseconds;

    let minutes = Math.floor(remainingMilliseconds / 60000);
    let minutesInMilliseconds = minutes * 60000;
    remainingMilliseconds = remainingMilliseconds - minutesInMilliseconds;

    let seconds = Math.floor(remainingMilliseconds / 1000);
    let secondsInMilliseconds = seconds * 1000;
    remainingMilliseconds = remainingMilliseconds - secondsInMilliseconds;

    return {
      years: years,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      milliseconds: remainingMilliseconds
    };
  }

}

