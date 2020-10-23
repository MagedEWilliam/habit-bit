import { Component, Prop, Element, State, h } from '@stencil/core';
import { alertController, toastController } from '@ionic/core';
import moment from 'moment';

import state from '../store/store';

@Component({
  tag: 'check-in',
  styleUrl: 'check-in.css',
})
export class CheckIn {

  @Element() comp;
  panzoom;
  @State() habits = () => [...state.habits];
  @Prop() habitId;
  @Prop() zoom = true;
  @Prop() getCurrentHabit = state.habits.filter(h => h.id.toString() == this.habitId.toString())[0]

  router = document.querySelector('ion-router')

  zoomniginOrout() {
    this.zoom = !this.zoom;
    if (this.zoom) {
      this.panzoom.style.transform = 'scale(1.15) translateY(60px)';

      this.comp.querySelector('year-calendar').classList.add('zoomin');
      setTimeout(()=>{
        this.comp.querySelector('year-calendar .selected').scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
      },300)
    } else {
      this.panzoom.style.transform = 'scale(0.8) translateY(-70px)';

      setTimeout(()=>{
        this.comp.querySelector('year-calendar svg').scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
      },300)
      this.comp.querySelector('year-calendar').classList.remove('zoomin');
    }
  }

  zoomnigin() {
    this.zoom = true;
    this.panzoom.style.transform = 'scale(1.15) translateY(60px)';
    setTimeout(()=>{
      this.comp.querySelector('year-calendar .selected').scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
    },300)
    this.comp.querySelector('year-calendar').classList.add('zoomin');
  }

  nextHabit() {


    let next = 0;
    state.habits.filter((h, index) => {
      if (h.id == this.habitId) {
        if (state.habits[index + 1]) {
          next = index + 1;
        }
        return h
      }
    })

    const nexturl = next >= state.habits.length - 1 ? "/" : "/check-in/" + state.habits[next].id + '/';

    return (
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button href={nexturl} class="fab-with-label-next" color="warning">
          Next
        <ion-icon name="chevron-forward-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab>);
  }

  loadYearCal() {
    return (
      <year-calendar
        onClick={this.zoomnigin.bind(this)}
        zoom={this.zoom}
        habitId={this.habitId}
        getCurrentHabitColor={this.getCurrentHabit.color}></year-calendar>
    )
  }

  routeChanged() {
    
    if (this.habitId) {
      this.getCurrentHabit = state.habits.filter(h => h.id.toString() == this.habitId.toString())[0]
    }
    state.checkinByHabit = { ...state.checkinByHabit }
    this.zoom = false;
  }

  getDay(year, date) {
    if (state.checkinByHabit.hasOwnProperty(this.habitId)) {
      if (state.checkinByHabit[this.habitId].hasOwnProperty(year)) {
        return state.checkinByHabit[this.habitId][year].filter(y => y == date)[0]
      }
    }
    return date;
  }

  addDay(year, date) {
    if (this.getDay(year, date) != date) {
      state.checkinByHabit[this.habitId][year] = [...state.checkinByHabit[this.habitId][year], date]
    }

    state.checkinByHabit = { ...state.checkinByHabit }
  }

  delDay(year, date) {
    if (this.getDay(year, date) == date) {
      state.checkinByHabit[this.habitId][year] = state.checkinByHabit[this.habitId][year].filter(y => y != date)
    }
    state.checkinByHabit = { ...state.checkinByHabit }
  }

  async presentToastWithOptions(e, fn, msg, wait) {
    const toast = await toastController.create({

      message: msg,
      position: 'bottom',
      duration: wait,
      buttons: [
        {
          side: 'start',
          text: 'Yes',
          handler: fn
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present()
  }

  componentDidLoad() {

    document.querySelectorAll('ion-toast').forEach(toast=> toast.dismiss())

    this.panzoom = this.comp.querySelector('year-calendar svg')

    this.router.addEventListener('ionRouteDidChange', this.routeChanged);
    const today = moment().format('YYYY-M-D');

    this.comp.querySelectorAll('.day').forEach(g => {
      const rect = g.querySelector('rect');

      const year = g.getAttribute('year');
      const currentDate = `${year}-${g.getAttribute('month')}-${g.getAttribute('day')}`;

      if (this.getDay(year, currentDate) == currentDate) {
        g.classList.add('highlighted');
        rect.style.fill = this.getCurrentHabit.color;
      }

      const markTheDay = e => {
        if (this.zoom) {
          if (g.classList.contains('highlighted')) {
            this.delDay(year, currentDate);
            g.classList.remove('highlighted');
            rect.style.fill = '#CECECE';
          } else {
            this.addDay(year, currentDate);
            g.classList.add('highlighted');
            rect.style.fill = this.getCurrentHabit.color;
          }
        }
      }

      const uSureMarkTheDay = (e, msg, wait) => {
        if (this.zoom) {
          this.presentToastWithOptions(e, markTheDay.bind(this), msg, wait);
        }
      }
      
      if (currentDate == today) {
        g.classList.add('selected');
        g.addEventListener('click', markTheDay)
        if(!g.classList.contains('highlighted')){
          uSureMarkTheDay(g, 'Mark today?', 5000)
        }
      }else{
        g.addEventListener('click', (ev)=>uSureMarkTheDay(ev, 'You sure to mark '+currentDate+'?', 2500))
      }

    });

    this.panzoom.style.transform = 'scale(1.15) translateY(60px)';
    setTimeout(()=>{
      this.comp.querySelector('year-calendar .selected').scrollIntoView({behavior: 'smooth', block: "center", inline: "center"});
    },500)
    this.comp.querySelector('year-calendar').classList.add('zoomin');
  }

  gotoFirstHabit = () => state.habits.length > 0 ? '/check-in/' + state.habits[0].id : '/tutorial/';

  async presentAlertConfirm() {
    const habitName = this.habits().filter(h => h.id == this.habitId)[0]
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
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.habits = () => [...state.habits.filter(h => h.id != this.habitId)];
            // commit to the state
            state.habits = this.habits();
            this.router.push(this.gotoFirstHabit())
          }
        }
      ]
    });

    await alert.present();
  }

