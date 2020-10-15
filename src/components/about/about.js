import { Component, h } from '@stencil/core';

@Component({
  tag: 'about-page',
  styleUrl: 'about.css',
})
export class About {

  router = document.querySelector('ion-router')

  viewHome() {
    this.router.push('/', 'backward')
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-title>About</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-card>
          <img src="/assets/a0c46248-b1d5-4a80-bcd4-8def270a1fda.gif" />
          <ion-card-header>
          </ion-card-header>
          <ion-card-content>
            Want one?
          <br />
            <br />
            <ion-button color="light" href="https://www.simonegiertz.com/every-day-calendar">
              <p>Check it out</p>
            </ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <img src="/assets/118549043_2011659842298798_5545103259183867879_n.jpg" />
          <ion-card-header>
          </ion-card-header>
          <ion-card-content>
            This project is inspired by <a href="https://www.kickstarter.com/projects/simonegiertz/the-every-day-calendar">this project</a> by Simon Giertz.
          <br />
            <br />
            <ion-button color="light" href="https://www.instagram.com/p/CEkKK4eh3MR/">
              <ion-icon slot="start" name="logo-instagram"></ion-icon>
              <p slot="end">@simonegiertz</p>
            </ion-button>
          </ion-card-content>
        </ion-card>
      </ion-content>,
    ];
  }
}
