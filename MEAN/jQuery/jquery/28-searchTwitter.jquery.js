// Utility - Object.create method does not exist in older browsers, so creating it incase not present
if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) { // undefined is passed to make sure nobody before has overridden undefined
	var Twitter = {
		init: function( options, elem ) {
			var self = this;

			self.elem = elem;
			self.$elem = $( elem );

			self.url1 = 'https://api.github.com/users/';
			self.url2 = '/repos?q=';

			self.search = ( typeof options === 'string' )
				? options
				: options.search;

			// dojo.mixin
			self.options = $.extend( {}, $.fn.queryTwitter.options, options );

			self.refresh( 1 );
		},

		refresh: function( length ) {
			var self = this;

			setTimeout(function() {
				self.fetch().done(function( results ) {
					results = self.limit( results, self.options.limit );

					self.buildFrag( results );

					self.display();

					if ( typeof self.options.onComplete === 'function' ) {
						self.options.onComplete.apply( self.elem, arguments );
					}

					if ( self.options.refresh ) {
						self.refresh();
					}
				});
			}, length || self.options.refresh );
		},

		fetch: function() {
			return $.ajax({
				url: this.url1 + this.search + this.url2,
				data: {},
				dataType: ''
			});
		},

		buildFrag: function( results ) {
			var self = this;

			self.tweets = $.map( results, function( obj, i) {
				return $( self.options.wrapEachWith ).append ( obj.archive_url);
			});
		},

		display: function() {
			var self = this;

			if ( self.options.transition === 'none' || !self.options.transition ) {
				self.$elem.html( self.tweets ); // that's available??
			} else {
				self.$elem[ self.options.transition ]( 500, function() {
					$(this).html( self.tweets )[ self.options.transition ]( 500 );
				});
			}
		},

		limit: function( obj, count ) {
			return obj.slice( 0, count );
		}
	};

	// plugin is created by extending jQuery's prototype, like below
	$.fn.queryTwitter = function( options ) {
		// in this scope this refers to the jQuery object, so doing $(this) is not required
		return this.each(function() { // return is useful for chaining
			var twitter = Object.create( Twitter ); // prototype
			console.log(Twitter); // Object
			console.log(twitter); // instance 
			
			twitter.init( options, this );

			// saving a copy of the instance if the user wants to modify
			$.data( this, 'queryTwitter', twitter ); // this is jQuery.data - http://api.jquery.com/jquery.data/
			// $(this).data('queryTwitter', twitter ); // http://api.jquery.com/data/, this is supposedly slower than $.data
		});
	};

// options externalized so that it can be easily changed by user using it
	$.fn.queryTwitter.options = {
		search: 'douglascrockford',
		wrapEachWith: '<li></li>',
		limit: 10,
		refresh: null,
		onComplete: null,
		transition: 'fadeToggle'
	};

})( jQuery, window, document ); // wrap in self executing function to avoid clashes for what '$' sign refers to
