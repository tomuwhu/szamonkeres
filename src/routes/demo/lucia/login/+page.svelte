<script >
	import { enhance } from '$app/forms';
	
	let { form } = $props();
</script>

<h1>Login/Register</h1>
<form method='post' action='?/login' use:enhance>
	<div class="ui input">
		<div class="ui label">Felhasználónév</div>
		<input name='username' />
	</div>
	<div class="ui input">
		<div class="ui label">Jelszó</div>
		<input type='password' name='password' />
	</div>
	<button class="ui button">Login</button>
	<button class="ui button" formaction='?/register'>Register</button>
</form>
<p style='color: red'>{form?.message ?? ''}</p>
