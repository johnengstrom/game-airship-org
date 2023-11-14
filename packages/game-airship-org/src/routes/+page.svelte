<script>
	import Backdrop from '$lib/Backdrop.svelte';
</script>

<div class="modal modal-open">
	<div class="modal-box">
		<form class="form-control">
			<!-- Username Field -->
			<label for="username" class="label">
				<span class="label-text">Username</span>
			</label>
			<input type="text" id="username" placeholder="Username" class="input input-bordered" />

			<!-- Password Field -->
			<label for="password" class="label">
				<span class="label-text">Password</span>
			</label>
			<input type="password" id="password" placeholder="Password" class="input input-bordered" />

			<!-- Submit Button -->
			<button type="submit" class="btn btn-primary mt-4">Login</button>
		</form>

		<!-- Sign Up Link -->
		<div class="modal-action">
			<a href="/signup" class="link link-secondary">Create Account</a>
		</div>
	</div>
</div>

<Backdrop />
