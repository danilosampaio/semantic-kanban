import Vue from 'vue'
import TaskCard from '@/components/taskCard'

describe('TaskCard.vue', () => {
	it('should render TaskCard', () => {
		const Constructor = Vue.extend(TaskCard)
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
