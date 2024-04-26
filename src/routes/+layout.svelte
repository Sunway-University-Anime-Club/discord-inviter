<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<main>
	<div class="toast-wrapper"></div>
	<SvelteToast
		options={{
			duration: 5000,
			theme: {
				'--toastBarBackground': 'orange',
				'--toastBackground': 'white',
				'--toastColor': 'black'
			},
			pausable: true
		}}
	/>
	<slot />
</main>

<style>
	main {
		font-family: Arial, Helvetica, sans-serif;
	}
</style>
