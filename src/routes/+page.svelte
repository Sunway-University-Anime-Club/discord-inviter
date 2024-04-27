<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from '@zerodevx/svelte-toast';

	export let form;
	$: {
		if (form?.studentId) {
			toast.push(form.studentId);
		}
	}
</script>

<section class="requester">
	<form class="requester__form" action="?/inviteRequest" method="POST" use:enhance>
		<div class="requester__form__logos">
			<img src="/logos/suac.webp" alt="suac logo" />
			<span>&times;</span>
			<img src="/logos/discord.png" alt="discord logo" />
		</div>

		<h1>SUAC Discord Inviter</h1>

		<div class="requester__form__input">
			<label for="student_id">Student ID or Imail</label>
			<input type="text" name="student_id" id="student_id" placeholder="" />
		</div>

		<button type="submit">Request Invite</button>
	</form>
</section>

<style>
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

	.requester {
		min-height: 100dvh;
		background: linear-gradient(330deg, hsl(31, 100%, 39%) 35%, hsl(40, 100%, 50%) 100%);
	}

	.requester .requester__form {
		flex-direction: column;
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		animation: 0.8s ease-in-out 0s 1 flyIn;
	}

	.requester,
	.requester .requester__form {
		display: flex;
		justify-content: center;
		align-items: center;
		filter: drop-shadow(10px 10px 4px hsla(0, 0%, 0%, 0.1));
	}

	.requester .requester__form .requester__form__logos img {
		height: auto;
		width: 5rem;
		display: inline-block;
	}

	.requester .requester__form .requester__form__logos span {
		margin-inline: 1.5rem;
		font-size: 3rem;
		font-weight: lighter;
	}

	.requester .requester__form .requester__form__logos img,
	.requester .requester__form .requester__form__logos span {
		vertical-align: middle;
	}

	.requester .requester__form h1,
	.requester .requester__form .requester__form__input {
		margin-bottom: 1rem;
	}

	.requester .requester__form .requester__form__input label {
		color: hsla(0, 0%, 100%, 0.7);
		cursor: text;
		display: inline-block;
		transform: translate(7.5%, 135%);
		transition: transform 100ms ease-in-out;
	}

	.requester .requester__form .requester__form__input:focus-within label,
	.requester
		.requester__form
		.requester__form__input
		label:has(+ input[type='text']:not(:placeholder-shown)) {
		color: grey;
		cursor: default;
		transform: translate(0);
	}

	.requester .requester__form .requester__form__input input[type='text'] {
		background: hsl(31, 100%, 45%);
		background: linear-gradient(170deg, hsl(31, 100%, 45%) 35%, transparent 100%);
		background-color: hsl(40, 100%, 50%);
		transition: background-color 300ms ease-in-out;
	}

	.requester .requester__form .requester__form__input input[type='text']:focus {
		outline: solid 0.2rem orange;
		background-color: hsl(31, 100%, 45%);
	}

	.requester .requester__form button {
		cursor: pointer;
		background-color: hsl(227, 58%, 65%);
		transition: background-color 100ms ease-in-out;
		color: white;
	}

	.requester .requester__form button:hover {
		background-color: hsl(227, 58%, 60%);
	}

	.requester .requester__form .requester__form__input input[type='text'],
	.requester .requester__form button {
		border: none;
		border-radius: 0.2rem;
		width: 100%;
		padding: 0.5rem 1rem;
		color: white;
	}
</style>
