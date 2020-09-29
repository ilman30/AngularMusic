import { Albums } from '../albums/albums';
import { Artis } from '../artis/artis';
import { Genre } from '../genre/genre';

export class Lagu{

    idLagu: number;
    judul: string;
    durasi: string;
    idGenre: number;
    idArtis: number;
    idAlbum: number;
    fileLagu: string;
    genre: Genre;
    namaGenre: string;
    artis: Artis;
    namaArtis: string;
    album: Albums;
    namaAlbums: string;

}