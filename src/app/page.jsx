import { RotateCw } from 'lucide-react';
import { Suspense } from 'react';
import Galeria from '@/components/Galeria';
import ImageNew from '@/components/ImageNew';


export const dynamic = 'force-dynamic'


export default function Home() {


  return (
    <main>
      <h1 className='text-3xl font-bold text-blue-600'>Galería de imágenes</h1>
      <p>Para actualizar una imagen, arrastra y suelta sobre ella la nueva imagen, y luego pulsa en el botón <RotateCw className='inline' /></p>
      <br />

      <ImageNew />

      <Suspense fallback={
        <p className='text-2xl font-bold text-blue-300 animate-pulse'>Obteniendo imágenes...</p>}
      >
        <Galeria />
      </Suspense>
    </main>
  )
}
