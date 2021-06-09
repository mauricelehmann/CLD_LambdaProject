<script>
	let files;

	let info = "";

	async function onClick(event) {
		// TODO
		info = "processing"
		
		var fileLink = document.createElement('a');
		
			//https://98nq7nz23b.execute-api.us-east-1.amazonaws.com/default/compress
		//Send file to the compress backend api
		var data = new FormData()
		data.append('toCompressfile', files[0])
		const res = await fetch('https://98nq7nz23b.execute-api.us-east-1.amazonaws.com/default/compress', { method: 'POST',
			body: data
		}).then( res => res.blob() )
  		.then( blob => {
    		var fileURL = window.URL.createObjectURL(blob);
			fileLink.href = fileURL;
			fileLink.setAttribute('download', files[0].name + '.xz');
			document.body.appendChild(fileLink);

			fileLink.click();
			info = "done"
 		 });
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