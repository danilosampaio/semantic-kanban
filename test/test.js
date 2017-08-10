import test from 'ava';
import Vue from 'vue';
import SemanticKanban from '../semanticKanban.vue';

let errorThrown = false;
Vue.config.errorHandler = function (err, vm, info) {
  console.log(info);
  if(info.includes('mounted')) {
    errorThrown = true;
  }
};

test('renders', t => {
	const vm = new Vue(SemanticKanban).$mount();
	const tree = {
		$el: vm.$el.outerHTML
	};
	t.snapshot(tree);
});