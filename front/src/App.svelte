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
		const res = await fetch('http://localhost:3000/compress', { method: 'POST',
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
	<div class="main shadow p-5">
		<h1 class="text-3xl mb-10 text-center w-full">File compression</h1>
		<div class="flex flex-col justify-between p-5">
			<label class="mb-5" for="file">Upload a file to compress:</label>
			<input
					class="mb-5"
					bind:files
					name="file"
					type="file"
			/>
			<button class="bg-blue-600 border-none px-5 py-3 text-white font-bold hover:bg-blue-800" on:click={onClick}>Send file</button>
			<p>{info}</p>
		</div>
	</div>
</main>

<div class="absolute bottom-0 w-full py-5 text-center text-gray-600">
	CLD - 2021 - AWS Lambda
</div>

<style>
	.main{
		background-color: white;
	}
</style>

<!-- disabled={!files} -->
