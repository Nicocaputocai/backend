//La interface define como se debe ver un dato, por ejemplo, cualquier instancia u objeto de Club debe cumplir con las siguientes propiedades
interface Properties {
    idTree: string;
    address: string;
    location: string;
    neightboardhood: string;
    leafImg: string;
    profileImg:string;
    status: number;
    fallingDanger: boolean;
    true: boolean;
}

interface Geometry {
    type: string;
    coordinates: number[];
}

export interface CensusTreeInterface {
    type: String | "Feature";
    properties: Properties;
    geometry: Geometry
}