  render() {
    return [
      <ion-content>
        <ion-grid class="ion-no-padding">
          <ion-row>
            {this.loadYearCal()}
            <br/>
            <br/>
            <br/>
            <br/>
          </ion-row>

        </ion-grid>


        <ion-fab vertical="bottom" horizontal="start" slot="fixed">
          <ion-fab-button size="small" onClick={this.zoomniginOrout.bind(this)} color="light">
            {this.zoom ? <ion-icon name="remove-circle-outline"></ion-icon> :
              <ion-icon name="add-circle-outline"></ion-icon>}
          </ion-fab-button>
        </ion-fab>

        <ion-fab horizontal="end" vertical="bottom" slot="fixed">
          <ion-fab-button color="light">
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="top">

            <ion-fab-button color="light" onClick={this.presentAlertConfirm.bind(this)}>
              <ion-icon name="trash-bin"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="light" href={'/edit-habit/' + this.habitId}>
              <ion-icon name="create"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="light" href={'/new-habit/' + this.habitId}>
              <ion-icon name="add"></ion-icon>
            </ion-fab-button>

          </ion-fab-list>

          <ion-fab-list side="start">

            <ion-fab-button color="light">
              <ion-icon name="share-social"></ion-icon>
            </ion-fab-button>

            <ion-fab-button color="light">
              <ion-icon name="download"></ion-icon>
            </ion-fab-button>
            <ion-fab-button href="/tutorial/" color="light">
              <ion-icon name="help-circle-outline"></ion-icon>
            </ion-fab-button>

          </ion-fab-list>
        </ion-fab>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

      </ion-content>,
    ];
  }

  disconnectedCallback() {
    this.router.removeEventListener('ionRouteDidChange', this.routeChanged)
    
  }
}
