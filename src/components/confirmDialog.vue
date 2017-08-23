<template>
	<div class="ui basic modal">
		<div class="ui icon header">
			<i class="trash icon"></i>
			Delete Task
		</div>
		<div class="content">
			<p>Would you like to delete the task "{{task.id}} - {{task.subject}}"?</p>
		</div>
		<div class="actions">
			<div class="ui red basic cancel inverted button" v-on:click="hide">
				<i class="remove icon"></i>
				No
			</div>
			<div class="ui green ok inverted button" v-on:click="confirmDelete">
				<i class="checkmark icon"></i>
				Yes
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import _ from 'lodash'
	import $ from 'jquery'

	export default {
		data () {
			return {
				task: {
					id: null,
					subject: null,
					description: null,
					status: null,
					owner: null,
					dueDate: null
				}
			}
		},
		methods: {
			show (task) {
				if (task) {
					_.assign(this.task, task)
				} else {
					this.task.id = null
					this.task.subject = null
					this.task.description = null
					this.task.status = null
					this.task.owner = null
					this.task.dueDate = null
				}
				$(this.$el).modal('show')
			},
			hide () {
				$(this.$el).modal('hide')
			},
			confirmDelete () {
				this.$emit('deleteTask', this.task)
				this.hide()
			}
		}
	}
</script>
