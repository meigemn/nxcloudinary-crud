import { imgRetrieveAll } from '@/lib/actions';
import ImageEdit from '@/components/ImageEdit';

async function Galeria() {
  const images = await imgRetrieveAll();

  return (
    <div className='grid grid-cols-[repeat(auto-fit,324px)] gap-4'>
      {
        images.resources.map(img => <ImageEdit key={img.public_id} img={img} />)
      }
    </div>
  )
}

export default Galeria