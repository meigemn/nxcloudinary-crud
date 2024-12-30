'use client'
import InputImage from '@/components/InputImage';
import { imgUpdate, imgDelete } from '@/lib/actions';
import { RotateCw, Trash } from 'lucide-react';
import { useActionState, useEffect } from "react";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';  // IMPORTANTE: No importar desde next/router



function ImageEdit({ img }) {
    const { refresh } = useRouter()


    const [stateUpdate, actionUpdate, pendingUpdate] = useActionState(imgUpdate, null)
    const [stateDelete, actionDelete, pendingDelete] = useActionState(imgDelete, null)

    useEffect(() => {
        if (stateUpdate?.success) toast.success(stateUpdate.success)
        if (stateUpdate?.error) toast.error(stateUpdate.error)
        refresh()
    }, [stateUpdate])


    useEffect(() => {
        if (stateDelete?.success) toast.success(stateDelete.success)
        if (stateDelete?.error) toast.error(stateDelete.error)
        refresh()
    }, [stateDelete])

    return (
        <form id="preview" className='w-fit relative'>
            <input type='hidden' name='public_id' value={img.public_id} />
            <InputImage img={img.secure_url} />

            <button formAction={actionUpdate} title='ACTUALIZAR'
                className={`absolute bottom-12 right-2 p-1 bg-yellow-500 text-white hover:text-yellow-900 rounded-full ${pendingUpdate && 'animate-ping'}`}>
                <RotateCw />
            </button>
            <button formAction={actionDelete} title='ELIMINAR'
                className={`absolute bottom-2 right-2 p-1 bg-red-500 text-white hover:text-red-900 rounded-full ${pendingDelete && 'animate-ping'}`}>
                <Trash />
            </button>

        </form>
    );
}

export default ImageEdit;