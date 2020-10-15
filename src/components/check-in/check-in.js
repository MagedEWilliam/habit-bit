import { Component, h } from '@stencil/core';

@Component({
  tag: 'check-in',
  styleUrl: 'check-in.css',
})
export class CheckIn {

  router = document.querySelector('ion-router')

  viewHome() {
    this.router.push('/', 'backward')
  }

  render() {
    return [
      <ion-content>
        <ion-grid>
          <ion-row>
            <year-calendar></year-calendar>
          </ion-row>

          <ion-row>
            <ion-col size="1">
            </ion-col>
            <ion-col class="ion-text-center">
              <p>Did you {} today?</p>
              <ion-button color="light">Yes</ion-button>
              <ion-button color="dark">No</ion-button>
            </ion-col>
            <ion-col size="1">
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col size="1">
            </ion-col>
            <ion-col class="ion-text-center">
              <ion-datetime value="2019-10-01T15:43:40.394Z" display-timezone="utc"></ion-datetime>
            </ion-col>
            <ion-col size="1">
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-fab vertical="bottom" horizontal="start" slot="fixed">
          <ion-fab-button href="/" color="light">
            <ion-icon name="home-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button href="/check-in/" color="light">
            <ion-icon name="share-social-outline"></ion-icon>
          </ion-fab-button>
        </ion-fab>

      </ion-content>,
    ];
  }
}
