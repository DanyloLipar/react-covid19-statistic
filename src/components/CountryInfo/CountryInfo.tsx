import React from "react";
import { Country } from '../../types/Country';
import './CountryInfo.scss';

type Props = {
    country: Country,
    countries: Country[],
    setModal: (bool: boolean) => void;
    setSelected: (countryName: string) => void;
    setConfirmed: (num: number) => void;
    setLethal: (num: number) => void;
    setRecovered: (num: number) => void;
}

export const CountryInfo: React.FC<Props> = ({
    country,
    countries,
    setModal,
    setSelected,
    setConfirmed,
    setLethal,
    setRecovered
}) => {
    const sequenceNumber = countries.findIndex(el => el.CountryCode === country.CountryCode) + 1;

    return (
        <div className="box">
            <div className="box__description description">
                <div className="description__country">
                    <div className="description__country-number">
                        <h2>{sequenceNumber}</h2>
                    </div>
                    <h2
                        className="description__country-own"
                        onClick={() => {
                            setSelected(country.Country);
                            setConfirmed(country.TotalConfirmed);
                            setLethal(country.TotalDeaths);
                            setRecovered(country.TotalRecovered);
                            setModal(true)
                        }}
                    >{country.Country}</h2>
                </div>
                <div className="description__total">
                    <h2 className="description__total-txt">{country.TotalConfirmed}</h2>
                </div>
            </div>
        </div>
    )
}