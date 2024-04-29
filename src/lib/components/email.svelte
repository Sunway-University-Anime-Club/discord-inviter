<script lang="ts">
	import { Button, Heading, Html, Img, Link, Text } from 'svelte-email';

	export let invite: string;
	export let logo: string;

	const fontFamily = 'Arial, Helvetica, sans-serif';
</script>

<Html lang="en">
	<Text style={{ fontFamily }}>Dear SUAC Member,</Text>

	<Text style={{ fontFamily }}>
		You have requested for an invite to the Discord server. Click the button below to join. You may
		use this link if the button does not work:
		<Link style={{ fontFamily }} href={invite}>{invite}</Link>.
	</Text>

	<Text style={{ fontFamily }}
		>The invite link can only be used once and will expire in 30 minutes.</Text
	>

	<Text style={{ fontFamily }}>You may ignore this email if you did not send this request.</Text>

	<Button
		href={invite}
		style={{
			color: 'white',
			backgroundColor: 'orange',
			padding: '1rem',
			borderRadius: '0.2rem',
			fontFamily
		}}
	>
		Join SUAC Discord
	</Button>

	<!-- Signature -->
	<Text style={{ fontFamily }}>Best regards,</Text>
	<table>
		<!-- LOGO | Sign -->
		<!-- LOGO | Instagram -->
		<tr>
			<th style="margin-right: 5px; font-weight: normal" align="left">
				<Img src={logo} alt="suac logo" width="81.1" height="87.6" />
			</th>

			<th style="margin-left: 5px; font-weight: normal" align="left">
				<Heading as="h3" style={{ color: 'orange', margin: 0, fontFamily, lineHeight: 'normal' }}>
					William Law Hong Waye
				</Heading>
				<Text style={{ fontStyle: 'italic', margin: 0, fontFamily, lineHeight: 'normal' }}
					>IT Manager, 2023/2024</Text
				>
				<Text style={{ fontStyle: 'italic', margin: 0, fontFamily, lineHeight: 'normal' }}>
					Sunway University Anime Club (SUAC)
				</Text>

				<hr style="borderColor: #cccccc; margin: 5px 0 8px" />

				<Text
					style={{
						color: 'orange',
						margin: 0,
						fontWeight: 'bold',
						fontFamily,
						lineHeight: 'normal'
					}}
				>
					Instagram:
					<Link
						style={{
							fontWeight: 'normal',
							textDecoration: 'underline',
							fontFamily,
							lineHeight: 'normal'
						}}
						href="https://www.instagram.com/sunway_animeclub/"
					>
						@sunway_animeclub
					</Link>
				</Text>
			</th>
		</tr>
	</table>
</Html>
