import { Product } from '@/lib/types'

const PLACEHOLDER_IMAGE = '/background-stem.svg'

export const products: Product[] = [
  {
    id: 'letterman',
    name: 'Letterman Jacket',
    displayName: 'Our Brand New Letterman Jackets!',
    squareLink: 'https://square.link/u/BmQGH8Hn',
    type: 'clothing',
    variants: [
      {
        color: 'darkBlue',
        price: 80,
        images: [
          '/merch_photos/letterman/letterman1.jpg',
          '/merch_photos/letterman/letterman2.jpg',
          '/merch_photos/letterman/letterman3.jpg',
          '/merch_photos/letterman/letterman4.jpg',
          '/merch_photos/letterman/letterman5.jpg'
        ],
        sizes: { S: false, M: false, L: true, XL: true }
      }
    ],
    new: true
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    displayName: 'Classic Science UBC Hoodie',
    squareLink: 'https://square.link/u/7KUecbTU',
    type: 'clothing',
    variants: [
      {
        color: 'black',
        price: 40.50,
        images: [
          '/merch_photos/hoodies/black-hoodie.png'
        ],
        sizes: { S: true, M: false, L: false, XL: false }
      },
      {
        color: 'white',
        price: 40.50,
        images: [
          '/merch_photos/hoodies/white-hoodie.png'
        ],
        sizes: { S: true, M: false, L: true, XL: true }
      },
      {
        color: 'greyYellow',
        price: 40.50,
        images: [
          '/merch_photos/hoodies/grey-hoodie.png',
          '/merch_photos/hoodies/hoodie-grey-spotlight.jpeg'
        ],
        sizes: { S: true, M: false, L: false, XL: false }
      },
      {
        color: 'greyWhite',
        price: 40.50,
        images: [
          '/merch_photos/hoodies/grey-hoodie.png',
          '/merch_photos/hoodies/hoodie-grey-spotlight.jpeg'
        ],
        sizes: { S: false, M: false, L: false, XL: false }
      },
      {
        color: 'lightBlue',
        price: 40.50,
        images: [
          '/merch_photos/hoodies/blue-hoodie.png'
        ],
        sizes: { S: false, M: false, L: true, XL: true }
      },
      {
        color: 'sand',
        price: 40.50,
        images: [
          '/merch_photos/hoodies/sand-hoodie.png'
        ],
        sizes: { S: false, M: false, L: false, XL: false }
      },
      {
        color: 'pink',
        price: 55,
        images: [
          '/merch_photos/hoodies/pink-hoodie.jpg'
        ],
        sizes: { S: false, M: false, L: false, XL: false }
      }
    ]
  },
  {
    id: 'crewnecks',
    name: 'Crewnecks',
    displayName: 'Classic Science UBC Crewnecks',
    squareLink: 'https://square.link/u/ZJ3dsVO6',
    type: 'clothing',
    variants: [
      {
        color: 'black',
        price: 35.50,
        images: [
          '/merch_photos/crewnecks/black-crew.png'
        ],
        sizes: { S: false, M: false, L: true, XL: true }
      },
      {
        color: 'white',
        price: 35.50,
        images: [
          PLACEHOLDER_IMAGE
        ],
        sizes: { S: true, M: true, L: true, XL: true }
      },
      {
        color: 'greyYellow',
        price: 35.50,
        images: [
          '/merch_photos/crewnecks/grey-crew.png'
        ],
        sizes: { S: true, M: false, L: true, XL: true }
      },
      {
        color: 'greyWhite',
        price: 35.50,
        images: [
          '/merch_photos/crewnecks/grey-crew.png'
        ],
        sizes: { S: false, M: false, L: false, XL: true }
      },
      {
        color: 'lightBlue',
        price: 35.50,
        images: [
          '/merch_photos/crewnecks/blue-crew.png'
        ],
        sizes: { S: false, M: false, L: true, XL: true }
      },
      {
        color: 'sand',
        price: 35.50,
        images: [
          '/merch_photos/crewnecks/sand-crew.png'
        ],
        sizes: { S: false, M: false, L: false, XL: true }
      },
      {
        color: 'pink',
        price: 45,
        images: [
          '/merch_photos/crewnecks/pink-crew.jpg'
        ],
        sizes: { S: false, M: false, L: false, XL: false }
      }
    ]
  },
  {
    id: 'quarter-zips',
    name: 'Quarter-Zips',
    displayName: 'Our Brand New Quarter Zips!',
    squareLink: 'https://square.link/u/hmpALI2E',
    type: 'clothing',
    variants: [
      {
        color: 'darkBlue',
        price: 50,
        images: [
          '/merch_photos/quarter_zips/quarter1.jpg',
          '/merch_photos/quarter_zips/quarter2.jpg',
          '/merch_photos/quarter_zips/quarter3.jpg'
        ],
        sizes: { S: true, M: true, L: true, XL: true }
      }
    ]
  },
  {
    id: 'shorts',
    name: 'Shorts',
    displayName: 'Shorts',
    squareLink: 'https://square.link/u/J4oVswle',
    type: 'clothing',
    variants: [
      {
        color: 'white',
        price: 45,
        images: [
          '/merch_photos/shorts/shorts-grass.jpeg',
          '/merch_photos/shorts/shorts-group.jpeg',
          '/merch_photos/shorts/shorts-m.jpeg',
          '/merch_photos/shorts/shorts-f.jpeg'
        ],
        sizes: { S: true, M: true, L: true, XL: false }
      }
    ]
  },
  {
    id: 'departmental-patches',
    name: 'Departmental Patches',
    displayName: 'Departmental Patches',
    squareLink: '',
    type: 'accessory',
    thumbnail: '/merch_photos/patches/departmental_patches/biol.png',
    variants: [
      {
        id: 'astr-patch',
        name: 'Astronomy Patch',
        price: 4,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'biol-patch',
        name: 'Biology Patch',
        price: 4,
        inStock: false,
        images: [
          '/merch_photos/patches/departmental_patches/biol.png'
        ]
      },
      {
        id: 'bota-patch',
        name: 'Botany Patch',
        price: 4,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'caps-patch',
        name: 'Cellular, Anatomical, and Physiological Science Patch',
        price: 4,
        inStock: false,
        images: [
          '/merch_photos/patches/departmental_patches/caps.png'
        ]
      },
      {
        id: 'chem-patch',
        name: 'Chemistry Patch',
        price: 4,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'cs-patch',
        name: 'Computer Science Patch',
        price: 4,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'eosc-patch',
        name: 'Earth and Ocean Science Patch',
        price: 4,
        inStock: false,
        images: [
          '/merch_photos/patches/departmental_patches/eosc.png'
        ]
      },
      {
        id: 'math-patch',
        name: 'Math Patch',
        price: 4,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'micb-patch',
        name: 'Microbiology and Immunology Patch',
        price: 4,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'nsci-patch',
        name: 'Neuroscience Patch',
        price: 4,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'phys-patch',
        name: 'Physics Patch',
        price: 4,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      }
    ]
  },
  {
    id: 'novelty-patches',
    name: 'Novelty Patches',
    displayName: 'Novelty Patches',
    squareLink: '',
    type: 'accessory',
    thumbnail: '/merch_photos/patches/novelty_patches/cherry_blossom.png',
    variants: [
      {
        id: 'cherry-blossom-patch',
        name: 'Cherry Blossom Patch',
        price: 3.50,
        inStock: false,
        images: [
          '/merch_photos/patches/novelty_patches/cherry_blossom.png'
        ]
      },
      {
        id: 'coffee-patch',
        name: 'Coffee Patch',
        price: 3.50,
        inStock: false,
        images: [
          '/merch_photos/patches/novelty_patches/coffee.png'
        ]
      },
      {
        id: 'mountain-patch',
        name: 'Mountain Patch',
        price: 3.50,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'rose-garden-patch',
        name: 'Rose Garden Patch',
        price: 3.50,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'sus-patch-blue',
        name: 'SUS Patch Blue',
        price: 3,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'sus-patch-gold',
        name: 'SUS Patch Gold',
        price: 4,
        inStock: false,
        images: [
          PLACEHOLDER_IMAGE
        ]
      }
    ]
  },
  {
    id: 'earned-patches',
    name: 'Earned Patches',
    displayName: 'Earned Patches',
    squareLink: '',
    type: 'accessory',
    thumbnail: '/merch_photos/patches/earned_patches/grad.png',
    variants: [
      {
        id: 'grad-patch',
        name: 'Grad Patch',
        price: 3.50,
        inStock: false,
        images: [
          '/merch_photos/patches/earned_patches/grad.png'
        ]
      }
    ]
  }
]
