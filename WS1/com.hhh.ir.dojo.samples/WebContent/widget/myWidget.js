if(!dojo._hasResource["jazz.widget.myWidget"]){
    dojo._hasResource["jazz.widget.myWidget"]=true;
    dojo.provide("jazz.widget.myWidget");
    dojo.require("dijit._Widget");
    dojo.require("dijit._Templated");
    dojo.require("dijit._CssStateMixin");
    dojo.declare("jazz.widget.myWidget",[dijit._Widget,dijit._Templated,dijit._CssStateMixin],{
            myWidgetAttachPoint: null,
            templatePath: dojo.moduleUrl("jazz.widget", "myWidgetTemplate.html"),
            postCreate: function() {
                this.myWidgetAttachPoint.innerHTML= "<a href='http://www.yahoo.com'>inner HTML Text</a>";
            }
        }
    );
}