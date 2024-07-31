<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let id = '';
	export let value = '';
	export let focused = false;
	export let disabled = false;
	export let placeholder = 'Input Content...';

	export let actions = ['heading', 'bold', 'italic', 'underline', 'list', 'link'];
	export let classes = [];

	let hasClass = {};

	let isBold = false;
	let isItalic = false;
	let isUnderline = false;
	let isLink = false;
	let isList = false;
	let isHeading = false;

	let container;
	let actionInset = null;

	$: value = value || '';
	$: isEmpty = !value.trim();

	// When a user pastes content into a text area, we extract just
	// the plain text. Stops all the word nonsense from coming through.

	function paste(e) {
		e.preventDefault();
		let data = e.clipboardData || window.clipboardData;
		let text = data.getData('text/plain');
		let selection = window.getSelection();
		if (!selection?.rangeCount) return;
		selection.deleteFromDocument();
		selection.getRangeAt(0).insertNode(document.createTextNode(text));
		value = e.currentTarget.innerHTML; /* boo svelte */
	}

	// Manage command states.
	// Keep internal state in sync with browser
	// when an action button is pressed and
	// when the selection changes.

	function updateActionStates() {
		let selection = window.getSelection();

		isBold = document.queryCommandState('bold');
		isItalic = document.queryCommandState('italic');
		isUnderline = document.queryCommandState('underline');
		isLink =
			selection?.rangeCount &&
			!!selection?.getRangeAt(0)?.startContainer?.parentNode?.closest?.('a');
		isList =
			selection?.rangeCount &&
			!!selection?.getRangeAt(0)?.startContainer?.parentNode?.closest?.('li');
		isHeading =
			selection?.rangeCount &&
			!!selection?.getRangeAt(0)?.startContainer?.parentNode?.closest?.('h3');

		for (let item of classes) {
			hasClass[item.className] =
				selection?.rangeCount &&
				!!selection?.getRangeAt(0)?.startContainer?.parentNode?.closest?.(`.${item.className}`);
		}

		let range = selection.getRangeAt(0);
		if (range.toString()) {
			let containerRect = container.getBoundingClientRect();
			let rect = range.getBoundingClientRect();
			actionInset = `${rect.top - containerRect.top - 40}px auto auto ${
				rect.left - containerRect.left - 16
			}px`;
		} else {
			actionInset = null;
		}
	}

	function bold() {
		document.execCommand('bold', false);
		updateActionStates();
	}

	function italic() {
		document.execCommand('italic', false);
		updateActionStates();
	}

	function underline() {
		document.execCommand('underline', false);
		updateActionStates();
	}

	function link() {
		if (isLink) {
			let range = window.getSelection().getRangeAt(0);
			range.selectNode(range.startContainer.parentNode);
			document.execCommand('unlink', false);
		} else {
			let url = prompt('Where to?');
			if (!url) {
				return;
			}
			document.execCommand('createLink', false, url);
		}
		updateActionStates();
	}

	function list() {
		document.execCommand('insertUnorderedList', false);
		updateActionStates();
	}

	function heading() {
		let h3 = window.getSelection()?.getRangeAt(0)?.startContainer?.parentNode?.closest('h3');
		if (h3) {
			h3.replaceWith(h3.innerHTML);
		} else {
			document.execCommand('formatBlock', false, 'h3');
		}
		updateActionStates();
	}

	function toggleClass(className) {
		if (hasClass[className]) {
			removeClass(className);
		} else {
			addClass(className);
		}
	}

	function removeClass(className) {
		let selection = window.getSelection();
		if (!selection) {
			return;
		}
		let rangeCount = selection?.rangeCount;
		if (!rangeCount) {
			return;
		}
		let range = selection.getRangeAt(0);
		let el = range.startContainer.parentNode.closest(`.${className}`);
		if (!el) {
			return;
		}
		let text = el.innerHTML;
		el.replaceWith(text);
		hasClass[className] = false;
		updateActionStates();
	}

	function addClass(className) {
		let selection = window.getSelection();
		if (!selection?.rangeCount) {
			return;
		}
		let range = selection.getRangeAt(0);
		let el = document.createElement('span');
		el.classList.add(className);
		el.appendChild(range.extractContents());
		range.insertNode(el);
		hasClass[className] = true;
		updateActionStates();
	}

	function keydown(e) {
		if (e.key === 'Enter' && !isList) {
			e.preventDefault();
			document.execCommand('insertLineBreak');
		}
	}

	onMount(() => {
		document.execCommand('defaultParagraphSeparator', false, 'br');
		document.addEventListener('selectionchange', updateActionStates);
		return () => document.removeEventListener('selectionchange', updateActionStates);
	});
</script>

