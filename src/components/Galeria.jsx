'use client'
import InputImage from '@/components/InputImage';
import { imgCreate, imgUpdate, imgDelete } from '@/lib/actions';
import { RotateCw, Trash, CloudUpload } from 'lucide-react';
import { toast } from 'sonner';



function Galeria({ images }) {
  // console.log(images);

  async function crear(data) {
    const { type, message } = await imgCreate(data); // Server action: imgCreate
    if (type == 'success') toast.success(message)
    if (type == 'error') toast.error(message)
  }

  async function actualizar(data) {
    const { type, message } = await imgUpdate(data); // Server action: imgUpdate
    if (type == 'success') toast.success(message)
    if (type == 'error') toast.error(message)
  }

  async function eliminar(data) {
    const { type, message } = await imgDelete(data); // Server action: imgDelete
    if (type == 'success') toast.success(message)
    if (type == 'error') toast.error(message)
  }



  return (
    <>
      <form id="preview" >
        <InputImage img='image.png' />
        <button formAction={crear} title='SUBIR'> <CloudUpload /></button>
      </form>

      <h1 className='text-3xl font-bold text-blue-600'>Galería de imágenes</h1>
      <p>Para actualizar una imagen, arrastra y suelta sobre ella la nueva imagen, y luego pulsa en el botón <RotateCw className='inline' /></p>
      <br />

      <div className='galeria'>
        {images.resources.map(img => (
          <form id="preview" key={img.public_id} >
            <input type='hidden' name='public_id' value={img.public_id} />
            <InputImage img={img.secure_url} />

            <button formAction={actualizar} title='ACTUALIZAR'> <RotateCw /> </button>
            <button formAction={eliminar} title='ELIMINAR' > <Trash /></button>

          </form>
        ))
        }
      </div>
    </>
  )
}

export default Galeria