(function() {

var WR = toledo.module("wr");

// Start application
jQuery(function($) {
  // Shorten the app namespace
  var app = toledo.app;

  // Get dependency
  var WR = toledo.module("wr");
  
  var listView = new WR.Views.List({ el:"#wrecent", listEl:"#events-list", template:"#wr-events-list"}); 
  
  listView.on("wr::listViewWillRefresh",function(){
    $.mobile.showPageLoadingMsg("b","",true);
  });
  
  listView.on("wr::listViewDidRefresh",function(){
    $("#events-list").listview('refresh');
    $.mobile.hidePageLoadingMsg();
  });

  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "show/:id": "show"
    },

    index: function() {
		listView.refresh();
    }
    
  });

 if(localStorage.length === 0){
	listView.collection.create( {title:'New Toledo app', eventSource:'toledo',content:'paste your content here',initiator:'J. Goelen', date:'12-jan-2012'});
	listView.collection.create( {title:'Reading list', eventSource:'toledo',content:'paste your content here',initiator:'J. Goelen', date:'10-jan-2012'});
 }
 
 
 Backbone.sync = function(){
	//naive synchronization approach
	if(navigator.onLine){
		Backbone.ajaxSync.apply(this,arguments);
	} 
	return Backbone.localSync.apply(this,arguments);
 };
 
 $.mobile.hashListeningEnabled = false;
 
 // Start router and trigger first route
 app.router = new Router();
 Backbone.history.start({ pushState: false });
  
});

})();
