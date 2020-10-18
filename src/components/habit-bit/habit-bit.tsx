import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'habit-bit',
  styleUrl: 'habit-bit.css',
  shadow: true,
})
export class HabitBit {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
