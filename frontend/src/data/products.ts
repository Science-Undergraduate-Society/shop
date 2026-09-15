import { Product } from '@/lib/types'

const PLACEHOLDER_IMAGE = '/background-stem.svg'

export const products: Product[] = [
  {
    id: 'letterman',
    name: 'Letterman Jacket',
    displayName: 'Our Brand New Letterman Jackets!',
    squareLink: 'https://square.link/u/BmQGH8Hn',
    type: 'clothing',
    variations: [
      {
        color: 'darkBlue',
        price: 110,
        images: [
          '/merch_photos/letterman/letterman1.JPG',
          '/merch_photos/letterman/letterman2.JPG',
          '/merch_photos/letterman/letterman3.JPG',
          '/merch_photos/letterman/letterman4.JPG'
        ],
        sizes: { XS: true, S: true, M: false, L: true, XL: true }
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
    variations: [
      {
        color: 'black',
        price: 40.50,
        images: [
          '/merch_photos/hoodies/black-hoodie.png'
        ],
        sizes: { S: false, M: false, L: false, XL: true }
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
        sizes: { S: true, M: false, L: false, XL: true }
      },
      // {
      //   color: 'greyWhite',
      //   price: 40.50,
      //   images: [
      //     '/merch_photos/hoodies/grey-hoodie.png',
      //     '/merch_photos/hoodies/hoodie-grey-spotlight.jpeg'
      //   ],
      //   sizes: { S: false, M: false, L: false, XL: false }
      // },
      {
        color: 'lightBlue',
        price: 65,
        images: [
          '/merch_photos/hoodies/blue-hoodie.jpg',
          '/merch_photos/hoodies/blue-hoodie-2.jpg',
          '/merch_photos/hoodies/blue-pink-hoodie.jpg'
        ],
        sizes: { S: true, M: true, L: true, XL: true }
      },
      // {
      //   color: 'sand',
      //   price: 40.50,
      //   images: [
      //     '/merch_photos/hoodies/sand-hoodie.png'
      //   ],
      //   sizes: { S: false, M: false, L: false, XL: false }
      // },
      {
        color: 'pink',
        price: 65,
        images: [
          '/merch_photos/hoodies/pink-hoodie.jpg',
          '/merch_photos/hoodies/blue-pink-hoodie.jpg'
        ],
        sizes: { S: true, M: false, L: true, XL: false }
      }
    ]
  },
  {
    id: 'crewnecks',
    name: 'Crewnecks',
    displayName: 'Classic Science UBC Crewnecks',
    squareLink: 'https://square.link/u/ZJ3dsVO6',
    type: 'clothing',
    variations: [
      {
        color: 'black',
        price: 35.50,
        images: [
          '/merch_photos/crewnecks/black-crew.png'
        ],
        sizes: { S: false, M: false, L: false, XL: true }
      },
      {
        color: 'white',
        price: 35.50,
        images: [
          '/merch_photos/crewnecks/white-crew.jpg'
        ],
        sizes: { S: false, M: false, L: false, XL: true }
      },
      {
        color: 'greyYellow',
        price: 35.50,
        images: [
          '/merch_photos/crewnecks/grey-crew.png'
        ],
        sizes: { S: false, M: true, L: false, XL: true }
      },
      // {
      //   color: 'greyWhite',
      //   price: 35.50,
      //   images: [
      //     '/merch_photos/crewnecks/grey-crew.png'
      //   ],
      //   sizes: { S: false, M: false, L: false, XL: true }
      // },
      {
        color: 'lightBlue',
        price: 55,
        images: [
          '/merch_photos/crewnecks/blue-crew.jpg'
        ],
        sizes: { S: true, M: true, L: true, XL: true }
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
        price: 55,
        images: [
          '/merch_photos/crewnecks/pink-crew.jpg',
          '/merch_photos/crewnecks/pink-crew-2.jpg'
        ],
        sizes: { S: true, M: true, L: true, XL: true }
      }
    ]
  },
  {
    id: 'quarter-zips',
    name: 'Quarter-Zips',
    displayName: 'Our Brand New Quarter Zips!',
    squareLink: 'https://square.link/u/hmpALI2E',
    type: 'clothing',
    variations: [
      {
        color: 'darkBlue',
        price: 50,
        images: [
          '/merch_photos/quarter_zips/quarter1.JPG',
          '/merch_photos/quarter_zips/quarter2.JPG',
          '/merch_photos/quarter_zips/quarter3.JPG'
        ],
        sizes: { S: false, M: false, L: false, XL: false }
      }
    ]
  },
  {
    id: 'shorts',
    name: 'Shorts',
    displayName: 'Shorts',
    squareLink: 'https://square.link/u/J4oVswle',
    type: 'clothing',
    variations: [
      {
        color: 'white',
        price: 30,
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
    variations: [
      {
        id: 'astr-patch',
        name: 'Astronomy Patch',
        price: 4,
        inStock: true,
        images: [
          '/merch_photos/patches/departmental_patches/astr.png'
        ]
      },
      {
        id: 'bioc-patch',
        name: 'Biochemistry Patch',
        price: 4,
        inStock: true,
        images: [
          '/merch_photos/patches/departmental_patches/bioc.png'
        ]
      },
      // {
      //   id: 'biol-patch',
      //   name: 'Biology Patch',
      //   price: 4,
      //   inStock: false,
      //   images: [
      //     '/merch_photos/patches/departmental_patches/biol.png'
      //   ]
      // },
      {
        id: 'bota-patch',
        name: 'Botany Patch',
        price: 4,
        inStock: true,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'caps-patch',
        name: 'Cellular, Anatomical, and Physiological Science Patch',
        price: 4,
        inStock: true,
        images: [
          '/merch_photos/patches/departmental_patches/caps.png'
        ]
      },
      {
        id: 'chem-patch',
        name: 'Chemistry Patch',
        price: 4,
        inStock: true,
        images: [
          '/merch_photos/patches/departmental_patches/chem.png'
        ]
      },
      {
        id: 'cogs-patch',
        name: 'Cognitive Systems Patch',
        price: 4,
        inStock: true,
        images: [
          '/merch_photos/patches/departmental_patches/cogs.png'
        ]
      },
      // {
      //   id: 'cpsc-patch',
      //   name: 'Computer Science Patch',
      //   price: 4,
      //   inStock: false,
      //   images: [
      //     '/merch_photos/patches/departmental_patches/cpsc.png'
      //   ]
      // },
      {
        id: 'envr-patch',
        name: 'Environmental Science Patch',
        price: 4,
        inStock: true,
        images: [
          '/merch_photos/patches/departmental_patches/envr.png'
        ]
      },
      // {
      //   id: 'eosc-patch',
      //   name: 'Earth and Ocean Science Patch',
      //   price: 4,
      //   inStock: false,
      //   images: [
      //     '/merch_photos/patches/departmental_patches/eosc.png'
      //   ]
      // },
      {
        id: 'isci-patch',
        name: 'Integrated Sciences Patch',
        price: 4,
        inStock: true,
        images: [
          '/merch_photos/patches/departmental_patches/isci.png'
        ]
      },
      {
        id: 'math-patch',
        name: 'Math Patch',
        price: 4,
        inStock: true,
        images: [
          '/merch_photos/patches/departmental_patches/math.png'
        ]
      },
      {
        id: 'micb-patch',
        name: 'Microbiology and Immunology Patch',
        price: 4,
        inStock: true,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'nsci-patch',
        name: 'Neuroscience Patch',
        price: 4,
        inStock: true,
        images: [
          '/merch_photos/patches/departmental_patches/nsci.png'
        ]
      },
      // {
      //   id: 'phys-patch',
      //   name: 'Physics Patch',
      //   price: 4,
      //   inStock: false,
      //   images: [
      //     PLACEHOLDER_IMAGE
      //   ]
      // }
    ]
  },
  {
    id: 'novelty-patches',
    name: 'Novelty Patches',
    displayName: 'Novelty Patches',
    squareLink: '',
    type: 'accessory',
    thumbnail: '/merch_photos/patches/novelty_patches/cherry_blossom.png',
    variations: [
      // {
      //   id: 'cherry-blossom-patch',
      //   name: 'Cherry Blossom Patch',
      //   price: 3.50,
      //   inStock: false,
      //   images: [
      //     '/merch_photos/patches/novelty_patches/cherry_blossom.png'
      //   ]
      // },
      // {
      //   id: 'coffee-patch',
      //   name: 'Coffee Patch',
      //   price: 3.50,
      //   inStock: false,
      //   images: [
      //     '/merch_photos/patches/novelty_patches/coffee.png'
      //   ]
      // },
      // {
      //   id: 'mountain-patch',
      //   name: 'Mountain Patch',
      //   price: 3.50,
      //   inStock: false,
      //   images: [
      //     PLACEHOLDER_IMAGE
      //   ]
      // },
      // {
      //   id: 'rose-garden-patch',
      //   name: 'Rose Garden Patch',
      //   price: 3.50,
      //   inStock: false,
      //   images: [
      //     PLACEHOLDER_IMAGE
      //   ]
      // },
      {
        id: 'sus-patch-blue',
        name: 'SUS Patch Blue',
        price: 3,
        inStock: true,
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'sus-patch-gold',
        name: 'SUS Patch Gold',
        price: 3,
        inStock: true,
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
    variations: [
      {
        id: 'grad-patch',
        name: 'Grad Patch',
        price: 3.00,
        inStock: true,
        images: [
          '/merch_photos/patches/earned_patches/grad.png'
        ]
      }
    ]
  }
]
