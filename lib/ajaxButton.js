var documentClick= require('./documentClick');

var ajaxButton = function(obj)
{
	if(obj && obj.hasOwnProperty('dynamic'))
		this._dynamic=true;

	this._error= function(err){
		console.log(err);
	};
};

ajaxButton.prototype.elem= function(name)
{
	this._elem= name;
	return this;
};

ajaxButton.prototype.event= function(eventName)
{
	this._event= eventName;
	return this;
};

ajaxButton.prototype.promise= function(promiseFunc)
{
	this._promise= promiseFunc;
	return this;
};


ajaxButton.prototype.effect= function(effectFunc)
{
	this._effect= effectFunc;
	return this;
};

ajaxButton.prototype.error= function(errorFunc)
{
	this._error= errorFunc;
	return this;
};

ajaxButton.prototype.done= function()
{
	var self= this;

	// Intialize click procedure
	var event="click";
	if(self._event)
		event=self._event;

	var eventFunc= function(generatedEvent){
		// Initialize Dormant State
		if(!self._dynamicInitialized)
		{
			$(self._elem).attr('state','dormant');
			self._dynamicInitialized= true;
		}

		if($(self._elem).attr('state') == "dormant")
		{
			$(self._elem).attr('state','working');
			self._promise(generatedEvent)
			.then(self._effect)
			.then(function(){
				$(self._elem).attr('state','dormant');
			})
			.catch(function (err) {
				$(self._elem).attr('state','dormant');
				self._error(err);
			});
		}
	};

	if(!self._dynamic)

		$(self._elem)[event](eventFunc);
	else
		// $(document).on('click',self._elem,eventFunc);
		documentClick(self,event,eventFunc);
};


module.exports= ajaxButton;

