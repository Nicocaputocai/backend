//La interface define como se debe ver un dato, por ejemplo, cualquier instancia u objeto de Club debe cumplir con las siguientes propiedades
interface Properties {
    name: string;
    address: string;
    height: string;
}

interface Geometry {
    type: string;
    coordinates: number[];
}

export interface ClubInterface {
    type: String | "Feature";
    properties: Properties;
    geometry: Geometry
}