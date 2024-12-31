import { imgRetrieveAll } from '@/lib/actions';
import ImageEdit from '@/components/ImageEdit';



async function Galeria() {

  try {
    const images = await imgRetrieveAll();
    return (
      <div className='grid grid-cols-[repeat(auto-fit,324px)] gap-4'>
        {images.map(img => <ImageEdit key={img.public_id} img={img} />)}
      </div>
    )
  }
  catch (error) {
    return <div className='text-red-400'>{error.message}</div>
  }

}

export default Galeria