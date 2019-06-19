import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import VueRx from 'vue-rx'
import ClipperBasic from '@/components/clipper-basic.vue'

const localVue = createLocalVue()

localVue.use(VueRx)

describe('clipper-basic.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = mount(ClipperBasic, {
      propsData: {
        src: 'test.jpg'
      },
      localVue
    })
    expect(wrapper.contains('img')).to.equal(true)
  })
})
