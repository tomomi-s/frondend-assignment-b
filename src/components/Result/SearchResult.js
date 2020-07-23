import React from 'react'
import PropTypes from 'prop-types'
import './style.css';

const SearchResult = ({results, searchValue}) => {
	const hightLight = (searchterm) => {
		const regex = new RegExp(searchValue.toLowerCase(), 'g');
  		const result = searchterm.replace(regex, '<span class="search-value">' + searchValue.toLowerCase() + '</span>');
		return {__html: result};
	}
	return (
		<div className="results-wrapper" data-test="resultsWrapper">
			{
				results && results.length > 0 ? 
				<div data-test="resultItems">
					{
						results.map(result=> 
							<div 
								className="result-item" 
								key={result.searchterm}>
								<span className="item-searchterm" dangerouslySetInnerHTML={hightLight(result.searchterm)} />
								<span className="item-number">({result.nrResults})</span>
							</div>)
					}
				</div>

				: <div className="result-item" data-test="noResult"><em>Geen resultaten...</em></div>
			}
			
		</div>
	)
}

SearchResult.propTypes = {
	results: PropTypes.array,
	searchValue: PropTypes.string,
}

export default SearchResult