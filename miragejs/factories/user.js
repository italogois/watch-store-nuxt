/*
 * Mirage JS guide on Factories: https://miragejs.com/docs/data-layer/factories
 */
/*
 * Faker Github repository: https://github.com/Marak/Faker.js#readme
 */
import faker from 'faker'
import { Factory } from 'miragejs'
import { randomNumber } from './utils'

export default {
  user: Factory.extend({
    name() {
      return faker.fake('{{name.findName}}')
    },
    mobile() {
      return faker.fake('{{phone.phoneNumber}}')
    },
    afterCreate(user, server) {
      const messages = server.createList('message', randomNumber(10), { user })

      user.update({ messages })
    },
  }),
}