<div class="se-html-input" class:disabled bind:this={container}>
	{#if disabled}
		<div {id} class="se-html-input__content">{@html value}</div>
	{:else}
		<div
			{id}
			contenteditable="true"
			role="button"
			tabindex="0"
			class="se-html-input__content"
			class:focused
			bind:innerHTML={value}
			on:paste={paste}
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
			on:keydown={keydown}
		>
			<p />
		</div>
	{/if}

	{#if focused && actionInset}
		<div
			class="se-html-input__actions"
			transition:fly|local={{ y: 8, duration: 200 }}
			on:mousedown={(e) => e.preventDefault()}
			role="button"
			tabindex="0"
			style="inset:{actionInset}"
		>
			{#if actions.includes('heading')}
				<div
					class="se-html-input__action"
					class:active={isHeading}
					on:click={heading}
					on:keypress
					role="button"
					tabindex="0"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M0 64C0 46.3 14.3 32 32 32l48 0 48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 112 224 0 0-112-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l48 0 48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 144 0 176 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-48 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-144-224 0 0 144 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-48 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-176L48 96 32 96C14.3 96 0 81.7 0 64z"
						/></svg
					>
				</div>
			{/if}
			{#if actions.includes('bold')}
				<div
					class="se-html-input__action"
					class:active={isBold}
					on:click={bold}
					on:keypress
					role="button"
					tabindex="0"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M0 64C0 46.3 14.3 32 32 32l48 0 16 0 128 0c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128L96 480l-16 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-160L48 96 32 96C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64L112 96l0 128 112 0zM112 288l0 128 144 0c35.3 0 64-28.7 64-64s-28.7-64-64-64l-32 0-112 0z"
						/></svg
					>
				</div>
			{/if}
			{#if actions.includes('italic')}
				<div
					class="se-html-input__action"
					class:active={isItalic}
					on:click={italic}
					on:keypress
					role="button"
					tabindex="0"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M128 64c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-58.7 0L160 416l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l58.7 0L224 96l-64 0c-17.7 0-32-14.3-32-32z"
						/></svg
					>
				</div>
			{/if}
			{#if actions.includes('underline')}
				<div
					class="se-html-input__action"
					class:active={isUnderline}
					on:click={underline}
					on:keypress
					role="button"
					tabindex="0"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M16 64c0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 128c0 53 43 96 96 96s96-43 96-96l0-128-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 128c0 88.4-71.6 160-160 160s-160-71.6-160-160L64 96 48 96C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32z"
						/></svg
					>
				</div>
			{/if}
			{#if actions.includes('list')}
				<div
					class="se-html-input__action"
					class:active={isList}
					on:click={list}
					on:keypress
					role="button"
					tabindex="0"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"
						/></svg
					>
				</div>
			{/if}
			{#if actions.includes('link')}
				<div
					class="se-html-input__action"
					class:active={isLink}
					on:click={link}
					on:keypress
					role="button"
					tabindex="0"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
						><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
							d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
						/></svg
					>
				</div>
			{/if}
			{#each classes || [] as item}
				<div
					class="se-html-input__action"
					class:active={hasClass[item.className]}
					on:click={() => toggleClass(item.className)}
					on:keypress
					role="button"
					tabindex="0"
				>
					{item.icon.value}
				</div>
			{/each}
		</div>
	{/if}

	{#if isEmpty && placeholder}
		<div class="se-html-input__placeholder">
			{placeholder}
		</div>
	{/if}
</div>

<style>
	.se-html-input {
		position: relative;
		padding: 0;
		border: 1px solid
			color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
		margin: 0;
	}

	.se-html-input__content {
		box-sizing: border-box;
		min-height: 48px;
		padding: calc(0.5rem - 1px); /* Because we already have a 1px border */
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}

	.se-html-input__content:focus {
		outline: none;
	}

	.se-html-input__actions {
		position: absolute;
		top: -16px;
		right: 8px;
		z-index: 10000;
		display: flex;
	}

	.se-html-input__action {
		position: relative;
		display: inline-block;
		z-index: 200;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 32px;
		height: 32px;
		text-align: center;
		color: var(--se-forground, #424242);
		fill: var(--se-forground, #424242);
		background-color: var(--se-background, #eeeeee);
		cursor: pointer;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	}

	.se-html-input__action:hover {
		background-color: color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
	}

	.se-html-input__action.active {
		background-color: color-mix(in srgb, var(--se-background, #eee) 80%, var(--se-forground, #424242) 20%);
		color: var(--se-accent, #aaa);
		fill: var(--se-accent, #aaa);
	}

	.se-html-input__action:first-child {
		padding-left: 4px;
		border-radius: 16px 0 0 16px;
	}

	.se-html-input__action:last-child {
		padding-right: 4px;
		border-radius: 0 16px 16px 0;
	}

	.se-html-input__action:first-child:last-child {
		padding-left: 4px;
		padding-right: 4px;
		border-radius: 16px;
	}

	.se-html-input__action svg {
		height: 12px;
	}

	.se-html-input__content :global(h3) {
		font-size: 2em;
		line-height: 1.2em;
		margin: 24px 0 16px 0;
	}

	.se-html-input__content :global(h3:first-child) {
		margin-top: 0;
	}

	.se-html-input__content :global(a) {
		text-decoration: none;
		pointer-events: none;
	}

	.se-html-input__content :global(ul) {
		margin: 8px 0;
		padding-left: 24px;
	}

	.se-html-input__placeholder {
		position: absolute;
		top: calc(0.5rem - 1px);
		left: calc(0.5rem - 1px);
		width: 100%;
		pointer-events: none;
		opacity: 0.5;
		text-align: inherit;
	}
</style>
