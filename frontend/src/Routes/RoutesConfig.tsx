import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePageLayout from "../components/layouts/Pages/Home/HomePage/HomePageLayout";
import NotFoundPage from '../components/layouts/Pages/PageNotFound/PageNotFound';

import CadastroEmpresaLayout from '../components/layouts/Pages/PageCadastros/Empresa/CadastroEmpresaLayout';
import CadastroProdutosLayout from '../components/layouts/Pages/PageCadastros/Produtos/CadastroProdutosLayout';
import CadastroServicoLayout from '../components/layouts/Pages/PageCadastros/Servicos/CadastroServicoLayout';
import CadastroPessoasLayout from '../components/layouts/Pages/PageCadastros/Pessoas/CadastroPessoasLayout';
import DashboardLayout from '../components/layouts/Pages/DashBoard/DashboardLayout';


const RoutesConfig: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePageLayout />} />
            <Route path="/cadastropessoas" element={<CadastroPessoasLayout />} />
            <Route path="/cadastroempresa" element={<CadastroEmpresaLayout />} />
            <Route path="/cadastroproduto" element={<CadastroProdutosLayout />} />
            <Route path="/cadastroservicos" element={<CadastroServicoLayout />} />
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default RoutesConfig;
