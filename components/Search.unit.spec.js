import { mount } from '@vue/test-utils'
import Search from './Search.vue'

describe('Search - unit', () => {
  it('should mount component', () => {
    const wrapper = mount(Search)

    expect(wrapper.vm).toBeDefined()
  })

  it('should be match snapshot', () => {
    const wrapper = mount(Search)

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should be emit doSearch event when submit form', async () => {
    const wrapper = mount(Search)
    const term = 'termo para busca'

    await wrapper.find('input[type="search"]').setValue(term)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted().doSearch).toBeTruthy()
    expect(wrapper.emitted().doSearch.length).toBe(1)
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term }])
  })

  it('should be emit doSearch event when form input cleared', async () => {
    const wrapper = mount(Search)
    const term = 'termo para busca'
    const input = wrapper.find('input[type="search"]')

    await input.setValue(term)
    await input.setValue('')

    expect(wrapper.emitted().doSearch).toBeTruthy()
    expect(wrapper.emitted().doSearch.length).toBe(1)
    expect(wrapper.emitted().doSearch[0]).toEqual([{ term: '' }])
  })
})
