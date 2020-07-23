export async function getData(keyword){
	try{
		const response = await fetch(`/search\?q\=${keyword}`);
		const json = await response.json();
		const filteredResults = json.suggestions.filter((suggestion)=>{ return suggestion.searchterm.includes(keyword.toLowerCase());})			
		return filteredResults;
	}catch(err){
		console.log(err)
		return 'Er ging iets mis...';
	}
	
}