'use client'
import InputImage from "@/components/InputImage"
import { imgCreate } from '@/lib/actions';
import { CloudUpload } from 'lucide-react';
import { useActionState, useEffect } from "react";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";  // IMPORTANTE: No importar desde next/router


function ImageNew() {
    const { refresh } = useRouter()
    const [stateCreate, actionCreate, pendingCreate] = useActionState(imgCreate, null)


    useEffect(() => {
        if (stateCreate?.success) toast.success(stateCreate.success)
        if (stateCreate?.error) toast.error(stateCreate.error)
        refresh()
    }, [stateCreate])


    return (
        <form id="preview" className='w-fit relative mb-10'>
            <InputImage />
            <button formAction={actionCreate} title='SUBIR'
                className={`absolute bottom-2 right-2 p-1 bg-green-500 text-white hover:text-green-900 rounded-full ${pendingCreate && 'animate-ping'}`}>
                <CloudUpload />
            </button>
        </form>
    );
}

export default ImageNew;