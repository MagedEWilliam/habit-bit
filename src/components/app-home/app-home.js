import { Component, State, h, Element } from '@stencil/core';
import { alertController, toastController, popoverController } from '@ionic/core';
import moment from 'moment';
import state from '../store/store';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @Element() comp;

  suggest = () => false;
  @State() zoom = () => false;
  @State() year = () => moment().format('YYYY');
  @State() date = year => moment(year).format('YYYY-MM-DDTHH:mm:0ss.DZ');
  @State() habitsTabs = () =>
    state.habits.map(habit => (
      <ion-tab-button habitColor={habit.color} habitid={habit.id} onClick={e => {this.handleHabitTabChange(e);}} tab="tab-speaker" style={{ color: habit.color }}>
        <ion-icon habitColor={habit.color} habitid={habit.id} name="radio-button-on-outline"></ion-icon>
        <ion-label habitColor={habit.color} habitid={habit.id}>
          {habit.name}
        </ion-label>
      </ion-tab-button>
    ));
  _habitid = () => false;
  popover;

  invertHex(hex) {
    return '#' + (Number(`0x1${hex.replace('#', '')}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();
  }


  async dismissPopover(){
    this.popover.dismiss()
  }

  async presentNewHabitPopover(ev) {
    this.popover = await popoverController.create({
      component: 'new-habit',
      cssClass: 'popover',
      componentProps: {dismiss: this.dismissPopover.bind(this)}
    });
    return await this.popover.present();
  }

  async presentEditHabitPopover(ev) {
    this.popover = await popoverController.create({
      component: 'edit-habit',
      cssClass: 'popover',
      componentProps: {dismiss: this.dismissPopover.bind(this), habitId: this._habitid()}
    });
    return await this.popover.present();
  }

  deleteHabitPrompt(){
    const del = confirm(`Delete ${state.habits.filter(h => h.id != this._habitid())[0].name }`);
    if(del){
      state.habits = [...state.habits.filter(h => h.id != this._habitid())]
      window.history.pushState({}, '', window.location.origin)
      location.reload();
    }
  }

  handleHabitTabChange(e) {
    this.updateCalendar(e);
    const parms = new URLSearchParams(window.location.search);

    parms.set('habitid', this._habitid());
    window.history.pushState({}, '', window.location.origin + '?' + parms);
    
    this.comp.querySelectorAll(`ion-tab-button`).forEach(tab=>{
      tab.style.filter = 'grayscale(100%) brightness(10) opacity(0.5)';
    })
    this.comp.querySelector(`ion-tab-button[habitid="${this._habitid()}"]`).style.filter = 'grayscale(0%) brightness(1) opacity(1)';
    this.shouldSuggest()
  }

  updateCalendar(e) {
    const habitid = e.target.getAttribute('habitid');
    this._habitid = ()=> habitid;
    
    const habitColor = e.target.getAttribute('habitColor');
    const root = document.querySelector(':root');
    root.style.setProperty('--highlighted-color', habitColor);
    root.style.setProperty('--highlighted-text-color', this.invertHex(habitColor));

    if (this._habitid()) {
      this.updateYearHiglight(this._habitid());

      e.target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }

  updateYearHiglight(habitid) {
    const year = this.year();

    if (this.comp.querySelectorAll('year-calendar .highlighted').length > 0) {
      this.comp.querySelectorAll('year-calendar .highlighted').forEach(element => {
        element.classList.remove('highlighted');
      });
    }

    if (state.checkinByHabit.hasOwnProperty(habitid)) {
      if (state.checkinByHabit[habitid].hasOwnProperty(year)) {
        state.checkinByHabit[habitid][year].map(habit => {
          if (this.comp.querySelector(`year-calendar .date-${habit}`) != null) {
            this.comp.querySelector(`year-calendar .date-${habit}`).classList.add('highlighted');
          }
        });
      }
    }
  }

  shouldSuggest() {
    if(this.comp.querySelector('year-calendar .selected.highlighted')){
      this.comp.querySelector('.suggest').classList.remove('show')
      this.comp.querySelector('.suggest').classList.add('hide')
    } else {
      this.comp.querySelector('.suggest').classList.remove('hide')
      this.comp.querySelector('.suggest').classList.add('show')
    }

  }

  changeYear(e) {
    this.date = () => e.target.value;

    this.year = () => moment(e.target.value).format('YYYY');

    this.comp.querySelector('year-calendar').displayDate = this.date(this.year());

    setTimeout(
      () => {
        if (this.comp.querySelector(`ion-tab-button[habitid="${this_habitid}"]`)) {
          this.comp.querySelector(`ion-tab-button[habitid="${this_habitid}"]`).click();
        }
      },
      10,
      this._habitid(),
    );
  }

  zoomniginOrout() {
    const newZoom = !this.zoom();
    this.comp.querySelector('year-calendar').zoom = newZoom;
    this.zoom = () => newZoom;
  }

  openShareDialog() {
    this.comp.querySelector('#share').click();
  }

  openCalendarDialog() {
    this.comp.querySelector('ion-datetime').click();
  }

  changeDayData(day, year, _habitid) {
    const checkYear = moment(day, 'YYYY-M-D').format('YYYY');
    const thisYear = year;

    if (checkYear == thisYear) {
      if (!state.checkinByHabit.hasOwnProperty(_habitid)) {
        state.checkinByHabit[_habitid] = {};
      }
      if (!state.checkinByHabit[_habitid].hasOwnProperty(thisYear)) {
        state.checkinByHabit[_habitid][thisYear] = [];
      }

      const blah = state.checkinByHabit[_habitid][thisYear].filter(h => h != day);

      if (blah.length != state.checkinByHabit[_habitid][thisYear].length) {
        state.checkinByHabit[_habitid][thisYear] = blah;
      } else {
        state.checkinByHabit[_habitid][thisYear].push(day);
      }

      state.checkinByHabit = { ...state.checkinByHabit };
    }

    setTimeout(
      this_habitid => {
        if (this.comp.querySelector(`ion-tab-button[habitid="${this_habitid}"]`)) {
          this.comp.querySelector(`ion-tab-button[habitid="${this_habitid}"]`).click();
        }
      },
      10,
      this._habitid(),
    );
  }

  async changeDay(day) {
    if (day == this.comp.querySelector('year-calendar .selected').getAttribute('date')) {
      this.changeDayData(day, this.year(), this._habitid());
    } else {
      const toast = await toastController.create({
        message: 'Change the day?',
        position: 'bottom',
        duration: 2000,
        buttons: [
          {
            side: 'start',
            text: 'Yes',
            handler: () => this.changeDayData(day, this.year(), this._habitid()),
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      });
      toast.present();
    }
  }
  
  componentDidRender() {

    const parms = new URLSearchParams(window.location.search);
    setTimeout(()=>{
      if (parms.has('habitid')) {
        this.handleHabitTabChange({target: this.comp.querySelector(`ion-tab-button[habitid="${parms.get('habitid')}"]`)})
      }else{
        this.handleHabitTabChange({target: this.comp.querySelector(`ion-tab-button`)})
      }
    }, 1, this)

    if (this._habitid()) {
      this.updateYearHiglight(this._habitid());
    }

    const currentDay = moment().format('YYYY-M-D');
    if (this.comp.querySelector(`year-calendar .date-${currentDay}`) != null) {
      this.comp.querySelector(`year-calendar .date-${currentDay}`).classList.add('selected');
    }

    setTimeout(
      () => {
        this.comp.querySelector('year-calendar .selected').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      },
      400,
      this,
    );
  }


  toggleSuggest(val) {
    this.suggest = () => val;
  }

  render() {
    return [
      <ion-content>
        <ion-grid class="ion-no-padding">
          <ion-row>
            <year-calendar change={this.changeDay.bind(this)} value={this.year()}></year-calendar>

            <div class='suggest'>
              <ion-chip color="dark">
                <ion-label onClick={() => this.changeDay(this.comp.querySelector('year-calendar .selected').getAttribute('date'))}>Mark today?</ion-label>
                <ion-icon onClick={ev => this.toggleSuggest(false)} name="close-circle"></ion-icon>
              </ion-chip>
            </div>
          </ion-row>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <ion-datetime class="hideme" value={this.date(this.year())} displayFormat="YYYY" onIonChange={e => this.changeYear(e)}></ion-datetime>

          <comp-share habit_Id={()=> this._habitid()}/>
        </ion-grid>

        <ion-fab class="more-options" horizontal="end" vertical="bottom" slot="fixed">
          <ion-fab-button class="more-options" color="light">
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
          </ion-fab-button>

          <ion-fab-list side="top">
            <ion-fab-button color="light" onClick={(ev) => this.presentNewHabitPopover(ev)}>
              <ion-icon name="add"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="light" onClick={(ev) => this.presentEditHabitPopover(ev)}>
              <ion-icon name="create"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="light" onClick={(ev) => this.deleteHabitPrompt(ev)}>
              <ion-icon name="trash-bin"></ion-icon>
            </ion-fab-button>

            <ion-fab-button onClick={() => this.openShareDialog()} color="light">
              <ion-icon name="share-social"></ion-icon>
            </ion-fab-button>

            <ion-fab-button color="light" href="/tutorial/">
              <ion-icon name="help-circle-outline"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>

        <ion-fab vertical="bottom" horizontal="start" slot="fixed" class="side-options">

          <ion-fab-button size="small" onClick={() => this.openCalendarDialog()} color="light">
            <ion-icon name="calendar-outline"></ion-icon>
          </ion-fab-button>

          <ion-fab-button size="small" id="zoom" onClick={this.zoomniginOrout.bind(this)} color="light">
            {this.zoom() ? <ion-icon name="remove-circle-outline"></ion-icon> : <ion-icon name="add-circle-outline"></ion-icon>}
          </ion-fab-button>

        </ion-fab>
      </ion-content>,

      <div class="tab">
        <div class="tab-wrapper">{this.habitsTabs()}</div>
      </div>,
    ];
  }
}
