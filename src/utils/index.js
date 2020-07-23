export const findByTestAttr = (component, attr) => {
	const wrapper = component.find(`[data-test='${attr}']`);
	return wrapper;
}

export const simulateChange = (component, attr, simulate, newValue) => {
	let changingComponent = findByTestAttr(component, attr);
	if(newValue){
		changingComponent.simulate(simulate, {
			target: { value: newValue }
		})
	}else{
		changingComponent.simulate(simulate)
	}
	return findByTestAttr(component, attr);
}