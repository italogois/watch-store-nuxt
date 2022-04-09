/* eslint-disable import/order */
import { makeServer } from '@/miragejs/server'
import { mount } from '@vue/test-utils'
import ProductCard from './ProductCard.vue'

let server
const MountProductCard = () => {
  const product = server.create('product', {
    title: 'Relogio bonito',
    price: '22.00',
    image:
      'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
  })

  return {
    wrapper: mount(ProductCard, {
      propsData: {
        product,
      },
    }),
    product,
  }
}

describe('Product Card', () => {
  beforeEach(() => {
    server = makeServer({ enviroment: test })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should be mount component', () => {
    const { wrapper } = MountProductCard()

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.text()).toContain('Relogio bonito')
    expect(wrapper.text()).toContain('22.00')
  })

  it('should be match snapshot', () => {
    const { wrapper } = MountProductCard()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be emit event addToCart with product when click button addToCart', async () => {
    const { wrapper, product } = MountProductCard()

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted().addToCart).toBeTruthy()
    expect(wrapper.emitted().addToCart.length).toBe(1)
    expect(wrapper.emitted().addToCart[0]).toEqual([{ product }])
  })
})
