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
    }, [stateUpdate])


    useEffect(() => {
        if (stateDelete?.success) toast.success(stateDelete.success)
        if (stateDelete?.error) toast.error(stateDelete.error)
        refresh()     // refrescamos página después de mostrar mensaje de success o error
    }, [stateDelete])

    return (
        <form className='w-fit relative'>
            <input type='hidden' name='public_id' value={img.public_id} />
            <InputImage image={img.secure_url} />

            <button formAction={actionUpdate} title='ACTUALIZAR' disabled={pendingUpdate}
                className={`absolute bottom-12 right-2 p-1 border border-slate-300 bg-yellow-400 text-white hover:bg-yellow-500 rounded-full disabled:bg-slate-400`}>
                <RotateCw />
            </button>
            <button formAction={actionDelete} title='ELIMINAR' disabled={pendingDelete}
                className={`absolute bottom-2 right-2 p-1 border border-slate-300 bg-red-400 text-white hover:bg-red-500 rounded-full disabled:bg-slate-400`}>
                <Trash />
            </button>

        </form>
    );
}

export default ImageEdit;