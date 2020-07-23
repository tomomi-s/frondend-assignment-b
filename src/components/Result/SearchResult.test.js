import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, simulateChange } from './../../utils/index';
import SearchResult from './SearchResult';

describe('SearchResult Component with props', ()=>{
	const dummy = [
		{
		  "searchterm":"heren truien",
		  "nrResults":1100
		},
		{
		  "searchterm":"dames truien",
		  "nrResults":1501
		}
	]
	let wrapper;
	beforeEach(()=>{
		const props = {
			results: dummy,
			searchValue: 'trui'
		}
		wrapper = shallow(<SearchResult {...props} />);
	})

	it('Render results', ()=>{
		const component = findByTestAttr(wrapper, 'resultItems')
		expect(component.length).toBe(1)
	})
})

describe('SearchResult Component with props, but no results', ()=>{
	let wrapper;
	const dummy = []
	beforeEach(()=>{
		const props = {
			results: dummy,
			searchValue: 'trui'
		}
		wrapper = shallow(<SearchResult {...props} />);
	})

	it('Render No result message', ()=>{
		const component = findByTestAttr(wrapper, 'noResult')
		expect(component.length).toBe(1)
	})
})

describe('SearchResult Component without props', ()=>{
	let wrapper;
	beforeEach(()=>{
		wrapper = shallow(<SearchResult  />);
	})

	it('Should not render component', ()=>{
		const component = findByTestAttr(wrapper, 'resultsWrappe');
		expect(component.length).toBe(0);
	})


})
