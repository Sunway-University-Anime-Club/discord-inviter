<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<main>
	<div class="toast-wrapper">
		<SvelteToast
			options={{
				duration: 5000,
				pausable: true,
				reversed: true,
				intro: { y: 192 }
			}}
		/>
	</div>
	<slot />
</main>

<style>
	main {
		font-family: Arial, Helvetica, sans-serif;
	}

	main .toast-wrapper {
		--toastContainerTop: auto;
		--toastContainerRight: 1rem;
		--toastContainerBottom: 8rem;
		--toastContainerLeft: 1rem;
		--toastWidth: 100%;
		--toastMinHeight: 2rem;
		--toastPadding: 0 0.5rem;
		--toastBorderRadius: 0.2rem;
		--toastBarBackground: var(--secondary-clr);
		--toastBackground: white;
		--toastColor: black;
		font-size: 0.875rem;
	}

	@media (min-width: 48em) {
		main .toast-wrapper {
			--toastContainerRight: auto;
			--toastContainerLeft: calc(50vw - 20rem);
			--toastWidth: 40rem;
		}
	}
</style>
