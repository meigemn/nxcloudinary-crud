'use client'
import InputImage from '@/components/InputImage';
import { imgUpdate, imgDelete } from '@/lib/actions';
import { Eye, RotateCw, Trash } from 'lucide-react';
import { useActionState, useEffect } from "react";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';  // IMPORTANTE: No importar desde next/router
import { useId } from 'react';



function ImageEdit({ img }) {
    const { refresh } = useRouter()
    const dialogId = useId()

    const [stateUpdate, actionUpdate, pendingUpdate] = useActionState(imgUpdate, {})
    const [stateDelete, actionDelete, pendingDelete] = useActionState(imgDelete, {})

    useEffect(() => {
        stateUpdate.success && toast.success(stateUpdate.success)
        stateUpdate.error && toast.error(stateUpdate.error)
    }, [stateUpdate])


    useEffect(() => {
        stateDelete.success && toast.success(stateDelete.success)
        stateDelete.error && toast.error(stateDelete.error)
        refresh()     // refrescamos página después de mostrar mensaje de success o error
    }, [stateDelete])

    return (
        <form className='w-fit relative'>
            <input type='hidden' name='public_id' value={img.public_id} />

            <InputImage image={img.secure_url} />
            {/* icono de ojo para ver imagen */}
            <div
                onClick={() => document.getElementById(dialogId).showModal()}
                className={`absolute bottom-[88px] right-2 p-1 border border-slate-300 bg-blue-400 text-white hover:bg-blue-500 rounded-full transition-transform duration-300 hover:scale-125`}>
                <Eye />
            </div>
            <dialog
                id={dialogId}
                onClick={() => document.getElementById(dialogId).close()}
                className='backdrop:bg-black/50 backdrop:backdrop-blur-none'>
                <img src={img.secure_url} alt="view" />
            </dialog>
            {/* Icono recargar */}
            <button formAction={actionUpdate} title='ACTUALIZAR' disabled={pendingUpdate}
                className={`absolute bottom-[48px] right-2 p-1 border border-slate-300 bg-yellow-400 text-white hover:bg-yellow-500 rounded-full disabled:bg-slate-400 transition-transform duration-300 hover:scale-125`}>
                <RotateCw />
            </button>
            {/* Icono papelera */}
            <button formAction={actionDelete} title='ELIMINAR' disabled={pendingDelete}
                className={`absolute bottom-[8px] right-2 p-1 border border-slate-300 bg-red-400 text-white hover:bg-red-500 rounded-full disabled:bg-slate-400 transition-transform duration-300 hover:scale-125`}>
                <Trash />
            </button>

        </form>
    );
}

export default ImageEdit;