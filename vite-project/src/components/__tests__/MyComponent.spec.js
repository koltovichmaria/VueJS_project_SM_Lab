import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '../MyComponent.vue'

describe('MyComponent', () => {
  it('отображает приветствие с переданным именем', () => {
    const wrapper = mount(MyComponent, {
      props: { name: 'Мария' }
    })
    expect(wrapper.text()).toContain('Привет, Мария!')
  })

  it('использует имя по умолчанию, если пропс не передан', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.text()).toContain('Привет, Гость!')
  })

  it('эмитит событие sayHi при клике на кнопку', async () => {
    const wrapper = mount(MyComponent)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('sayHi')
    expect(wrapper.emitted().sayHi).toHaveLength(1)
  })
})