Ext.define("js.tree", {
    arry: {},
    extend: "Ext.tree.Panel",
    initComponent: function () {
        var me = this;

        Ext.Ajax.request({
            url: "/treeNodeSelect?arry=" + me.arry,
            async: false,
            success: function (response) {
                me.jsonData = response.responseText;
                if (typeof(me.jsonData) === 'string') {
                    me.jsonData = Ext.JSON.decode(me.jsonData);
                }
            }

        });

        var store = Ext.create("Ext.data.TreeStore", {
            fields: [
                {name: "text", type: "String", mapping: "menu.text"}
            ],
            root: {
                text: 'Ext JS',
                id: '-1',
                children: me.jsonData.node.children
            }
        });
        Ext.apply(this, {
            id: "treeid",
            collapsible: false,
            border: false,
            autoScroll: true,
            title: "相关权限",
            titleAlign: "center",
            store: store
        });
        this.callParent();
    }
});