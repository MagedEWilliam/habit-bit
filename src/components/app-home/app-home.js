import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {

  router = document.querySelector('ion-router')

  toggleReorder() {
    const reorderGroup = document.getElementById('reorder');
    reorderGroup.disabled = !reorderGroup.disabled;
    reorderGroup.addEventListener('ionItemReorder', ({ detail }) => {
      detail.complete(true);
    });
  }

  viewNewHabit(){
    this.router.push('/new-habit/', 'forward')
  }


  render() {
    return [
      <ion-header>
        <ion-toolbar>

        </ion-toolbar>
        <ion-toolbar>
          <ion-title size="large">My Daily habits</ion-title>
          <ion-buttons slot="primary">
            <ion-button onClick={this.toggleReorder}>Reorder</ion-button>
          </ion-buttons>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar></ion-searchbar>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button class="fab-with-label" color="warning">
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
            <ion-fab-button color="light" onClick={()=> this.viewNewHabit()} >
              <ion-icon name="add"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>


        <ion-list>
          <ion-reorder-group id="reorder">
            <ion-reorder>
              <ion-item>
                <ion-badge slot="start" color="danger">11</ion-badge>
                <ion-label>
                  Item 8
              </ion-label>
                <ion-select slot="end" interface="popover">
                  <ion-select-option value="Edit">Edit</ion-select-option>
                  <ion-select-option value="Delete">Delete</ion-select-option>
                  <ion-select-option value="close">close</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-reorder>

            <ion-reorder>
              <ion-item>
                <ion-badge slot="start" color="primary">11</ion-badge>
                <ion-label>
                  Item 9
              </ion-label>
                <ion-select slot="end" interface="popover">
                  <ion-select-option value="Edit">Edit</ion-select-option>
                  <ion-select-option value="Delete">Delete</ion-select-option>
                  <ion-select-option value="close">close</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-reorder>

            <ion-reorder>
              <ion-item>
                <ion-badge slot="start" color="warning">11</ion-badge>
                <ion-label>
                  Item 10
              </ion-label>
                <ion-select slot="end" interface="popover">
                  <ion-select-option value="Edit">Edit</ion-select-option>
                  <ion-select-option value="Delete">Delete</ion-select-option>
                  <ion-select-option value="close">close</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-reorder>
          </ion-reorder-group>
        </ion-list>
      </ion-content>,
    ];
  }
}
