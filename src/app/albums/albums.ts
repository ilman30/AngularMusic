import { Artis } from '../artis/artis';
import { LablesRekaman } from '../lablesRekaman/lablesRekaman';

export class Albums{

    idAlbum: number;
    namaAlbums: string;
    idLabel: number;
    idArtis: string;
    fotoCover: string;
    keterangan: string;
    lablesRekaman: LablesRekaman;
    namaLables: string;
    artis: Artis;
    namaArtis: string;

}