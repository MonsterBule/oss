Ext.define('ShinowLogin', {
    extend: 'Ext.form.Panel',
    initComponent: function () {
        var tem = this;

        Ext.apply(this, {
            title: '登陆',
            border: false,
            layout: 'fit',
            width: 280,
            frame: true,
            items: [
                {
                    layout: "form",
                    xtype: "form",
                    defaults: {
                        xtype: "textfield",
                        labelWidth: 50,
                        labelAlign: "right"
                        //margin : "5 5 5 5"
                    },
                    items: [
                        {
                            fieldLabel: "姓名",
                            id: 'operName',
                            name: 'to.operName'
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
                                    labelWidth: 50,
                                    labelAlign: "right",
                                    columnWidth: .5
                                },
                                {
                                    xtype: "panel",
                                    border: false,
                                    html: "&nbsp;<img src='validCode.jsp' style='width: 75px;height: 24px' onclick='this.src=\"validCode.jsp?r=?\"+Math.random()'>",
                                    columnWidth: .5
                                }
                            ]
                        }
                    ]
                }
            ],
            buttonAlign: 'center',
            buttons: [
                { text: '登陆', handler: tem.sumb },
                { text: '重置',
                    handler: function () {
                        this.up('form').getForm().reset();
                    } }
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
                    // this.up('form').getForm().reset();
                    if (msg.ishave) {
                        window.location.href = 'oss?name=' + Ext.getCmp("operName").getValue();
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