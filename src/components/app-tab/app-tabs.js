import { Component, h, State, Element } from '@stencil/core';
import { alertController } from '@ionic/core';

import moment from 'moment';
import state from '../store/store.js';

@Component({
  tag: 'app-tabs'
})
export class AppTabs {

  @Element() comp;
  @State() habits = () => [...state.habits];

  router = document.querySelector('ion-router')

  invertHex(hex) {
    return '#' + (Number(`0x1${hex.replace('#', '')}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
  }

  _habits() {

    return this.habits().map(_ => {
      let dailyCount = state.checkinByHabit[_.id.toString()] ? state.checkinByHabit[_.id.toString()][moment().format('YYYY').toString()].length : 0;

      const url = `/check-in/${_.id}`;
      return (
        <ion-tab-button class={'s'+_.id} tab="tab-profile" href={url}>
          <ion-icon name="radio-button-on-outline" ></ion-icon>
          <style>
            {`
            .s${_.id} ion-icon,
            .s${_.id} ion-label{
              transition: color 300ms ease-in-out;
                color: rgba(0,0,0,0.3) !important;
            }

            .s${_.id}.__active__ ion-icon,
            .s${_.id}.__active__ ion-label{
                color: ${_.color} !important;
            }`}
          </style>
          <ion-label class="name" >{_.name}</ion-label>
        </ion-tab-button>
      )
    })
  }

  routeChanged() {
    this.habits = () => [...state.habits];
    state.checkinByHabit = { ...state.checkinByHabit }

    document.querySelectorAll('ion-tab-button').forEach(t=>{
      t.classList.remove('__active__');
      if(t.href == window.location.pathname){
        t.classList.add('__active__');
        t.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
      }
    }) 
  }

  componentDidLoad() {
    this.router.addEventListener('ionRouteDidChange', this.routeChanged);
  }

  render() {
    return [
      <ion-tabs>

        <ion-tab tab="tab-home">
          <ion-nav></ion-nav>
        </ion-tab>

        <ion-tab tab="tab-profile">
          <ion-nav />
        </ion-tab>

        <ion-tab-bar slot="bottom">
          <div class="tabbatabba">
            {...this._habits()}
          </div>
        </ion-tab-bar>

      </ion-tabs>,

    ];
  }
}