import { Component, h, Element } from '@stencil/core';
import state from '../store/store.js';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {

  gotoFirstHabit = ()=> state.habits.length > 0 ? '/check-in/'+state.habits[0].id : '/tutorial/';
  
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>

          <ion-route url="/" component="app-home"/>
          <ion-route url="/new-habit/" component="new-habit" />
          <ion-route url="/edit-habit/:habitId" component="edit-habit" />
          <ion-route url="/tutorial/" component="app-tut" />

          <ion-route component="app-tabs">
            <ion-route url="/home" component="tab-home">
              <ion-route component="app-home" />
            </ion-route>

            <ion-route url="/check-in" component="tab-profile">
              <ion-route url="/:habitId" component="check-in" />
            </ion-route>
          </ion-route>

        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
