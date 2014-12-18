Ext.define('text', {
    extend: 'Ext.panel.Panel',
    initComponent: function () {
        Ext.apply(this, {
            title: "aa",
            titleAlign: "center",
            layout: "border",
            width: 500,
            height: 500,
            items: [
                {
                    title: "sdfsf",
                    xtype: "grid",
                    region: "north",
                    store: Ext.create("Ext.data.Store", {
                        fields: [
                            "id", "name"
                        ],
                        data: [
                            {"id": 1, "name": "aaaa"},
                            {"id": 1, "name": "aaaa"}
                        ]
                    }),
                    columns: [
                        {text: "编码", dataIndex: "id", flex: 1, align: "center"},
                        {text: "姓名", dataIndex: "name", flex: 1, align: "center"}
                    ]
                },
                {
                    title: "sdfssdfsdf",
                    xtype: "grid",
                    region: "center",
                    store: Ext.create("Ext.data.Store", {
                        fields: [
                            "id", "name"
                        ],
                        data: [
                            {"id": 1, "name": "aaaa"},
                            {"id": 1, "name": "aaaa"}
                        ]
                    }),
                    columns: [
                        {text: "编码", dataIndex: "id", flex: 1, align: "center"},
                        {text: "姓名", dataIndex: "name", flex: 1, align: "center"}
                    ]
                }
            ]
        });
        this.callParent();
    }
});