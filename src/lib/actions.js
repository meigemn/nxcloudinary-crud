'use server'
import cloudinary from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache';

/*
OPERACIONES CRUD

C: CREATE -> imgCreate
R: READ   -> imgRetrieveAll
U: UPDATE -> imgUpdate
D: DELETE -> imgDelete

*/


export async function imgCreate(formData) {
  const file = formData.get('file')

  // console.log(file);

  const fileBuffer = await file.arrayBuffer();

  let mime = file.type;
  let encoding = 'base64';
  let base64Data = Buffer.from(fileBuffer).toString('base64');
  let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  try {
    // Transformamos imagen al subirla
    // width: 600, height: 370, aspect-ratio: 1.62
    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      asset_folder: "galeria",
      public_id: file.name,
      aspect_ratio: "1.62",
      width: 600,
      crop: "fill",
      gravity: "center"
    })

    revalidatePath('/');
    return { type: 'success', message: `Imagen subida a ${result.public_id}` }
  } catch (error) {
    return { type: 'error', message: error.message }
  }
}




export async function imgRetrieveAll() {
  // legacy fixed folders
  const result = await cloudinary.api.resources({
    max_results: 500,
    type: 'upload',
    prefix: 'galeria'
  });

  // new dynamic folders
  // const result = await cloudinary.api.resources_by_asset_folder('galeria', {
  //   max_results: 500,
  //   type: 'upload',
  // });


  return result;
}




async function imgRetrieve(formData) {
  const public_id = formData.get('public_id')
  const result = await cloudinary.api.resource(public_id, {});

  return result;
}




export async function imgUpdate(formData) {
  const public_id = formData.get('public_id')
  const file = formData.get('file')

  const fileBuffer = await file.arrayBuffer();

  let mime = file.type;
  let encoding = 'base64';
  let base64Data = Buffer.from(fileBuffer).toString('base64');
  let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  try {
    // Transformamos imagen al subirla
    // width: 600, height: 370, aspect-ratio: 1.62
    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      asset_folder: "galeria",
      public_id,
      aspect_ratio: "1.62",
      width: 600,
      crop: "fill",
      gravity: "center"
    })

    revalidatePath('/');
    return { type: 'success', message: `Imagen actualizada ${result.public_id}` }
  } catch (error) {
    return { type: 'error', message: error.message }
  }
}




export async function imgDelete(formData) {
  const public_id = formData.get('public_id')

  console.log(public_id);

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    console.log(result);
    revalidatePath('/');
    return { type: 'success', message: `Imagen eliminada de ${public_id}` }
  } catch (error) {
    console.log(error);
    return { type: 'error', message: error.message }
  }
}
