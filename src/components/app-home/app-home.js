import { Component, h, State, Element } from '@stencil/core';
import { alertController } from '@ionic/core';

import moment from 'moment';
import state from '../store/store.js';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @Element() comp;

  router = document.querySelector('ion-router')
  @State() habits = () => [...state.habits];

  toggleReorder() {
    const reorderGroup = document.getElementById('reorder');
    reorderGroup.disabled = !reorderGroup.disabled;
    reorderGroup.addEventListener('ionItemReorder', ({ detail }) => {
      detail.complete(true);
    });
  }

  optionChanged(e) {
    if (e.target.value) {
      if (e.target.value.indexOf('/delete-habit/') >= 0) {
        this.presentAlertConfirm(e.target.value.replace('/delete-habit/', ''))
      } else {
        this.router.push(e.target.value)
      }
    }
    e.target.value = undefined;
  }

  async presentAlertConfirm(ID) {
    const habitName = this.habits().filter(h => h.id == ID)[0]
    const alert = await alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: `Delete Habit <strong>${habitName ? habitName.name : ''}</strong>!!!`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.habits = this.habits().filter(h => h.id != ID)
            // commit to the state
            state.habits = this.habits();
          }
        }
      ]
    });

    await alert.present();
  }

  _habits() {

    return this.habits().map(_ => {
      let dailyCount = state.checkinByHabit[_.id.toString()] ? state.checkinByHabit[_.id.toString()][moment().format('YYYY').toString()].length : 0;

      const url = `/check-in/${_.id}`;
      return (
        <div class="ion-row">
        <ion-item button href={url} >
          <ion-badge slot="start" style={{ background: _.color }} color="primary">{dailyCount}</ion-badge>
          <ion-label >
            {_.name}
          </ion-label>
        </ion-item>
          <ion-select slot="end" interface="popover" onIonChange={this.optionChanged.bind(this)}>
            <ion-select-option value={`/check-in/${_.id}`}>View</ion-select-option>
            <ion-select-option value={`/edit-habit/${_.id}`}>Edit</ion-select-option>
            <ion-select-option value={`/delete-habit/${_.id}`}>Delete</ion-select-option>
            <ion-select-option class="ion-no-border" style={{'border': 'none'}} value={`/`}>close</ion-select-option>
          </ion-select>
          </div>
      )
    })
  }

  checkin() {
    const checkURL = `/check-in/${state.habits[0].id}`;

    return (
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button href={checkURL} class="fab-with-label" color="warning">
          <p class="ion-padding-end">Check in</p>
          <ion-icon name="caret-forward-circle-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    )
  }

  routeChanged() {
    this.habits = () => [...state.habits];
    state.checkinByHabit = { ...state.checkinByHabit }
  }

  componentDidLoad() {
    this.router.addEventListener('ionRouteDidChange', this.routeChanged);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>

        </ion-toolbar>
        <ion-toolbar>
          <ion-title size="large">My Daily habits</ion-title>
          <ion-buttons slot="primary">
            <ion-button onClick={this.toggleReorder}></ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        {this.checkin()}

        <ion-fab horizontal="start" vertical="bottom" slot="fixed">
          <ion-fab-button color="light">
            <ion-icon name="chevron-up-outline"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="top">
            <ion-fab-button color="light">
              <ion-icon name="download-outline"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="light" href="/about/">
              <ion-icon name="help-circle-outline" ></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="light" href="/new-habit/" >
              <ion-icon name="add"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>

        <ion-list>
            {...this._habits()}
        </ion-list>
      </ion-content>,
    ];
  }

  disconnectedCallback() {
    this.router.removeEventListener('ionRouteDidChange', this.routeChanged)
  }
}
