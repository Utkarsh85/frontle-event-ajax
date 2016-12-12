var state={};

module.exports= function(self,event,executeFunc)
{
	var stateName= self._elem;
	// console.log('Current State = ',state);
	if(state.hasOwnProperty(stateName) && state[stateName])
	{
		return false;
	}

	else
	{
		$(document).on(event,self._elem,executeFunc);
		state[stateName]= true;
		return true;
	}
}