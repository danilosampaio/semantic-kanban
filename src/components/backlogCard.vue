<template>
	<div
		class="ui blue card"
		v-bind:id="task.id"
		v-on:click="openTask">
		<a class="content" v-html="_topContent"></a>
		<div class="content">
			{{formattedTaskDescription}}
		</div>
		<div v-if="_tags.length > 0" class="content">
			<div
				v-for="tag in _tags"
				:class="getTagClass(tag)">
				{{formattedTag(tag)}}
			</div>
		</div>
		<div class="extra content" v-html="_extraContent"></div>
	</div>
</template>

<script type="text/javascript">
	import wrap from 'greedy-wrap'
	import _ from 'lodash'

	export default {
		props: ['task', 'owners', 'extraContent', 'topContent'],
		methods: {
			openTask (e) {
				if (e.target.className === 'ui close icon') {
					this.$emit('confirmDeleteTask', this.task)
				} else {
					this.$emit('openTask', this.task)
				}
			},
			formattedTag (tag) {
				if (typeof tag === 'object') {
					return tag.value
				} else {
					return tag
				}
			},
			getTagClass (tag) {
				if (typeof tag === 'object') {
					return 'ui ' + tag.color + ' label'
				} else {
					return 'ui label'
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
					? description.substr(0, 100) : description
			},
			_tags () {
				return this.task && this.task.tags
					? this.task.tags
					: []
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