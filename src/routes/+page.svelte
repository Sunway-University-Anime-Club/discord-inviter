<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '@zerodevx/svelte-toast';
	import type { SubmitFunction } from './$types';

	export let data;
	export let form;

	const submitter: SubmitFunction = async ({}) => {
		// The toast to let user know their request is being processed
		const loaderToast = toast.push('Processing...', {
			initial: 0,
			next: 0,
			// When the loader toast is removed, show a new toast with the response message
			onpop: () => {
				toast.push(form!.message, {
					theme: {
						'--toastBarBackground': form!.valid ? 'orange' : 'red'
					}
				});
			}
		});

		// Progress bar of the toast
		let progress = 0;

		// Update the progress bar on the toast by a random amount every 300ms
		const randomNumber = (min: number, max: number) => Math.random() * (max - min) + min;
		const interval = setInterval(() => {
			progress += randomNumber(0.05, 0.1);
			toast.set(loaderToast, { next: progress });
		}, 300);

		// Get response from form action
		return async ({ result, update }) => {
			clearInterval(interval);
			if (result.type === 'success') {
				// Set the progress bar to full when response is returned from form action
				toast.set(loaderToast, { next: 10 });

				// For visual consistency, remove the loader toast after 300ms
				setTimeout(() => toast.pop(loaderToast), 300);
			}

			// Reset the form
			update();
		};
	};
</script>

<section class="requester">
	<form class="requester__form" action="?/inviteRequest" method="POST" use:enhance={submitter}>
		<!-- The header of the form including logos and title -->
		<header class="requester__form__header">
			<!-- The division containing the logos -->
			<div class="requester__form__header__logos">
				<img src="/logos/suac.png" alt="suac logo" />

				<!-- Multiplication symbol -->
				<span>&times;</span>

				<img src="/logos/discord.png" alt="discord logo" />
			</div>

			<h1>SUAC Discord Inviter</h1>
		</header>

		<!-- The input for Student ID or imail -->
		<div class="requester__form__input">
			<label for="student_id">Student ID or Imail</label>
			<input type="text" name="student_id" id="student_id" placeholder="" />
		</div>

		<button type="submit">Request Invite</button>
	</form>

	<footer class="requester__footer">
		Copyright &copy; {data.year} Sunway University Anime Club. All rights reserved.
	</footer>

	<!-- Let user know if form submission was successful if JavaScript is disabled -->
	{#if form}
		<noscript>
			<p style="background-color: {form.valid ? 'darkgreen' : 'darkred'};">{form.message}</p>
		</noscript>
	{/if}
</section>

<style>
	/* Animation on page load */
	@keyframes flyIn {
		0% {
			opacity: 0;
			transform: translateY(-25%);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Set the background to fill the screen with an orange gradient */
	.requester {
		position: relative;
		min-height: 100dvh;
		background: linear-gradient(330deg, var(--primary-clr) 35%, var(--secondary-clr) 100%);
	}

	/* Play the keyframe animation for the form on render */
	.requester .requester__form {
		flex-direction: column;
		background: hsl(var(--neutralHS), 100%);
		padding: 2rem;
		margin: 1rem;
		border-radius: 0.5rem;
		animation: 0.8s ease-in-out 0s 1 flyIn;
	}

	/* Set the form to be at the centre of the page */
	.requester,
	.requester .requester__form {
		display: flex;
		justify-content: center;
		align-items: center;
		filter: drop-shadow(10px 10px 4px hsla(0, 0%, 0%, 0.1));
	}

	/* Set the logo size */
	.requester .requester__form .requester__form__header__logos img {
		height: auto;
		width: 5rem;
		display: inline-block;
	}

	/* Set the '×' size */
	.requester .requester__form .requester__form__header__logos span {
		margin-inline: 1.5rem;
		font-size: 3rem;
		font-weight: lighter;
	}

	/* Align the logos to be centered with each other */
	.requester .requester__form .requester__form__header__logos img,
	.requester .requester__form .requester__form__header__logos span {
		vertical-align: middle;
	}

	/* Add spacing for better visual consistency */
	.requester .requester__form h1,
	.requester .requester__form .requester__form__input {
		margin-bottom: 1rem;
	}

	/* Position the label to act as the input placeholder */
	.requester .requester__form .requester__form__input label {
		color: hsla(var(--neutralHS), 100%, 0.7);
		cursor: text;
		display: inline-block;
		transform: translate(7.5%, 135%);
		transition: transform 100ms ease-in-out;
	}

	/* Reset label if user is typing or has text in the input box */
	.requester .requester__form .requester__form__input:focus-within label,
	.requester
		.requester__form
		.requester__form__input
		label:has(+ input[type='text']:not(:placeholder-shown)) {
		color: hsl(var(--neutralHS), 50%);
		cursor: default;
		transform: translate(0);
	}

	/* Set background of input box to have an orange gradient */
	.requester .requester__form .requester__form__input input[type='text'] {
		background: var(--primary-clr);
		background: linear-gradient(170deg, var(--primary-clr) 35%, transparent 100%);
		background-color: var(--secondary-clr);
		transition: background-color 300ms ease-in-out;
	}

	/* Add an orange outline and fill with dark orange background when user is typing for better readability */
	.requester .requester__form .requester__form__input input[type='text']:focus {
		outline: solid 0.2rem var(--secondary-clr);
		background-color: var(--primary-clr);
	}

	/* Change colour of button to a blurple colour like Discord */
	.requester .requester__form button {
		cursor: pointer;
		background-color: hsl(var(--blurpleHS), 65%);
		transition: background-color 100ms ease-in-out;
		color: hsl(var(--neutralHS), 100%);
	}

	/* Change colour of button when hovering to let user know they are on the button */
	.requester .requester__form button:hover {
		background-color: hsl(var(--blurpleHS), 60%);
	}

	/* Add blurple outline to button */
	.requester .requester__form button:focus {
		outline: solid 0.2rem hsl(var(--blurpleHS), 60%);
	}

	/* Style the input box and button to fill the form width and round their corners with some spacing */
	.requester .requester__form .requester__form__input input[type='text'],
	.requester .requester__form button {
		border: none;
		border-radius: 0.2rem;
		width: 100%;
		padding: 0.5rem 1rem;
		color: hsl(var(--neutralHS), 100%);
	}

	/* Position the footer to be at the bottom relative to the whole page */
	.requester .requester__footer {
		position: absolute;
		bottom: 0;
		top: calc(100dvh - 5rem);
		color: hsla(var(--neutralHS), 100%);
		filter: drop-shadow(3px 3px 4px hsla(0, 0%, 0%, 0.5));
		margin: 0 1rem;
		text-align: center;
	}

	/* Position the noscript to be at the bottom of the page at all time */
	noscript {
		position: fixed;
		bottom: 0;
		top: calc(100dvh - 10rem);
		color: hsl(var(--neutralHS), 100%);
	}

	/* Put paragraph inside a box */
	noscript p {
		margin: 0 1rem;
		padding: 1rem 2rem;
		border-radius: 0.2rem;
	}
</style>
