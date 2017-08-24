<template>
	<semantic-kanban
		:tasks="tasks"
		:members="members"
		:options="options"
		@updateTask="updateTask"
		@deleteTask="deleteTask"
		@addTag="addTag"
		@deleteTag="deleteTag">
	</semantic-kanban>  
</template>

<script>
import SemanticKanban from './semanticKanban'

export default {
	name: 'app',
	components: {
		SemanticKanban
	},
	data () {
		return {
			tasks: [{
				id: 3,
				subject: 'Test backlog',
				description: 'Test backlog',
				status: 'backlog',
				tags: ['help-wanted']
			},
			{
				id: 1,
				subject: 'Brace yourselves',
				description: 'Winter is coming...',
				status: 'doing',
				dueDate: '2017-09-09 07:00',
				owner: 2,
				type: 'feature',
				tags: [{title: 'request', color: 'green'}]
			},
			{
				id: 2,
				subject: 'Kill Cersei',
				description: 'Shame!',
				status: 'blocked',
				dueDate: '2017-08-20 18:00',
				owner: 1,
				type: 'bug',
				tags: ['critical', 'test']
			}],
			members: [{
				id: 1,
				name: 'Danilo'
			}],
			options: {
				defaultTaskDialog: true,
				defaultConfirmDialog: true,
				taskExtraContent () {
					return function () {
						const dueDate = this.task.dueDate
						const remain = 10
						const icon = this.task.type === 'feature'
							? 'blue cubes icon'
							: this.task.type === 'bug' ? 'red bug icon' : ''
						return `
							<div class="right floated meta">
								<span>Rem. ${remain}h</span>
								<i class="${icon}"></i>
							</div>
							${dueDate}`
					}
				}
			}
		}
	},
	methods: {
		updateTask (task) {
			console.log(task)
		},
		deleteTask (task) {
			console.log(task)
		},
		deleteTag (task, tag) {
			console.log(task, tag)
		},
		addTag (task, tag) {
			console.log(task, tag)
		}
	}
}
</script>
