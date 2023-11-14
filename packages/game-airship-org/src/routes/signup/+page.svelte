<script>
	import Backdrop from '$lib/Backdrop.svelte';

	function createAccount(event) {
		event.preventDefault(); // Prevent default form submission
		const form = event.target;

		// Collecting form data
		const formData = {
			fullName: form.fullName.value,
			email: form.email.value,
			username: form.username.value,
			password: form.password.value,
			confirmPassword: form.confirmPassword.value,
			termsAndConditions: form.termsAndConditions.checked
		};

		// Log the form data as JSON
		console.log(formData);
	}
</script>

<div class="modal modal-open">
	<div class="modal-box">
		<form class="form-control" on:submit={createAccount}>
			<!-- Full Name Field -->
			<label for="full-name" class="label">
				<span class="label-text">Full Name</span>
			</label>
			<input
				type="text"
				name="fullName"
				id="full-name"
				placeholder="Full Name"
				class="input input-bordered"
			/>

			<!-- Email Field -->
			<label for="email" class="label">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="Email"
				class="input input-bordered"
			/>

			<!-- Username Field -->
			<label for="username" class="label">
				<span class="label-text">Username</span>
			</label>
			<input
				type="text"
				name="username"
				id="username"
				placeholder="Username"
				class="input input-bordered"
			/>

			<!-- Password Field -->
			<label for="password" class="label">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				name="password"
				id="password"
				placeholder="Password"
				class="input input-bordered"
			/>

			<!-- Confirm Password Field -->
			<label for="confirm-password" class="label">
				<span class="label-text">Confirm Password</span>
			</label>
			<input
				type="password"
				name="confirmPassword"
				id="confirm-password"
				placeholder="Confirm Password"
				class="input input-bordered"
			/>

			<!-- Terms and Conditions Checkbox -->
			<label class="label cursor-pointer">
				<span class="label-text"
					>I agree to the <a href="/terms-and-conditions" target="_blank" class="link link-primary"
						>Terms and Conditions</a
					></span
				>
				<input type="checkbox" name="termsAndConditions" class="checkbox checkbox-primary" />
			</label>

			<!-- Submit Button -->
			<button type="submit" class="btn btn-primary mt-4">Sign Up</button>
		</form>

		<!-- Login Link -->
		<div class="modal-action">
			<a href="/" class="link link-secondary">Already have an account? Log in</a>
		</div>
	</div>
</div>

<Backdrop />
