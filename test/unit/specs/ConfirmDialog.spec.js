import Vue from 'vue'
import ConfirmDialog from '@/components/confirmDialog'
import _ from 'lodash'

describe('ConfirmDialog.vue', () => {
	it('should render ConfirmDialog', () => {
		const Constructor = Vue.extend(ConfirmDialog)
		const task = {
			id: 1,
			subject: 'Brace yourselves',
			description: 'Winter is coming...'
		}
		const vm = new Constructor().$mount()
		vm.show(task)
		const columns = _.filter(vm.$el.querySelector('.modal div').textContent.split(' '), (el) => el !== '')

		expect(columns[1].replace(/(\t|\n)/g, '')).to.equal('Task')
	})
})
