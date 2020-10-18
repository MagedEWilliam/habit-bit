import { newSpecPage } from '@stencil/core/testing';
import { HabitBit } from '../habit-bit';

describe('habit-bit', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [HabitBit],
      html: `<habit-bit></habit-bit>`,
    });
    expect(page.root).toEqualHtml(`
      <habit-bit>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </habit-bit>
    `);
  });
});
