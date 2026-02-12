"use client"

import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, ShoppingCart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { getProducts, searchProducts, filterProductsByPrice, getCategories, getBrands, Product } from '@/lib/products';
import { useCart } from '@/utils/hooks/useCart';

type SortOption = 'name' | 'low-to-high' | 'high-to-low';
import Link from 'next/link';

const PRODUCTS_PER_PAGE = 16;

export default function TiendaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'low-to-high' | 'high-to-low'>('name');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [showOutOfStock, setShowOutOfStock] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const { state } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [allProducts, allCategories, allBrands] = await Promise.all([
          getProducts(),
          getCategories(),
          getBrands()
        ]);
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setCategories(allCategories);
        setBrands(allBrands);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      let result = products;

      // Apply search filter
      if (searchQuery.trim()) {
        result = await searchProducts(searchQuery);
      }

      // Apply category filter
      if (selectedCategory !== 'all') {
        result = result.filter(product => product.category === selectedCategory);
      }

      // Apply brand filter
      if (selectedBrand !== 'all') {
        result = result.filter(product => product.brand === selectedBrand);
      }

      // Apply stock filter
      if (!showOutOfStock) {
        result = result.filter(product => product.stock > 0);
      }

      // Apply price sorting
      if (sortBy === 'low-to-high' || sortBy === 'high-to-low') {
        result = filterProductsByPrice(result, sortBy);
      } else if (sortBy === 'name') {
        result = [...result].sort((a, b) => a.description.localeCompare(b.description));
      }

      setFilteredProducts(result);
      setCurrentPage(1); // Reset to first page when filters change
    };

    applyFilters();
  }, [products, searchQuery, sortBy, selectedCategory, selectedBrand, showOutOfStock]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#350D70] mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando productos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#350D70] mb-1 md:mb-2">Tienda JM99</h1>
              <p className="text-sm md:text-base text-gray-600">Encuentra los mejores productos de tecnología</p>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/tienda/micarro">
                <Button className="relative bg-[#350D70] hover:bg-[#2a0a5a] text-white text-sm md:text-base">
                  <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Mi Carrito</span>
                  <span className="sm:hidden">Carrito</span>
                  {state.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {state.itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            {showFilters ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </Button>
        </div>

        {/* Search and Filters */}
        <div className={`bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6 md:mb-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#350D70] focus:border-transparent"
              />
            </div>

            {/* Category and Brand Filters */}
            <div className="grid grid-cols-2 gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#350D70] focus:border-transparent text-sm"
              >
                <option value="all">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#350D70] focus:border-transparent text-sm"
              >
                <option value="all">Todas las marcas</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort and Stock Filters */}
            <div className="grid grid-cols-2 gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#350D70] focus:border-transparent text-sm"
              >
                <option value="name">Ordenar por nombre</option>
                <option value="low-to-high">Precio: menor a mayor</option>
                <option value="high-to-low">Precio: mayor a menor</option>
              </select>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={showOutOfStock}
                    onChange={(e) => setShowOutOfStock(e.target.checked)}
                    className="mr-2 h-4 w-4 text-[#350D70] focus:ring-[#350D70] border-gray-300 rounded"
                  />
                  <span>Mostrar sin stock</span>
                </label>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                className={viewMode === 'grid' ? 'bg-[#350D70]' : ''}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setViewMode('list')}
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                className={viewMode === 'list' ? 'bg-[#350D70]' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-6 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#350D70] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#350D70] focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Brand Filter */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#350D70] focus:border-transparent"
            >
              <option value="all">Todas las marcas</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#350D70] focus:border-transparent"
            >
              <option value="name">Ordenar por nombre</option>
              <option value="low-to-high">Precio: menor a mayor</option>
              <option value="high-to-low">Precio: mayor a menor</option>
            </select>

            {/* Stock Filter */}
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOutOfStock}
                  onChange={(e) => setShowOutOfStock(e.target.checked)}
                  className="mr-2 h-4 w-4 text-[#350D70] focus:ring-[#350D70] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Mostrar sin stock</span>
              </label>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                className={viewMode === 'grid' ? 'bg-[#350D70]' : ''}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setViewMode('list')}
                variant={viewMode === 'list' ? 'default' : 'outline'}
                className={viewMode === 'list' ? 'bg-[#350D70]' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-2">
          <p className="text-sm md:text-base text-gray-600">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length} productos
            {totalPages > 1 && ` (Página ${currentPage} de ${totalPages})`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <Search className="h-12 w-12 md:h-16 md:w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-sm md:text-base text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        ) : (
          <>
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'
                : 'space-y-4'
            }>
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 md:mt-12 flex justify-center">
                <div className="flex items-center gap-1 md:gap-2 bg-white rounded-lg shadow-sm p-2 md:p-3">
                  {/* Previous Button */}
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-xs md:text-sm"
                  >
                    <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Anterior</span>
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page) => (
                      <Button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        variant={page === currentPage ? 'default' : 'outline'}
                        size="sm"
                        className={`min-w-[32px] md:min-w-[40px] text-xs md:text-sm ${
                          page === currentPage ? 'bg-[#350D70] text-white' : ''
                        }`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 text-xs md:text-sm"
                  >
                    <span className="hidden sm:inline">Siguiente</span>
                    <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
