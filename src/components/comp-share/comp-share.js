import { Component, h, Element, Prop } from '@stencil/core';
import { toastController } from '@ionic/core';
import state from '../store/store.js';
import moment from 'moment';

@Component({
  tag: 'comp-share',
})
export class EditHabit {

  @Element() comp;
  @Prop() habit_Id = ()=> {};

  prepShortText() {
    const year = moment(this.currentDate).format('YYYY');
    const getHabitDays = state.checkinByHabit[this.habit_Id()][year]
    const getCurrentHabit = state.habits.filter(h=> h.id == this.habit_Id() )[0]
    return `I completed ${getHabitDays.length} days of ${getCurrentHabit.name} #${year}_habits_on_track`;
  }

  prepFullText() {
    const year = moment(this.currentDate).format('YYYY');
    const _yearData = state.checkinByHabit[this.habit_Id()][year];
    const getHabitDays = _yearData.length;

    const getDaysInMonth = (Y, M) => {
      return Number(moment(`${Number(Y)}-${Number(M)}`, 'YYYY-M').daysInMonth());
    }
    let daysInMonth = [];
    for( let month = 0; month <= 12; month ++){
      daysInMonth.push( getDaysInMonth(year, month) );
    }

    let theYear = ''; 
    for( let day = 1; day <= 31; day ++){
      let monthRow = ''
      for( let month = 1; month <= 12; month ++){
        if(daysInMonth[month] >= day){
          const vlad = state.checkinByHabit[this.habit_Id()][year].filter( d=> d ==`${year}-${month}-${day}`);
          monthRow += vlad.length > 0 ? '#' : '-';
        }else{
          monthRow += '_';
        }
        
      }
      theYear += '\n' + monthRow
    }
    
    const getCurrentHabit = state.habits.filter(h=> h.id == this.habit_Id() )[0]

    return `${theYear} \n I completed ${getHabitDays} days of ${getCurrentHabit.name} #${year}_habits_on_track`;
  }

  async getNewFileHandle() {
    const options = {
      types: [
        {
          description: 'Habit tracker',
          accept: {
            'text/plain': ['.csv'],
          },
        },
      ],
    };
    const handle = await window.showSaveFilePicker(options);
    return handle;
  }

  async writeFile(contents) {
    try {
      const fileHandle = await window.showSaveFilePicker({
          types: [{
            accept: {
              'text/csv': ['.csv']
            },
          }],
        });
      const writable = await fileHandle.createWritable();
      await writable.write(contents);
      await writable.close();
    } catch (err) {
      alert('Error :/')
    }
  }

  prepCSV() {
    const year = moment(this.currentDate).format('YYYY');
    const _yearData = state.checkinByHabit[this.habit_Id()][year];
    const getHabitDays = _yearData.length;

    const getDaysInMonth = (Y, M) => {
      return Number(moment(`${Number(Y)}-${Number(M)}`, 'YYYY-M').daysInMonth());
    }
    let daysInMonth = [];
    for( let month = 0; month <= 12; month ++){
      daysInMonth.push( getDaysInMonth(year, month) );
    }

    let theYear = ''; 
    for( let day = 1; day <= 31; day ++){
      let monthRow = ''
      for( let month = 1; month <= 12; month ++){
        if(daysInMonth[month] >= day){
          const vlad = state.checkinByHabit[this.habit_Id()][year].filter( d=> d ==`${year}-${month}-${day}`);
          monthRow += vlad.length > 0 ? 'TRUE,' : 'FALSE,';
        }else{
          monthRow += ',';
        }
        
      }
      theYear += '\n' + monthRow
    }

    this.writeFile(theYear);

    // return `${theYear} \n I completed ${getHabitDays} days of ${this.getCurrentHabit.name}`;
  }

  async presentToast(msg, wait) {
    const toast = await toastController.create({
      message: msg,
      position: 'bottom',
      duration: wait,
    });
    toast.present()
  }

  copy(e) {
    const copyText = text => {
      const cp = this.comp.querySelector('#copy');
      cp.value = text;
      cp.select();
      cp.setSelectionRange(0, 99999);
      document.execCommand('copy');

      this.presentToast('Copied', 1000);
    };

    if (e.target.value == 'short') {
      copyText(this.prepShortText());
    } else if (e.target.value == 'full') {
      copyText(this.prepFullText());
    } else if (e.target.value == 'csv') {
      this.prepCSV();
    } else if (e.target.value == 'tweet') {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(this.prepShortText()), '_blank');
    }
    e.target.value = ',';
  }

  render() {
    return [
      <textarea id="copy" type="text" value="" ></textarea>,
      <ion-select class="hideme" id="share" onIonChange={e => this.copy(e)} value="notifications" interface="action-sheet">
        <ion-select-option value="tweet">Tweet</ion-select-option>
        <ion-select-option value="csv">Export to .CSV</ion-select-option>
        <ion-select-option value="full">Full Copy</ion-select-option>
        <ion-select-option value="short">Short Copy</ion-select-option>
      </ion-select>,
    ];
  }
}
