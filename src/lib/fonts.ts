import { Playfair_Display, Libre_Baskerville, IBM_Plex_Mono } from 'next/font/google';

export const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-display',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const baskerville = Libre_Baskerville({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-body',
    weight: ['400', '700'],
});

export const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mono',
    weight: ['400', '500', '600'],
});
