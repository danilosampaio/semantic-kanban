import Vue from 'vue'
import TaskDialog from '@/components/taskDialog'
import _ from 'lodash'

describe('TaskDialog.vue', () => {
	it('should render TaskDialog', () => {
		const Constructor = Vue.extend(TaskDialog)
		const props = {
			propsData: {
				owners: [{
					id: 1,
					name: 'Danilo'
				}]
			}
		}
		const vm = new Constructor(props).$mount()
		const columns = _.filter(vm.$el.querySelector('.segment div').textContent.split(' '), (el) => el !== '')

		expect(columns[0]).to.equal('Subject')
		expect(vm.owners[0].id).to.equal(1)
	})
})
