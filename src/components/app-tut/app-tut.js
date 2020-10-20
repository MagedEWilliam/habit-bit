import { Component, h, State, Element } from '@stencil/core';
import state from '../store/store.js';

@Component({
  tag: 'app-tut',
  styleUrl: 'app-tut.css',
})
export class AppTabs {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  gotoFirstHabit = ()=> state.habits.length > 0 ? '/check-in/'+state.habits[0].id : '/tutorial/';

  render() {
    return [
      <ion-content fullscreen class="ion-padding" scroll-y="false">
        <ion-slides  style={{ height: '100vh' }}>

          <ion-slide pager={true} options={this.slideOpts}>
            <div class="slide"> 
              <img src="/assets/a0c46248-b1d5-4a80-bcd4-8def270a1fda.gif"/>
              <h2>Welcome</h2>
              <p>Have you seen this project before?</p>
              <p>This app give you the same function</p>
            </div>
          </ion-slide>

          <ion-slide>
            <div class="slide">
              <img src="/assets/a0c46248-b1d5-4a80-bcd4-8def270a1fda.gif"/>
              <h2>Create a new habit</h2>
              <p>Everyday mark today on the calendar.</p>
              <p>At the end of the year you'll be able to track your habits</p>
            </div>
          </ion-slide>

          <ion-slide>
            <div class="slide">
              <img src="/assets/118549043_2011659842298798_5545103259183867879_n.jpg"/>
              <h2>Finally</h2>
              <p>This project is inspired by <a href="https://www.kickstarter.com/projects/simonegiertz/the-every-day-calendar">this project</a> by Simon Giertz.</p>
              <ion-button size="large" href="/new-habit/">Start</ion-button>
            </div>
          </ion-slide>

        </ion-slides>
      </ion-content>
    ]
  }
}