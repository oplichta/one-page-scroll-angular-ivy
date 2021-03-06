import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription, Observable } from 'rxjs';
import { Router, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private scrollEventSubscription: Subscription;
  private touchStartEventSubscription: Subscription;
  private touchEndEventSubscription: Subscription;
  public length = 0;
  public touchStartObj = {
    swdir: '',
    sX: null,
    sY: null,
    stT: new Date().getTime(),
  };

  constructor() {
    this.subscribeToScrollEvent();
  }
  ngOnInit() {
    this.scrollToPanel('one');
  }

  ngOnDestroy() {
    if (this.touchStartEventSubscription) {
      this.touchStartEventSubscription.unsubscribe();
    }
    if (this.scrollEventSubscription) {
      this.scrollEventSubscription.unsubscribe();
    }
    if (this.touchEndEventSubscription) {
      this.touchEndEventSubscription.unsubscribe();
    }
  }

  public dotActive(id: string) {
    if (id === 'one' && this.length === 0) {
      return 'active';
    } else if (id === 'two' && this.length === -100) {
      return 'active';
    } else if (id === 'three' && this.length === -200) {
      return 'active';
    } else if (id === 'four' && this.length === -300) {
      return 'active';
    } else {
      return 'inactive';
    }
  }

  public scrollToPanel(id: string) {
    const panelsObj = {
      one: 0,
      two: -100,
      three: -200,
      four: -300,
    };

    this.length = panelsObj[id];
  }

  private subscribeToScrollEvent() {
    let hold = false;

    this.touchStartEventSubscription = fromEvent(
      document,
      'touchstart'
    ).subscribe((e: any) => {
      const tchs = e.changedTouches[0];
      this.touchStartObj = {
        swdir: 'none',
        sX: tchs.pageX,
        sY: tchs.pageY,
        stT: new Date().getTime(),
      };
    });

    this.touchEndEventSubscription = fromEvent(document, 'touchend').subscribe(
      (e: any) => {
        const step = 100;
        // min distance traveled to be considered as a swipe
        const threshold = 100;
        // max distance allowed at the same time in perpendicular direction
        const slack = 50;
        // max time allowed to travel that distance
        const alT = 500;
        let swdir = '';
        const tchs = e.changedTouches[0];
        const touchEndObj = {
          dX: tchs.pageX - this.touchStartObj.sX,
          dY: tchs.pageY - this.touchStartObj.sY,
          elT: new Date().getTime() - this.touchStartObj.stT,
        };

        if (touchEndObj.elT <= alT) {
          if (
            Math.abs(touchEndObj.dX) >= threshold &&
            Math.abs(touchEndObj.dY) <= slack
          ) {
            swdir = touchEndObj.dX < 0 ? 'left' : 'right';
          } else if (
            Math.abs(touchEndObj.dY) >= threshold &&
            Math.abs(touchEndObj.dX) <= slack
          ) {
            swdir = touchEndObj.dY < 0 ? 'up' : 'down';
          }
          if (swdir === 'up' && this.length > -300) {
            this.length -= step;
          } else if (swdir === 'down' && this.length < 0) {
            this.length += step;
          } else {
            this.scrollToPanel('one');
          }
        }
      }
    );

    this.scrollEventSubscription = fromEvent(document, 'wheel').subscribe(
      (e: any) => {
        if (hold === false) {
          const step = 100;

          hold = true;
          if (e.deltaY < 0 && this.length < 0) {
            this.length += step;
          } else if (e.deltaY > 0 && this.length > -300) {
            this.length -= step;
          } else {
            this.scrollToPanel('one');
          }

          setTimeout(() => {
            hold = false;
          }, 1200);
        }
      }
    );
  }
}
