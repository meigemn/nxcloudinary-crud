'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='grid place-content-center min-h-screen'>
            <h2 className='text-red-400 text-2xl font-bold'>Hubo una excepción no capturada</h2>
            <p className='text-red-700'>¿Has intentado subir una imagen mayor de 4mb?</p>
            <p>{error.message}</p>
            <button className="px-4 py-2 border mt-4 rounded-md text-white bg-blue-500" onClick={() => reset()}>
                Intentar de nuevo
            </button>
        </div>
    )
}
