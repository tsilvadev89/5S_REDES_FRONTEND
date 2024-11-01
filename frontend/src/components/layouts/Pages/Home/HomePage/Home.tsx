import React from 'react';
import CarouselCard from '../body/CardItens';
import FilterComponent from '../body/ListFilter';

interface HomePageProps {
    template: string;
}

const Home: React.FC<HomePageProps> = ({ template }) => {
    return (
        <>
            <CarouselCard template={template} />
            <FilterComponent />
        </>
    );
};

export default Home;
