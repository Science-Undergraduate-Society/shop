import Image from 'next/image'
import styles from './ProductGallery.module.css'

export default function ProductGallery({
  image,
  thumbnails,
  onSelect
}: {
  image: string
  thumbnails: string[]
  onSelect: (thumbnail: string) => void
}) {
  return (
    <div className={styles.productGallery}>
      <div className={styles.thumbnails}>
        {thumbnails.map(thumbnail => (
          <div
            key={thumbnail}
            className={styles.thumbnail}
          >
            <Image
              src={thumbnail}
              alt={thumbnail}
              fill
              className={image === thumbnail ? styles.selected : ''}
              draggable="false"
              onClick={() => onSelect(thumbnail)}
            />
          </div>
        ))}
      </div>
      <Image
        src={image}
        alt={image}
        width={10000}
        height={0}
        className={styles.image}
        draggable="false"
      />
    </div>
  )
}
