/* eslint-disable import/order */
import ProductCard from '@/components/ProductCard'
import Search from '@/components/Search'
import { makeServer } from '@/miragejs/server'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import Vue from 'vue'
import ProductList from '.'

let server
jest.mock('axios')

describe('ProductList - integration', () => {
  beforeEach(() => {
    server = makeServer({ enviroment: test })
  })

  afterEach(() => {
    server.shutdown()
  })
  it('should be mount component', () => {
    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    })
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('api/products/')
    expect(wrapper.vm).toBeDefined()
  })

  it('should be mount Search component', () => {
    const wrapper = mount(ProductList)

    expect(wrapper.findComponent(Search)).toBeDefined()
  })

  it('should be mount ProductCard component 10 times', async () => {
    const products = server.createList('product', 10)
    axios.get.mockReturnValue(Promise.resolve({ data: { products } }))

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    })

    await Vue.nextTick()

    const cards = wrapper.findAllComponents(ProductCard)

    expect(cards).toHaveLength(10)
  })

  it('should be display errorMessage when promise reject', async () => {
    axios.get.mockReturnValue(
      Promise.reject(new Error('Problemas ao carregar a lista!'))
    )

    const wrapper = mount(ProductList, {
      mocks: {
        $axios: axios,
      },
    })

    await Vue.nextTick()

    expect(wrapper.text()).toContain('Problemas ao carregar a lista!')
  })
})
