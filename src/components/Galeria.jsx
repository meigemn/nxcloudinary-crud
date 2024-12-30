'use client'
import InputImage from '@/components/InputImage';
import { imgCreate, imgUpdate, imgDelete } from '@/lib/actions';
import { RotateCw, Trash, CloudUpload } from 'lucide-react';
import { useActionState, useEffect } from "react";
import { toast } from 'sonner';



function Galeria({ images }) {

  const [stateCreate, actionCreate, pendingCreate] = useActionState(imgCreate, null)
  const [stateUpdate, actionUpdate, pendingUpdate] = useActionState(imgUpdate, null)
  const [stateDelete, actionDelete, pendingDelete] = useActionState(imgDelete, null)


  useEffect(() => {
    if (stateCreate?.success) toast.success(stateCreate.success)
    if (stateCreate?.error) toast.error(stateCreate.error)
  }, [stateCreate])


  useEffect(() => {
    if (stateUpdate?.success) toast.success(stateUpdate.success)
    if (stateUpdate?.error) toast.error(stateUpdate.error)
  }, [stateUpdate])


  useEffect(() => {
    if (stateDelete?.success) toast.success(stateDelete.success)
    if (stateDelete?.error) toast.error(stateDelete.error)
  }, [stateDelete])



  return (
    <>
      <h1 className='text-3xl font-bold text-blue-600'>Galería de imágenes</h1>
      <p>Para actualizar una imagen, arrastra y suelta sobre ella la nueva imagen, y luego pulsa en el botón <RotateCw className='inline' /></p>
      <br />

      <form id="preview" className='w-fit relative mb-10'>
        <InputImage img='image.png' />
        <button formAction={actionCreate} title='SUBIR'
          className={`absolute bottom-2 right-2 p-1 bg-green-500 text-white hover:text-green-900 rounded-full ${pendingCreate && 'animate-pulse'}`}>
          <CloudUpload />
        </button>
      </form>


      <div className='grid grid-cols-[repeat(auto-fill,minmax(324px,1fr))] gap-4'>
        {images.resources.map(img => (
          <form id="preview" key={img.public_id} className='w-fit relative'>
            <input type='hidden' name='public_id' value={img.public_id} />
            <InputImage img={img.secure_url} />

            <button formAction={actionUpdate} title='ACTUALIZAR'
              className={`absolute bottom-12 right-2 p-1 bg-yellow-500 text-white hover:text-yellow-900 rounded-full ${pendingUpdate && 'animate-pulse'}`}>
              <RotateCw />
            </button>
            <button formAction={actionDelete} title='ELIMINAR'
              className={`absolute bottom-2 right-2 p-1 bg-red-500 text-white hover:text-red-900 rounded-full ${pendingDelete && 'animate-pulse'}`}>
              <Trash />
            </button>

          </form>
        ))
        }
      </div>
    </>
  )
}

export default Galeria