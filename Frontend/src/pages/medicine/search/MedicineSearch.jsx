import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import SearchState from "./components/SearchState";
import Pagination from "./components/Pagination";
import { searchMedicines } from "../../../services/medicineService";
import "./MedicineSearch.css";

function MedicineSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    location: "all",
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    availability: "all",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    location: "all",
    minPrice: "",
    maxPrice: "",
    minQuantity: "",
    availability: "all",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const RESULTS_PER_PAGE = 4;

  const handleSearch = async (term) => {
    setLoading(true);
    setError("");
    setSearched(true);

    // Start from page 1 for every new search
    setCurrentPage(1);

    try {
      const data = await searchMedicines(term);
      setResults(data);
    } catch (err) {
      setResults([]);
      setError("Failed to search for medicines.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters);

    // Return to first page after changing filters
    setCurrentPage(1);
  };

  const clearFilters = () => {
    const defaultFilters = {
      location: "all",
      minPrice: "",
      maxPrice: "",
      minQuantity: "",
      availability: "all",
    };

    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);

    // Return to first page after clearing filters
    setCurrentPage(1);
  };

  const filteredResults = results.filter((medicine) => {
    const locationMatch =
      appliedFilters.location === "all" ||
      medicine.location === appliedFilters.location;

    const minPriceMatch =
      appliedFilters.minPrice === "" ||
      medicine.price >= Number(appliedFilters.minPrice);

    const maxPriceMatch =
      appliedFilters.maxPrice === "" ||
      medicine.price <= Number(appliedFilters.maxPrice);

    const quantityMatch =
      appliedFilters.minQuantity === "" ||
      medicine.quantity >= Number(appliedFilters.minQuantity);

    const availabilityMatch =
      appliedFilters.availability === "all" ||
      (appliedFilters.availability === "available" &&
        medicine.available) ||
      (appliedFilters.availability === "unavailable" &&
        !medicine.available);

    return (
      locationMatch &&
      minPriceMatch &&
      maxPriceMatch &&
      quantityMatch &&
      availabilityMatch
    );
  });

  // Calculate total pages
  const totalPages = Math.ceil(
    filteredResults.length / RESULTS_PER_PAGE
  );

  // Get results for current page
  const startIndex =
    (currentPage - 1) * RESULTS_PER_PAGE;

  const endIndex =
    startIndex + RESULTS_PER_PAGE;

  const currentResults = filteredResults.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Scroll to the results section
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const renderResults = () => {
    if (loading) {
      return <SearchState type="loading" />;
    }

    if (error) {
      return (
        <SearchState
          type="error"
          message={error}
        />
      );
    }

    if (searched && filteredResults.length === 0) {
      return <SearchState type="empty" />;
    }

    if (filteredResults.length > 0) {
      return (
        <>
          <SearchResults results={currentResults} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      );
    }

    return (
      <div className="welcome-state">
        <h2>Find Your Medicine</h2>

        <p>
          Search for a medicine to find pharmacies where
          it is currently available.
        </p>
      </div>
    );
  };

  return (
    <main className="medicine-search-page">
      <div className="search-container">

        <header className="page-header">
          <h1>Find Your Medicine</h1>

          <p>
            Search for medicines and find pharmacies
            where they are currently available.
          </p>
        </header>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          loading={loading}
        />

        <div className="search-layout">

          <aside className="filters-sidebar">

            <div className="filters-header">
              <h2>Filters</h2>

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>

            <div className="filter-group">
              <label htmlFor="location">
                Location
              </label>

              <select
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
              >
                <option value="all">
                  All locations
                </option>

                <option value="Benha">
                  Benha
                </option>

                <option value="Cairo">
                  Cairo
                </option>

                <option value="Giza">
                  Giza
                </option>
              </select>
            </div>

            <div className="filter-group">
              <label>Price</label>

              <div className="range-inputs">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  min="0"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />

                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  min="0"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="minQuantity">
                Minimum Quantity
              </label>

              <input
                id="minQuantity"
                type="number"
                name="minQuantity"
                placeholder="e.g. 10"
                min="0"
                value={filters.minQuantity}
                onChange={handleFilterChange}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="availability">
                Availability
              </label>

              <select
                id="availability"
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
              >
                <option value="all">
                  All
                </option>

                <option value="available">
                  Available
                </option>

                <option value="unavailable">
                  Unavailable
                </option>
              </select>
            </div>

            <button
              type="button"
              className="apply-filters-button"
              onClick={applyFilters}
            >
              Apply Filters
            </button>

          </aside>

          <section className="results-container">
            {renderResults()}
          </section>

        </div>
      </div>
    </main>
  );
}

export default MedicineSearch;