import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'color-picker',
  styleUrl: 'color-picker.css',
})
export class ColorPicker {

  @Prop() target;

  render() {
    return (
      <div class="ion-padding">
        <div class="colors">
          <div class="color" value="#F80020"></div>
          <div class="color" value="#DB7828"></div>
          <div class="color" value="#FFE500"></div>
          <div class="color" value="#62FF97"></div>
          <div class="color" value="#0CC5FD"></div>
          <div class="color" value="#007DA4"></div>
          <div class="color" value="#3980FF"></div>
          <div class="color" value="#808289"></div>
          <div class="color" value="#EDEDED"></div>
          <div class="color" value="#8D0012"></div>
          <div class="color" value="#EC445A"></div>
          <div class="color" value="#F80095"></div>
          <div class="color" value="#4AAB00"></div>
          <div class="color" value="#A47D00"></div>
        </div>
      </div>
    );
  }

  componentDidLoad(){
    document.querySelectorAll('.color').forEach(color=>{
      color.style.background = color.getAttribute('value');
      color.addEventListener('click', (e)=>{
        document.querySelector(`#${this.target}`).value = e.target.getAttribute('value');
        document.querySelectorAll('.selected').forEach(selected=>{
          selected.classList.remove('selected')
        })
        e.target.classList.add('selected')
      })
    })
  }
}