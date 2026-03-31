import { NextResponse } from 'next/server';
import citiesData from '@/data/cities.json';

interface City {
    city: string;
    population: string;
}

export async function GET() {
    try {
        const cities = citiesData as City[];
        const filteredCities = cities.filter(city =>
            parseInt(city.population) > 50000
        );
        const sortedCities = filteredCities.sort((a, b) => {
            if (a.city < b.city) return -1;
            if (a.city > b.city) return 1;
            return 0;
        });

        return NextResponse.json(sortedCities);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch cities' },
            { status: 500 }
        );
    }
}