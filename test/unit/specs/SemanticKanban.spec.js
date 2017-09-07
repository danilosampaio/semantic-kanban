import Vue from 'vue'
import SemanticKanban from '@/semanticKanban'
import _ from 'lodash'

describe('SemanticKanban.vue', () => {
	it('should render kanban columns', () => {
		const Constructor = Vue.extend(SemanticKanban)
		const props = {
			propsData: {
				tasks: [{
					id: 1,
					subject: 'brace yourselves',
					description: 'winter is comming...',
					owner: 1
				}],
				members: [{
					id: 1,
					name: 'Danilo'
				}]
			}
		}
		const vm = new Constructor(props).$mount()
		const columns = _.filter(vm.$el.querySelector('.segment div').textContent.split(' '), (el) => el !== '')

		expect(columns[0]).to.equal('Backlog')
		expect(columns[1].trim()).to.equal('Team')
		expect(columns[2]).to.equal('Doing')
		expect(columns[3]).to.equal('Blocked')
		expect(columns[4]).to.equal('Done')
		expect(vm._members[0].id).to.equal(1)
		expect(vm._members[0].name).to.equal('Danilo')
		expect(vm._backlog.length).to.equal(0)
		expect(vm._team[0].id).to.equal(1)
		expect(vm._team[0].name).to.equal('Danilo')
		expect(vm._columnLabels[0]).to.equal('Backlog')
		expect(vm._columnLabels[1]).to.equal('Team')
		expect(vm._columnLabels[2]).to.equal('Doing')
		expect(vm._columnLabels[3]).to.equal('Blocked')
		expect(vm._columnLabels[4]).to.equal('Done')
		expect(vm._backlogLabel).to.equal('Backlog')
		expect(vm._teamLabel).to.equal('Team')
		expect(vm._doingLabel).to.equal('Doing')
		expect(vm._blockedLabel).to.equal('Blocked')
		expect(vm._doneLabel).to.equal('Done')
		expect(vm._newTaskHint).to.equal('New Task')
		expect(vm.tasks[0].id).to.equal(1)
	})
})
