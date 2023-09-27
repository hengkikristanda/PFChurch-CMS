const example_image_upload_handler = (blobInfo, progress) =>
	new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.open("POST", "/routes/uploads");

		/*
		xhr.upload.onprogress = (e) => {
			progress((e.loaded / e.total) * 100);
		};

		xhr.onload = () => {
			if (xhr.status === 403) {
				reject({ message: "HTTP Error: " + xhr.status, remove: true });
				return;
			}

			if (xhr.status < 200 || xhr.status >= 300) {
				reject("HTTP Error: " + xhr.status);
				return;
			}
			const json = JSON.parse(xhr.responseText);

			if (!json || typeof json.filename != "string") {
				reject("Invalid JSON: " + xhr.responseText);
				return;
			}
			resolve(json.filename);
		};

		resolve = (filename) => {
			console.log(filename);
		};
		*/

		xhr.onerror = () => {
			reject(
				`Image upload failed due to a XHR Transport error. Code: ${xhr.status}. Please contact the administrator.`
			);
		};

		const formData = new FormData();
		formData.append("attachedImage", blobInfo.blob(), blobInfo.filename());

		xhr.send(formData);
	});

tinymce.init({
	selector: "textarea",
	height: 700,
	plugins: "autolink charmap image link lists media table visualblocks wordcount checklist",
	toolbar:
		"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
	automatic_uploads: true,
	image_description: false,
	image_uploadtab: false,
	// images_upload_handler: example_image_upload_handler,
	image_title: false,
	images_file_types: "jpg,svg,webp,png",
	file_picker_types: "image",
	block_unsupported_drop: false,
	media_alt_source: false,
	media_live_embeds: true,
	// images_upload_url: "/routes/uploads", // Your Express.js endpoint for uploading images
	// images_upload_base_path: "/public/img/uploads", // Path where uploaded images will be stored
	// images_upload_credentials: true,
	// file_picker_callback: (cb, value, meta) => {
	// 	const input = document.createElement("input");
	// 	input.setAttribute("type", "file");
	// 	input.setAttribute("accept", "image/*");
	// 	input.setAttribute("name", "image");

	// 	input.addEventListener("change", (e) => {
	// 		const file = e.target.files[0];

	// 		const reader = new FileReader();
	// 		reader.addEventListener("load", () => {
	// 			const id = "blobid" + new Date().getTime();
	// 			const blobCache = tinymce.activeEditor.editorUpload.blobCache;
	// 			const base64 = reader.result.split(",")[1];
	// 			const blobInfo = blobCache.create(id, file, base64);
	// 			blobCache.add(blobInfo);

	// 			/* call the callback and populate the Title field with the file name */
	// 			cb(blobInfo.blobUri(), { image: file.name });
	// 		});
	// 		reader.readAsDataURL(file);
	// 	});

	// 	input.click();
	// },
	file_picker_callback: (cb, value, meta) => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");

		input.addEventListener("change", (e) => {
			const file = e.target.files[0];

			const reader = new FileReader();
			reader.addEventListener("load", () => {
				const id = "blobid_" + new Date().getTime();
				const blobCache = tinymce.activeEditor.editorUpload.blobCache;
				const base64 = reader.result.split(",")[1];
				const blobInfo = blobCache.create(id, file, base64);
				blobCache.add(blobInfo);

				cb(blobInfo.blobUri(), { title: file.name });
			});
			reader.readAsDataURL(file);
		});

		input.click();
	},
});
