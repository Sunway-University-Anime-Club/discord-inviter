<script lang="ts">
	import { Button, Html, Link, Text } from 'svelte-email';

	export let invite: string;
</script>

<Html lang="en">
	<Text>Dear SUAC Member,</Text>

	<Text>
		You have requested for an invite to the Discord server. Click the button below to join. You may
		use this link if the button does not work:
		<Link class="btn" href={invite}>{invite}</Link>
	</Text>

	<Text>The invite link can only be used once and will expire in 30 minutes.</Text>

	<Text>You may ignore this email if you did not send this request.</Text>

	<Button
		href={invite}
		style={{ color: 'white', backgroundColor: 'orange', padding: '1rem', borderRadius: '0.2rem' }}
	>
		Join SUAC Discord
	</Button>
</Html>
