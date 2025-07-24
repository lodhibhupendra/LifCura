import React, { useState, useEffect, useRef } from 'react';
import './ProductCard.css';
import { FiSearch, FiEye } from 'react-icons/fi';
import ReactModal from 'react-modal';
import useWindowWidth from '../utils/useWindowWidth';


const ProductCard = ({ products = [] }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalProduct, setModalProduct] = useState(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Get all unique sections
  const allSections = ['All', ...new Set(products.map(product => product.section))];

  // Filter logic
  const filteredProducts = products.filter(product => {
    const matchesFilter = activeFilter === 'All' || product.section === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Group by section
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const section = product.section || 'General';
    if (!acc[section]) acc[section] = [];
    acc[section].push(product);
    return acc;
  }, {});

  // Track expanded sections
  const [expandedSections, setExpandedSections] = useState([]);
  // Show More/Less button refs for scroll
  const showMoreRefs = useRef({});
  // Section refs for scroll (for collapse)
  const sectionRefs = useRef({});

  const toggleSection = (section) => {
    setExpandedSections(prev => {
      const isExpanding = !prev.includes(section);
      const newSections = isExpanding
        ? [...prev, section]
        : prev.filter(s => s !== section);
      setTimeout(() => {
        if (isExpanding && showMoreRefs.current[section]) {
          // Expand: scroll to Show More/Less button (section ke niche tak)
          showMoreRefs.current[section].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (!isExpanding && sectionRefs.current[section]) {
          // Collapse: scroll to section top (Show Less button)
          sectionRefs.current[section].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return newSections;
    });
  };

  // Placeholder image
  const getProductImage = (productName) => {
    return `https://source.unsplash.com/400x300/?medical,${
      encodeURIComponent(productName.split(' ')[0].toLowerCase())
    }`;
  };

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 600;

  if (isLoading) {
    return (
      <div className="loading-container">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="product-card shimmer"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="product-app-container" id="products">
      {/* Products Header */}
      <header className="app-header">
        <h1>Our Products</h1>
      </header>

      {/* Advanced Filter Controls */}
      <div className="advanced-controls">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isMobile ? (
          <div className="filter-dropdown-container">
            <select
              className="filter-dropdown"
              value={activeFilter}
              onChange={e => setActiveFilter(e.target.value)}
            >
              {allSections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="filter-tabs">
            {allSections.map(section => (
              <button
                key={section}
                className={`filter-tab ${activeFilter === section ? 'active' : ''}`}
                onClick={() => setActiveFilter(section)}
              >
                {section}
                {activeFilter === section && <span className="active-indicator"></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Products Grid */}
      {Object.keys(groupedProducts).length > 0 ? (
        Object.entries(groupedProducts).map(([section, items]) => {
          const isExpanded = expandedSections.includes(section);
          const visibleItems = isExpanded ? items : items.slice(0, 4);
          return (
            <section
              key={section}
              className="product-section"
              ref={el => { sectionRefs.current[section] = el; }}
            >
              <h2 className="section-title">
                <span>{section}</span>
                <small>{items.length} Products</small>
              </h2>
              <div
                className={`products-grid animated-grid${isExpanded ? ' expanded' : ''}`}
                style={{
                  maxHeight: isExpanded ? `${(items.length * 370)}px` : `${(4 * 370)}px`,
                  transition: 'max-height 0.6s cubic-bezier(0.4,0,0.2,1)',
                  overflow: 'hidden',
                }}
              >
                {visibleItems.map((product) => (
                  <article
                    key={product.id}
                    className="product-card"
                  >
                    <div className="product-badge">New</div>
                    <div className="product-image-container">
                      <img 
                        src={product.image || getProductImage(product.name)} 
                        alt={product.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="product-details">
                      <h3>{product.name}</h3>
                      <div className="description">{product.description}</div>
                      <div className="price-badge">
                        ₹ {product.price !== undefined && product.price !== null ? product.price : 0}
                      </div>
                      <div className="product-meta">
                        {product.category && <span className="category">{product.category}</span>}
                        {product.inStock && <span className="stock">In Stock</span>}
                      </div>
                      <div className="product-actions">
                        <button className="view-btn" onClick={() => setModalProduct(product)}>
                          <FiEye /> View
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {/* Show More/Less Button */}
              {items.length > 4 && (
                <div
                  className="show-more-container"
                  ref={el => { showMoreRefs.current[section] = el; }}
                >
                  <button
                    className="show-more-btn"
                    onClick={() => toggleSection(section)}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? 'Show Less' : `Show More (${items.length - 4})`}
                  </button>
                </div>
              )}
            </section>
          );
        })
      ) : (
        <div className="no-results">
          <img src="/no-results.svg" alt="No products found" />
          <h3>No products match your search</h3>
          <button onClick={() => {
            setSearchQuery('');
            setActiveFilter('All');
          }}>
            Reset Filters
          </button>
        </div>
      )}
      <ReactModal
        isOpen={!!modalProduct}
        onRequestClose={() => setModalProduct(null)}
        ariaHideApp={false}
        style={{
          overlay: { backgroundColor: 'rgba(30,40,80,0.18)', zIndex: 10000 },
          content: { maxWidth: 420, margin: 'auto', borderRadius: 18, padding: '2.2rem 2rem 1.5rem 2rem', boxShadow: '0 8px 32px rgba(67,97,238,0.13)', position: 'relative', minHeight: 320 }
        }}
      >
        {modalProduct && (
          <div style={{textAlign:'center', position:'relative'}}>
            <img src={modalProduct.image} alt={modalProduct.name} style={{width:'100%',maxWidth:260,borderRadius:12,marginBottom:18,marginTop:8, boxShadow:'0 2px 12px #4895ef22'}} />
            <h2 style={{marginBottom:8, fontWeight:700, fontSize:'1.35rem'}}>{modalProduct.name}</h2>
            <div style={{color:'#2563eb',fontWeight:700,marginBottom:8,fontSize:'1.15rem'}}>₹ {modalProduct.price !== undefined && modalProduct.price !== null ? modalProduct.price : 0}</div>
            <div style={{marginBottom:10, color:'#444', fontSize:'1.05rem'}}>{modalProduct.description}</div>
            {modalProduct.category && <div style={{marginBottom:6, color:'#4895ef',fontWeight:600}}>{modalProduct.category}</div>}
            {modalProduct.section && <div style={{marginBottom:6, color:'#888'}}>{modalProduct.section}</div>}
            {modalProduct.inStock && <div style={{color:'#28a745',fontWeight:600,marginBottom:8}}>In Stock</div>}
            {/* Niche bhi close button (optional) */}
            <button className="view-btn" style={{marginTop:18}} onClick={() => setModalProduct(null)}>Close</button>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default ProductCard;