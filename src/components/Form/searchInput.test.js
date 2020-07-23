import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, simulateChange } from './../../utils/index';
import SearchInput from './SearchInput';
import { getData } from './api';

describe('SearchInput Component', ()=>{
	let wrapper;
	beforeEach(()=>{
		wrapper = shallow(<SearchInput />);
	})

	it('Render component without error', ()=>{
		const component = findByTestAttr(wrapper, 'SearchInputWrapper')
		expect(component.length).toBe(1);
	})

	it('Fill the input', ()=>{
		const updatedInput = simulateChange(wrapper, 'searchInput', 'change', 'trui')
		expect(updatedInput.props().value).toEqual('trui');
	})

	it('Reset input', ()=>{
		const updatedInput = simulateChange(wrapper, 'searchInput', 'change', 'trui')
		let clearButton = findByTestAttr(wrapper, 'clearButton');
		clearButton.simulate('click');
		const input = findByTestAttr(wrapper, 'searchInput');
		expect(input.props().value).toEqual('');
		clearButton = findByTestAttr(wrapper, 'clearButton');
		expect(clearButton.length).toBe(0);
	})

	it('show clear button when input is filled', ()=>{
		const input = findByTestAttr(wrapper, 'searchInput');
		input.simulate('change', {
			target: { value: 't'}
		})
		const clearButton = findByTestAttr(wrapper, 'clearButton');
		expect(clearButton.length).toBe(1);
	})

	it('Styling change onFocus', ()=>{
		const input = findByTestAttr(wrapper, 'searchInput');
		input.prop('onFocus')();
		const inputWrapper = findByTestAttr(wrapper, 'inputWrapper');
		const changedClass = inputWrapper.hasClass('input-wrapper-onfocus')
		expect(changedClass).toBe(true)
	})

	it('Styling change onBlur', ()=>{
		const input = findByTestAttr(wrapper, 'searchInput');
		input.prop('onBlur')();
		const inputWrapper = findByTestAttr(wrapper, 'inputWrapper');
		const changedClass = inputWrapper.hasClass('input-wrapper')
		expect(changedClass).toBe(true)
	})
})

describe('Retrieve data', ()=>{
	const dummy = {
	    "search" : "default",
	    "suggestions":[
	       {
	          "searchterm":"heren truien",
	          "nrResults":1100
	       },
	       {
	          "searchterm":"dames truien",
	          "nrResults":1501
	       }
	    ]
	}
	let wrapper;
	beforeEach(()=>{
		wrapper = shallow(<SearchInput />);
	    global.fetch = jest.fn(()=>
	    	Promise.resolve({
	    		json:()=> Promise.resolve(dummy)
	    	})
	    )
	});

	it('Render SearchResults if data is successfully retrieved', async() =>{
		const updatedInput = simulateChange(wrapper, 'searchInput', 'change', 'trui');
		updatedInput.prop('onKeyUp')();

		const data = await getData('trui');
		expect(data.length).toBe(2);

		const results = findByTestAttr(wrapper, 'SearchResult');
		expect(results.length).toBe(1);

	})

	it('Throw error if data is not retrieve', async()=>{
		const updatedInput = simulateChange(wrapper, 'searchInput', 'change', 'trui');
		updatedInput.prop('onKeyUp')();

		fetch.mockImplementationOnce(()=> Promise.reject('Api failed'))

		const data = await getData('trui');
		expect(data).toBe('Er ging iets mis...');
	})

})