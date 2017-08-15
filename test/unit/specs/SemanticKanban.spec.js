import Vue from 'vue'
import SemanticKanban from '@/semanticKanban'
import _ from 'lodash'

describe('SemanticKanban.vue', () => {
  it('should render kanban columns', () => {
    const Constructor = Vue.extend(SemanticKanban)
    const vm = new Constructor().$mount()
    const columns = _.filter(vm.$el.querySelector('.segment div').textContent.split(' '), (el) => el != '')

    expect(columns[0])
      .to.equal('Backlog')
    expect(columns[1])
      .to.equal('Team')
    expect(columns[2])
      .to.equal('Doing')
    expect(columns[3])
      .to.equal('Blocked')
    expect(columns[4])
      .to.equal('Done')   
  })
})
