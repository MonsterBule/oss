Ext.define("js.userwindow", {
    extend: "Ext.panel.Panel",
    initComponent: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/switch',
                reader: {
                    type: 'json',
                    root: 'tolist'
                }
            }, fields: [
                {name: 'operName', type: 'string'},
                {name: 'operId', type: 'string'}
            ], autoLoad: false
        });
        Ext.apply(this, {
            closable: true,
            id: 'userwindow',
            title: "切换用户",
            layout: {
                type: 'hbox',
                border: false,
                pack: 'center'
            },
            items: [
                {width: 300,
                    margin: '200 0 0 0',
                    xtype: "form",
                    defaults: {
                        xtype: "textfield",
                        labelWidth: 60,
                        border: false,
                        labelAlign: "right",
                        width: 280

                    },
                    items: [
                        {
                            xtype: 'combo',
                            store: store,
                            id: 'switchname',
                            editable: false,
                            displayField: 'operName',
                            valueField: 'operName',
                            fieldLabel: "姓名",
                            name: 'to.operName',
                            listeners: {
                                'select': function (combo, record, index) {
                                    for (var i = 0, j = combo.store.data.items.length; i < j; i++) {
                                        if (combo.value === combo.store.data.items[i].data.operName) {
                                            Ext.Ajax.request({
                                                url: '/switch?operid=' + combo.value,
                                                async: false,
                                                success: function (response) {
                                                    operinfo = Ext.JSON.decode(response.responseText);
                                                    name = operinfo.rolename[0].RoleName;
                                                    Ext.getCmp('rolename1').setValue(name);
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        },
                        {
                            fieldLabel: "权限名称",
                            id: 'rolename1',
                            readOnly: true,
                            disabled: true,

                            edit: false
                        },
                        {
                            fieldLabel: "密码",
                            name: 'to.pwd',
                            inputType: 'password'
                        },
                        {
                            xtype: "panel",
                            layout: "column",
                            border: false,
                            items: [
                                {
                                    fieldLabel: "验证码",
                                    xtype: "textfield",
                                    name: 'Stringtext',
                                    labelWidth: 60,
                                    labelAlign: "right", columnWidth: .5
                                },
                                {
                                    xtype: "panel",
                                    border: false,
                                    html: "&nbsp;<img src='validCode.jsp' style='width: 75px;height: 24px' onclick='this.src=\"validCode.jsp?r=?\"+Math.random()'>",
                                    columnWidth: .5
                                }
                            ]
                        }
                    ], buttonAlign: 'center',
                    buttons: [
                        { text: '登陆', handler: me.sumb },
                        { text: '重置',
                            handler: function () {
                                this.up('form').getForm().reset();
                            } }
                    ]
                }
            ]
        });
        this.callParent();
    }, sumb: function () {
        var form = this.up('form').getForm();
        if (form.isValid()) {
            form.submit({
                waitTitle: '',
                waitMsg: '正在验证用户名和密码',
                url: '/login',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.mag,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    //    this.up('form').getForm().reset();
                    if (msg.ishave) {
                        window.location.href = 'oss?name=' + Ext.getCmp("switchname").getValue();
                        return;
                    }
                    ;


                },
                failure: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: "系统提示错误",
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    });
                }
            });
        }

    }
});