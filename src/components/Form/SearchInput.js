import React, { useState } from 'react';
import './style.css';
import SearchResult from './../Result/SearchResult';

const SearchInput = () => {
	const [searchValue, setSearchValue] = useState('');
	const [active, setActive] = useState(false);
	const [results, setResults] = useState(null);
	const [error, setError] = useState(null);

	const handleInputChange = e => {
		setSearchValue(e.target.value);
	}

	const handleInputBlur = () => {
		if(!searchValue){
			setActive(false);
		}
	}

	const handleInputKeyUp = () => {
		if(searchValue.length > 2){
			getData(searchValue);
		}else{
			setResults(null);
			setError(null)
		}
	}

	const clearInput = () => {
		setSearchValue('');
		setActive(false);
		setResults(null);
		setError(null)
	}

	async function getData(keyword){
		try{
			const response = await fetch(`/search\?q\=${keyword}`);
			const json = await response.json();
			const filteredResults = json.suggestions.filter((suggestion)=>{ return suggestion.searchterm.includes(keyword.toLowerCase());})			
			setResults(filteredResults)
		}catch(err){
			console.log(err)
			setError('Er ging iets mis...')
		}
		
	}

	return (
		<div 
			className="search-input-wrapper"
			data-test="SearchInputWrapper">
			<div className={active ? 'input-wrapper-onfocus':'input-wrapper'} data-test="inputWrapper">
				<input 
					className="search-input"
					type="text" 
					placeholder="Zoeken"
					value={searchValue}
					onChange={handleInputChange}
					onFocus={e=>setActive(true)}
					onBlur={handleInputBlur}
					onKeyUp={handleInputKeyUp}
					data-test="searchInput"/>
				<div className="button-wrapper">
					{ searchValue &&
						<button onClick={clearInput} data-test="clearButton">
							<i className="fas fa-times"></i>
						</button>
					}
					<button>
						<i className="fas fa-search"></i>
					</button>
				</div>
			</div>
			{
				error ?
				<p data-test="Error">{error}</p>
				: results && 
				<SearchResult results={results} searchValue={searchValue} data-test="SearchResult"/>
			}
		</div>
	)
}

export default SearchInput