import { Component, h } from '@stencil/core';
import { alertController } from '@ionic/core';

import moment from 'moment';
import state from '../store/store.js';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {

  @State() habits
  @State() checkinByHabit;

  router = document.querySelector('ion-router')

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
        console.log(e.target.value)
        this.router.push(e.target.value)
      }
    }
    e.target.value = undefined;
  }

  async presentAlertConfirm(ID) {
    const habitName = state.habits.filter(h=> h.id == ID)[0]
    const alert = await alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: `Delete Habit <strong>${habitName? habitName.name: ''}</strong>!!!`,
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
            state.habits = state.habits.filter(h=> h.id != ID)
            console.log(state.habits);
          }
        }
      ]
    });

    await alert.present();
  }

  _habits() {
    return state.habits.map(_ => {
      let dailyCount = 0;
      dailyCount = state.checkinByHabit[_.id.toString()] ? state.checkinByHabit[_.id.toString()][moment().format('YYYY').toString()].length : 0;

      return (
        <ion-reorder color={_.color}>
          <ion-item>
            <ion-badge slot="start" color="primary">{dailyCount}</ion-badge>
            <ion-label>
              {_.name}
            </ion-label>
            <ion-select slot="end" interface="popover" onIonChange={this.optionChanged.bind(this)}>
              <ion-select-option value={`/check-in/${_.id}`}>View</ion-select-option>
              <ion-select-option value={`/edit-habit/${_.id}`}>Edit</ion-select-option>
              <ion-select-option value={`/delete-habit/${_.id}`}>Delete</ion-select-option>
              <ion-select-option value={`/`}>close</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-reorder>)
    })
  }

  componentDidRender() {
    document.querySelectorAll('ion-reorder').forEach(reorder => {
      reorder.querySelector('ion-badge').style.background = reorder.getAttribute('color');
    })

    function handleInput(event) {
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        items.forEach(item => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? 'block' : 'none';
        });
      });
    }

    const searchbar = document.querySelector('ion-searchbar');
    const items = Array.from(document.querySelector('ion-reorder').children);
    searchbar.addEventListener('ionInput', handleInput);
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
        <ion-toolbar>
          <ion-searchbar></ion-searchbar>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button href="/check-in/" class="fab-with-label" color="warning">
            <p class="ion-padding-end">Check in</p>
            <ion-icon name="caret-forward-circle-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

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
          <ion-reorder-group id="reorder">
            {...this._habits()}
          </ion-reorder-group>
        </ion-list>
      </ion-content>,
    ];
  }
}
