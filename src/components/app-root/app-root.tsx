import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url="/" component="app-home" />
          <ion-route url="/new-habit/" component="new-habit" />
          <ion-route url="/edit-habit/" component="edit-habit" />
          <ion-route url="/check-in/" component="check-in" />
          <ion-route url="/about/" component="about-page" />
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
