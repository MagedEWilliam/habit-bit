import { Component, h } from '@stencil/core';

@Component({
  tag: 'edit-habit',
  styleUrl: 'edit-habit.css',
})
export class EditHabit {

  router = document.querySelector('ion-router')

  viewHome(){
    this.router.push('/', 'backward')
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
        </ion-toolbar>
        <ion-toolbar>
        </ion-toolbar>
        <ion-toolbar>
          <ion-title size="large">Edit habits</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-item>
          <ion-label>Habit name</ion-label>
          <ion-input placeholder="Drinking water..."></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Color</ion-label>
          <input id="color" type="color" value="#0CC5FD"></input>
        </ion-item>
        
       <color-picker class="ion-padding" target="color"/>

        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button color="light">
            <ion-icon name="checkmark-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        <ion-fab vertical="bottom" horizontal="start" slot="fixed">
          <ion-fab-button color="light" onClick={()=> this.viewHome()}>
            <ion-icon name="close-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>
        
      </ion-content>,
    ];
  }
}
