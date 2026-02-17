export async function uploadImage(file) {
  if (!file) return null;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "for_febi_upload");

  const res = await fetch("https://api.cloudinary.com/v1_1/dlwooagms/image/upload", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data.secure_url;
}
