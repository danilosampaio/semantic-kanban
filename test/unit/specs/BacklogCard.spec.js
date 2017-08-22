import Vue from 'vue'
import BacklogCard from '@/components/backlogCard'

describe('BacklogCard.vue', () => {
	it('should render BacklogCard', () => {
		const Constructor = Vue.extend(BacklogCard)
		const props = {
			propsData: {
				task: {
					id: 1,
					subject: 'brace yourselves',
					description: 'winter is comming...',
					owner: 1
				}
			}
		}
		const vm = new Constructor(props).$mount()
		const html = vm.$el.querySelector('.card div').innerHTML

		expect(html.replace(/(\t|\n)/g, '')).to.equal('<i class="ui green circle icon"></i>')
	})
})
