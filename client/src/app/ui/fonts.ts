// Arquivo para importação de fontes 

import { Poppins } from 'next/font/google';
 
export const poppins = Poppins({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
  })