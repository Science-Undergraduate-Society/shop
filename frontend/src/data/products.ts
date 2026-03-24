import { Product } from '@/lib/types'

const PLACEHOLDER_IMAGE = '/background-stem.svg'

export const products: Product[] = [
  {
    id: 'letterman',
    name: 'Letterman Jacket',
    displayName: 'Our Brand New Letterman Jackets!',
    squareId: 'QHHDBDKNSO2IAQ3LATLVMMUE',
    type: 'clothing',
    variations: [
      {
        color: 'darkBlue',
        images: [
          '/merch_photos/letterman/letterman1.JPG',
          '/merch_photos/letterman/letterman2.JPG',
          '/merch_photos/letterman/letterman3.JPG',
          '/merch_photos/letterman/letterman4.JPG',
          '/merch_photos/letterman/letterman5.JPG'
        ],
        sizes: {
          S: { squareId: 'AB2EF3CXI374ASI43TQYQULE' },
          M: { squareId: 'TEP7FO6YI5K56EHQHXJQY74A' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      }
    ],
    new: true
  },
  {
    id: 'hoodies',
    name: 'Hoodies',
    displayName: 'Classic Science UBC Hoodie',
    squareId: 'MIIU73QFMT263BA2Q4AOXQJC',
    type: 'clothing',
    variations: [
      {
        color: 'black',
        images: [
          '/merch_photos/hoodies/black-hoodie.png'
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: 'TJK44NU2IJ6YXQOY2KWID6M6' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      },
      {
        color: 'white',
        images: [
          '/merch_photos/hoodies/white-hoodie.png'
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: '' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      },
      {
        color: 'greyYellow',
        images: [
          '/merch_photos/hoodies/grey-hoodie.png',
          '/merch_photos/hoodies/hoodie-grey-spotlight.jpeg'
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: '' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
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
        images: [
          '/merch_photos/hoodies/blue-hoodie.png'
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: '' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      },
      // {
      //   color: 'sand',
      //   price: 40.50,
      //   images: [
      //     '/merch_photos/hoodies/sand-hoodie.png'
      //   ],
      //   sizes: { S: false, M: false, L: false, XL: false }
      // },
      // {
      //   color: 'pink',
      //   price: 55,
      //   images: [
      //     '/merch_photos/hoodies/pink-hoodie.jpg'
      //   ],
      //   sizes: { S: false, M: false, L: false, XL: false }
      // }
    ]
  },
  {
    id: 'crewnecks',
    name: 'Crewnecks',
    displayName: 'Classic Science UBC Crewnecks',
    squareId: '',
    type: 'clothing',
    variations: [
      {
        color: 'black',
        images: [
          '/merch_photos/crewnecks/black-crew.png'
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: '' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      },
      {
        color: 'white',
        images: [
          PLACEHOLDER_IMAGE
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: '' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      },
      {
        color: 'greyYellow',
        images: [
          '/merch_photos/crewnecks/grey-crew.png'
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: '' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      },
      {
        color: 'greyWhite',
        images: [
          '/merch_photos/crewnecks/grey-crew.png'
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: '' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      },
      {
        color: 'lightBlue',
        images: [
          '/merch_photos/crewnecks/blue-crew.png'
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: '' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      },
      {
        color: 'sand',
        images: [
          '/merch_photos/crewnecks/sand-crew.png'
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: '' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      },
      // {
      //   color: 'pink',
      //   price: 45,
      //   images: [
      //     '/merch_photos/crewnecks/pink-crew.jpg'
      //   ],
      //   sizes: { S: false, M: false, L: false, XL: false }
      // }
    ]
  },
  {
    id: 'quarter-zips',
    name: 'Quarter-Zips',
    displayName: 'Our Brand New Quarter Zips!',
    squareId: '',
    type: 'clothing',
    variations: [
      {
        color: 'darkBlue',
        images: [
          '/merch_photos/quarter_zips/quarter1.JPG',
          '/merch_photos/quarter_zips/quarter2.JPG',
          '/merch_photos/quarter_zips/quarter3.JPG'
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: '' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      }
    ]
  },
  {
    id: 'shorts',
    name: 'Shorts',
    displayName: 'Shorts',
    squareId: '',
    type: 'clothing',
    variations: [
      {
        color: 'white',
        images: [
          '/merch_photos/shorts/shorts-grass.jpeg',
          '/merch_photos/shorts/shorts-group.jpeg',
          '/merch_photos/shorts/shorts-m.jpeg',
          '/merch_photos/shorts/shorts-f.jpeg'
        ],
        sizes: {
          S: { squareId: '' },
          M: { squareId: '' },
          L: { squareId: '' },
          XL: { squareId: '' }
        }
      }
    ]
  },
  {
    id: 'departmental-patches',
    name: 'Departmental Patches',
    displayName: 'Departmental Patches',
    squareId: '',
    type: 'accessory',
    thumbnail: '/merch_photos/patches/departmental_patches/biol.png',
    variations: [
      {
        id: 'biol-patch',
        name: 'Biology Patch',
        squareId: '',
        images: [
          '/merch_photos/patches/departmental_patches/biol.png'
        ]
      },
      {
        id: 'astr-patch',
        name: 'Astronomy Patch',
        squareId: '',
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'bota-patch',
        name: 'Botany Patch',
        squareId: '',
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'caps-patch',
        name: 'Cellular, Anatomical, and Physiological Science Patch',
        squareId: '',
        images: [
          '/merch_photos/patches/departmental_patches/CAPS.png'
        ]
      },
      {
        id: 'chem-patch',
        name: 'Chemistry Patch',
        squareId: '',
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'cs-patch',
        name: 'Computer Science Patch',
        squareId: '',
        images: [
          '/merch_photos/patches/departmental_patches/cpsc.png'
        ]
      },
      {
        id: 'eosc-patch',
        name: 'Earth and Ocean Science Patch',
        squareId: '',
        images: [
          '/merch_photos/patches/departmental_patches/eosc.png'
        ]
      },
      {
        id: 'math-patch',
        name: 'Math Patch',
        squareId: '',
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'micb-patch',
        name: 'Microbiology and Immunology Patch',
        squareId: '',
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'nsci-patch',
        name: 'Neuroscience Patch',
        squareId: '',
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'phys-patch',
        name: 'Physics Patch',
        squareId: '',
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
    squareId: '',
    type: 'accessory',
    thumbnail: '/merch_photos/patches/novelty_patches/cherry_blossom.png',
    variations: [
      {
        id: 'cherry-blossom-patch',
        name: 'Cherry Blossom Patch',
        squareId: '',
        images: [
          '/merch_photos/patches/novelty_patches/cherry_blossom.png'
        ]
      },
      {
        id: 'coffee-patch',
        name: 'Coffee Patch',
        squareId: '',
        images: [
          '/merch_photos/patches/novelty_patches/coffee.png'
        ]
      },
      {
        id: 'mountain-patch',
        name: 'Mountain Patch',
        squareId: '',
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'rose-garden-patch',
        name: 'Rose Garden Patch',
        squareId: '',
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'sus-patch-blue',
        name: 'SUS Patch Blue',
        squareId: '',
        images: [
          PLACEHOLDER_IMAGE
        ]
      },
      {
        id: 'sus-patch-gold',
        name: 'SUS Patch Gold',
        squareId: '',
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
    squareId: '',
    type: 'accessory',
    thumbnail: '/merch_photos/patches/earned_patches/grad.png',
    variations: [
      {
        id: 'grad-patch',
        name: 'Grad Patch',
        squareId: '',
        images: [
          '/merch_photos/patches/earned_patches/grad.png'
        ]
      }
    ]
  }
]
