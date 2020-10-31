import { Component, State, h, Element } from '@stencil/core';
import { alertController, toastController } from '@ionic/core';
import moment from 'moment';
import state from '../store/store';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @Element() comp;

  @State() suggest = () => false;
  @State() zoom = () => false;
  @State() year = () => moment().format('YYYY');
  @State() date = year => moment(year).format('YYYY-MM-DDTHH:mm:0ss.DZ');
  @State() habitsTabs = () =>
    state.habits.map(habit => (
      <ion-tab-button habitColor={habit.color} habitid={habit.id} onClick={e => this.updateCalendar(e)} tab="tab-speaker" style={{ color: habit.color }}>
        <ion-icon habitColor={habit.color} habitid={habit.id} name="radio-button-on-outline"></ion-icon>
        <ion-label habitColor={habit.color} habitid={habit.id}>
          {habit.name}
        </ion-label>
      </ion-tab-button>
    ));

  _habitid = false;

  invertHex(hex) {
    return '#' + (Number(`0x1${hex.replace('#', '')}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();
  }

  updateCalendar(e) {
    const habitid = e.target.getAttribute('habitid');
    const habitColor = e.target.getAttribute('habitColor');
    this._habitid = habitid;

    const year = this.year();

    if (this.comp.querySelectorAll('year-calendar .highlighted').length > 0) {
      this.comp.querySelectorAll('year-calendar .highlighted').forEach(element => {
        element.classList.remove('highlighted');
      });
    }

    const root = document.querySelector(':root');
    root.style.setProperty('--highlighted-color', habitColor);
    root.style.setProperty('--highlighted-text-color', this.invertHex(habitColor));

    if (state.checkinByHabit.hasOwnProperty(habitid)) {
      if (state.checkinByHabit[habitid].hasOwnProperty(year)) {
        state.checkinByHabit[habitid][year].map(habit => {
          if (this.comp.querySelector(`year-calendar .date-${habit}`) != null) {
            this.comp.querySelector(`year-calendar .date-${habit}`).classList.add('highlighted');
          }
        });
      }
    }
    if (this.comp.querySelector(`year-calendar .selected`)) {
      if (this.comp.querySelector(`year-calendar .selected`).classList.contains('highlighted')) {
        this.toggleSuggest(false);
      } else {
        this.toggleSuggest(true);
      }
    }
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  }

  changeYear(e) {
    this.date = () => e.target.value;

    this.year = () => moment(e.target.value).format('YYYY');

    this.comp.querySelector('year-calendar').displayDate = this.date(this.year());

    setTimeout(
      this_habitid => {
        if (this.comp.querySelector(`ion-tab-button[habitid="${this_habitid}"]`)) {
          this.comp.querySelector(`ion-tab-button[habitid="${this_habitid}"]`).click();
        }
      },
      10,
      this._habitid,
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
      this._habitid,
    );
  }

  async changeDay(day) {
    console.log(day, this.year(), this._habitid);

    if (day == this.comp.querySelector('year-calendar .selected').getAttribute('date')) {
      this.changeDayData(day, this.year(), this._habitid);
    } else {
      const toast = await toastController.create({
        message: 'Change the day?',
        position: 'bottom',
        duration: 2000,
        buttons: [
          {
            side: 'start',
            text: 'Yes',
            handler: () => this.changeDayData(day, this.year(), this._habitid),
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
    if (!this._habitid) {
      this.comp.querySelector('ion-tab-button').click();
    }
    const currentDay = moment().format('YYYY-M-D');
    if (this.comp.querySelector(`year-calendar .date-${currentDay}`) != null) {
      this.comp.querySelector(`year-calendar .date-${currentDay}`).classList.add('selected');
    }

    setTimeout(
      () => {
        this.comp.querySelector('year-calendar .selected').scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      },
      300,
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

            <div class={{ show: this.suggest(), hide: !this.suggest(), suggest: true }}>
              <ion-chip color="dark">
                <ion-label onClick={() => this.changeDay(this.comp.querySelector('year-calendar .selected').getAttribute('date'))}>Mark today?</ion-label>
                <ion-icon onClick={() => this.toggleSuggest.bind(false)} name="close-circle"></ion-icon>
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
          <ion-select class="hideme" id="share" onIonChange={e => this.copy(e)} value="notifications" interface="action-sheet">
            <ion-select-option value="tweet">Tweet</ion-select-option>
            <ion-select-option value="csv">Download CSV</ion-select-option>
            <ion-select-option value="full">Full Copy</ion-select-option>
            <ion-select-option value="short">Short Copy</ion-select-option>
          </ion-select>
        </ion-grid>

        <ion-fab class="more-options" horizontal="end" vertical="bottom" slot="fixed">
          <ion-fab-button class="more-options" color="light">
            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
          </ion-fab-button>
          <ion-fab-list side="top">
            <ion-fab-button color="light">
              <ion-icon name="add"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="light">
              <ion-icon name="create"></ion-icon>
            </ion-fab-button>
            <ion-fab-button color="light">
              <ion-icon name="trash-bin"></ion-icon>
            </ion-fab-button>

            <ion-fab-button onClick={() => this.openShareDialog()} color="light">
              <ion-icon name="share-social"></ion-icon>
            </ion-fab-button>

            <ion-fab-button color="light">
              <ion-icon name="help-circle-outline"></ion-icon>
            </ion-fab-button>
          </ion-fab-list>
        </ion-fab>

        <ion-fab vertical="bottom" horizontal="start" slot="fixed">
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
