Ext.define('js.store', {
    extend: 'Ext.grid.Panel',
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            pageSize: 4,
            proxy: {
                type: 'ajax',
                url: '/storeinfo',
                reader: {
                    type: 'json',
                    root: 'tslist',
                    totalProperty: 'rowcount'}
            },
            fields: [
                {name: 'chandise.merchandiseName', type: 'string'},
                {name: 'chandise.merchandiseId', type: 'string'},
                {name: 'chandise.merchandiseAb', type: 'string'},
                {name: 'num', type: 'string'},
                {name: 'avgPrice', type: 'string'}
            ], autoLoad: false,
            listeners: {
                beforeload: function (store, operation) {
                    var name = Ext.getCmp('storename');
                    if (name) {
                        if (name.getValue()) {
                            if (operation.params) {
                                operation.params.name = name.getValue();

                            } else {
                                operation.params = {name: name.getValue()};
                            }
                        }
                    }
                }
            }
        });
        store.load({
            params: {
                start: 0,
                limit: 4
            }
        });
        Ext.apply(this, {
            title: '库存信息',
            id: 'store',
            width: 600,
            selModel: Ext.create('Ext.selection.CheckboxModel', {mode: "SIMPLE"}),
            closable: true,
            store: store,
            columns: [
                {text: '商品编号', dataIndex: 'chandise.merchandiseId', flex: 1},
                {text: '商品名称', dataIndex: 'chandise.merchandiseName', flex: 1},
                {text: '助记码', dataIndex: 'chandise.merchandiseAb', flex: 1},
                {text: '数量', dataIndex: 'num', flex: 1},
                {text: '平均价格', dataIndex: 'avgPrice', flex: 1}
            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: store,
                    dock: 'bottom',
                    displayInfo: true
                }
            ],
            tbar: [

                {fieldLabel: '商品名称', xtype: 'textfield', name: 'supplierName', labelAlign: "right", id: "storename"},
                {xtype: 'button', text: '查询', icon: 'images/1-4.png', handler: me.find}
            ]
        });
        this.callParent();
    }

});