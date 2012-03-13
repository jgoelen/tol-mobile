//WhatsRecent module

(function(WR) {
  
  var app = toledo.app;
  
  WR.Event = Backbone.Model.extend({ });

  WR.Collection = Backbone.Collection.extend({
    
    model: WR.Event,
    
	url: "/events",
	
	localStorage: new Store("wr::events")
    
  });

  WR.Views.List = Backbone.View.extend({

	events: {
		"vclick .wr-refresh": "refresh"
	},

	initialize: function(){
		this.collection = new WR.Collection();
		this.$listEl = $(this.options.listEl);
	},
	
    render: function(){
      var js = this.collection.toJSON();
      var tmpl = Handlebars.compile($(this.options.template).html());
      this.$listEl.html(tmpl({events: js}));
      return this;  
    },
	
	refresh: function(){
		var thiz = this;
		thiz.trigger("wr::listViewWillRefresh");
		this.collection.fetch({ success:function(){
			thiz.render();
			thiz.trigger("wr::listViewDidRefresh");
		}});
    }
    
  });
  
})(toledo.module("wr"));
