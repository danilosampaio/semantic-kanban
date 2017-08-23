<template>
	<div
		:class="getCardClass()"
		v-bind:id="task.id"
		v-on:click="openTask">
		<a class="content" v-html="_topContent"></a>		
		<div class="content">
			{{formattedTaskDescription}}
		</div>
		<div class="extra content" v-html="_extraContent"></div>
	</div>
</template>

<script type="text/javascript">
	import wrap from 'greedy-wrap'
	import moment from 'moment'

	export default {
		props: ['task', 'extraContent', 'topContent'],
		methods: {
			getCardClass () {
				return this.task.status === 'doing' ? 'ui yellow card'
					: this.task.status === 'blocked' ? 'ui red card'
					: this.task.status === 'done' ? 'ui green card' : 'ui grey card'
			},
			openTask (e) {
				if (e.srcElement.className === 'ui close icon') {
					this.$emit('confirmDeleteTask', this.task)
				} else {
					this.$emit('openTask', this.task)
				}
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
						? description.substr(0, 100)
						: description
			},
			_extraContent () {
				const dueDate = this.task.dueDate
				const remain = this.task.dueDate ? Math.round(moment().diff(this.task.dueDate) / 1000 / 60 / 60) * -1 : ''
				return this.extraContent ? this.extraContent() : `
					<div class="right floated meta">
						<span>Rem. ${remain}h</span>
					</div>
					${dueDate}`
			},
			_topContent () {
				const formattedSubject = this.formattedSubject
				return this.topContent ? this.topContent() : `
					<div class="right floated meta">
						<i class="ui close icon"></i>
					</div>
					${formattedSubject}`
			}
		}
	}
</script>