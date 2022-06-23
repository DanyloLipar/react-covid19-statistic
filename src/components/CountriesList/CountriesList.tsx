import React from "react";
import { Country } from '../../types/Country';
import { CountryInfo } from "../CountryInfo";
import './CountriesList.scss';

type Props = {
    countries: Country[],
    sorting: (keyword: string) => void,
    setModal: (bool: boolean) => void;
    setSelected: (countryName: string) => void;
    setConfirmed: (num: number) => void;
    setLethal: (num: number) => void;
    setRecovered: (num: number) => void;
}

export const CountriesList: React.FC<Props> = ({
    countries,
    sorting,
    setModal,
    setSelected,
    setConfirmed,
    setLethal,
    setRecovered
}) => {

    return (
        <section className="coronavirus">
            <div className="coronavirus__pointer pointer">
                <div className="pointer__country">
                    <div className="pointer__country-number">
                        <h2>№</h2>
                    </div>
                    <h2
                        className="pointer__country-own"
                        onClick={() => sorting('name')}
                    >Country</h2>
                </div>
                <div className="pointer__total">
                    <h2
                        className="pointer__total-txt"
                        onClick={() => sorting('accidents')}
                    >Total Confirmed</h2>
                </div>
            </div>
            <ul className="coronavirus__list">
                {countries.map(country => (
                    <li
                        key={country.CountryCode}
                    >
                        <CountryInfo
                            countries={countries}
                            country={country}
                            setModal={setModal}
                            setSelected={setSelected}
                            setConfirmed={setConfirmed}
                            setLethal={setLethal}
                            setRecovered={setRecovered}
                        />
                    </li>
                ))}
            </ul>
        </section>
    )
}