import { imgRetrieveAll } from '@/lib/actions';
import ImageEdit from '@/components/ImageEdit';

async function Galeria() {
  const images = await imgRetrieveAll();

  return (
    <div className='flex justify-center items-center'>
      <div className='flex gap-6 overflow-x-auto p-4'>
        {images.map((img) => (
          <div
            key={img.public_id}
            className='rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300'
          >
            <ImageEdit img={img} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galeria;
