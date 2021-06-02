<script>
	let files;

	let info = "";

	async function onClick(event) {
		// TODO
		info = "processing"
		
		var fileURL = window.URL.createObjectURL(files[0]);
		var fileLink = document.createElement('a');

		fileLink.href = fileURL;
		fileLink.setAttribute('download', 'file.pdf');
		document.body.appendChild(fileLink);

		fileLink.click();
		info = "done"

	}
</script>

<main class="w-full h-screen flex flex-col justify-center items-center">
	<h1 class="text-3xl mb-10">File compression</h1>
	<div class="flex flex-col justify-between p-5">
		<label class="mb-5" for="file">Upload a file to compress:</label>
		<input
			class="mb-5"
			bind:files
			name="file"
			type="file"
		/>
		<button class="mb-5" on:click={onClick}>Send file</button>
		<p>{info}</p>
	</div>
</main>

<style>
	* {
		border: solid 1px
	}
</style>

<!-- disabled={!files} -->