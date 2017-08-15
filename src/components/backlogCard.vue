<template>
	<div
		class="ui blue card"
		v-bind:id="task.id"
		v-on:click="openTask(task)">
		<a class="content" v-html="_topContent"></a>
		<div class="content">
			{{formattedTaskDescription}}
		</div>
		<div class="extra content" v-html="_extraContent"></div>
	</div>
</template>

<script type="text/javascript">
	import wrap from 'greedy-wrap'
	import _ from 'lodash'
	import moment from 'moment'

	export default {
		props: ['task', 'owners', 'extraContent', 'topContent'],
		methods: {
			openTask () {
				this.$emit('openTask', this.task)
			}
		},
		computed: {
			formattedSubject () {
				return this.task.subject.length > 50
					? this.task.subject.substr(0, 50)
					: this.task.subject
			},
			formattedTaskDescription () {
				const options = {width: 30, autoWidth: false, linebreak: ' '}
				var description = wrap(this.task.description || '', options)
				return !description ? ''
					: description.length > 100
					? description.substr(0, 100) : description
			},
			ownerName () {
				if (this.owners && this.owners.length) {
					const ow = _.find(this.owners, {id: this.task.owner})
					return ow && ow.name ? ow.name : this.task.owner || 'unsigned'
				} else {
					return this.task.owner || 'unsigned'
				}
			},
			_extraContent () {
				const dueDate = this.task.dueDate
				const ownerName = this.ownerName
				return this.extraContent ? this.extraContent() : `
					<div class="right floated meta">
						<span>${ownerName}</span>
					</div>
					${dueDate}`
			},
			_topContent () {
				const semafor = this.task.dueDate && this.task.dueDate <= moment().toDate()
					? 'ui red circle icon'
					: 'ui green circle icon'
				const formattedSubject = this.formattedSubject
				return this.topContent ? this.topContent() : `
					<div class="right floated meta">
						<i class="${semafor}"></i>
					</div>
					${formattedSubject}`
			}
		}
	}
</script>