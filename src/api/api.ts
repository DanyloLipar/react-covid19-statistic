import { Country } from "../types/Country";
const BASE_URL = 'https://api.covid19api.com';

export const getStatistic = async (): Promise<any> => {
    const responce = await fetch(`${BASE_URL}/summary`);

    const data = await responce.json();

    return data;
};
