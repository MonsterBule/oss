Ext.define('shinow', {
    extend: 'Ext.container.Viewport',
    require: [
        'Ext.chart.*',
        'Ext.layout.container.Fit', 'Ext.window.MessageBox', 'Ext.Window', 'Ext.fx.target.Sprite'
    ],
    outstockinfo: function () {
        return  Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/outstockinfo',
                reader: {
                    type: 'json',
                    root: 'conutinfo'
                }
            },
            fields: ['MerchandiseName', 'outNum'],
            autoLoad: true
        });
    },
    chart1: function (a) {
        var donut = false;
        return{
            id: 'chartid2',
            style: 'background:#fff',
            animate: true,        //动画
            shadow: true,         //阴影
            store: a.outstockinfo(),        //##
            legend: {
                position: 'right'   //图例
            },
            axes: [
                {
                    type: 'Numeric',  //显示图形类型- line：则线图；column：柱形图；radar：
                    position: 'bottom',        //
                    //fields: ['total', 'passed', 'deleted'],
                    xField: 'MerchandiseName',
                    yField: ['outNum'],
                    minimum: 0,  //如果小于这个数，图标向下（相当于设置了一个起始点）
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    grid: true,
                    title: '数量'
                },
                {
                    type: 'Category',
                    position: 'left',
                    fields: ['MerchandiseName']
                }
            ],
            series: [
                {
                    type: 'bar',
                    axis: 'bottom',
                    highlight: true,
                    tips: {
                        trackMouse: true,
                        width: 140,
                        height: 28,
                        renderer: function (storeItem, item) {
                            this.setTitle(storeItem.get('MerchandiseName') + ': ' + storeItem.get('outNum') + ' 件');
                        }
                    },
                    label: {
                        display: 'insideEnd',
                        field: 'outNum',
                        renderer: Ext.util.Format.numberRenderer('0'),
                        orientation: 'horizontal',
                        color: '#333',
                        'text-anchor': 'middle'
                    },
                    xField: 'MerchandiseName',
                    yField: ['outNum']
                }
            ]
        }

    },
    stock: function () {
        return Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/storeinfo',
                reader: {
                    type: 'json',
                    root: 'tslist'
                }
            },
            fields: [
                {name: 'chandise.merchandiseName', type: 'string'},
                {name: 'num', type: 'int'}
            ],
            autoLoad: true
        });
    },
    chart: function (a) {
        var donut = false;
        return{
            id: 'chartid1',
            animate: true,
            store: a.stock(),
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 60,
            theme: 'Base:gradients',
            series: [
                {
                    type: 'pie',
                    field: 'num',
                    showInLegend: true,
                    tips: {
                        trackMouse: true,
                        width: 140,
                        height: 28,
                        renderer: function (storeItem, item) {
                            var total = 0;
                            Ext.getCmp('chartid1').store.each(function (rec) {
                                total += rec.get('num');
                            });
                            this.setTitle(storeItem.get('chandise.merchandiseName') + ': ' + Math.round(storeItem.get('num') / total * 100) + '%');
                        }
                    },
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },
                    label: {
                        field: 'chandise.merchandiseName',
                        display: 'rotate',
                        contrast: true,
                        font: '18px Arial'
                    }
                }
            ]
        }
    },
    instockinfo: function () {
        return  Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: '/instockinfo',
                reader: {
                    type: 'json',
                    root: 'countInfo'
                }
            },
            fields: ['MerchandiseName', 'inNum'],
            autoLoad: true
        });
    },
    chart2: function (a) {
        var donut = false;
        return{
            id: 'chartid3',
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: a.instockinfo(),
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['inNum'],
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    title: '数量',
                    grid: true,
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['MerchandiseName'],
                    title: '商品名称'
                }
            ],
            series: [
                {
                    type: 'column',
                    axis: 'left',
                    highlight: true,
                    tips: {
                        trackMouse: true,
                        width: 140,
                        height: 28,
                        renderer: function (storeItem, item) {
                            this.setTitle(storeItem.get('MerchandiseName') + ': ' + storeItem.get('inNum') + ' 件');
                        }
                    },
                    label: {
                        display: 'insideEnd',
                        'text-anchor': 'middle',
                        field: 'inNum',
                        renderer: Ext.util.Format.numberRenderer('0'),
                        orientation: 'vertical',
                        color: '#333'
                    },
                    xField: 'MerchandiseName',
                    yField: 'inNum'
                }
            ]
        }
    },

    initComponent: function () {
        var me = this;
        Ext.Ajax.request({
            id: 'rolejson',
            url: "/json?id=" + me.id,
            async: false,
            success: function (response) {
                me.jsonData = response.responseText;
                if (typeof(me.jsonData) === 'string') {
                    me.jsonData = Ext.JSON.decode(me.jsonData);
                }
            }

        });

        var store1 = Ext.create("Ext.data.TreeStore", {

            fields: [
                {name: "text", type: "String", mapping: "menuinfo.title"}
            ],
            root: {
                text: 'asdfas',
                id: '-1',
                children: me.jsonData.treeNode.children
            }
        });
        var themes = [
            ['默认', 'ext-all-gray.css'],
            ['浅灰橙', 'xtheme-olive.css'],
            ['黑灰色', 'ext-all-access.css'],
            ['浅蓝色', 'ext-all-rtl.css'],
            ['暗蓝色', 'ext-all-neptune.css']
        ];
        var Mystore = Ext.create("Ext.data.SimpleStore", {
            fields: ['theme', 'css'],
            data: themes
        });
        var curDate = new Date()
        var time = Ext.Date.format(curDate, 'l, \\t\\he jS \\of F Y h:i:s A');
        this.createMenuList();
        var opername = document.getElementById("username").value;
        if (opername == "") {
            var text = "<div>当前未登录</div>"
            window.location = 'login.html'
        } else {
            text = "<div style='float : right; margin-right: 40px'>当前登陆员：" + opername + ", 登陆身份：" + menu.user.role.roleName + "</div>"
        }
        Ext.apply(this, {

            layout: 'border',
            items: [
                {
                    region: 'north',
                    border: false,
                    xtype: "panel",
                    layout: "fit",
                    height: 127,
                    bodyStyle: {
                        backgroundImage: 'url(images/logo.jpg)'
                    },
                    tbar: [
                        {id: 'time',
                            editable: false,
                            border: false,
                            listeners: {
                                'render': function () {
                                    Ext.TaskManager.start({
                                        run: function () {
                                            Ext.getCmp('time').update('系统时间：' + Ext.util.Format.date((new Date()), 'Y年m月d日 H:i:s'));
                                        },
                                        interval: 1000
                                    });
                                }
                            }

                        },
                        '->',
                        {xtype: 'combo', fieldLabel: '更换皮肤', labelAlign: "right",
                            id: 'css',
                            store: Mystore,
                            displayField: 'theme',
                            valueField: 'css',
                            border: false,
                            value: '默认',
                            editable: false,
                            listeners: {
                                "select": function (combo) {
                                    var css = combo.getValue();
                                    //设置cookies
                                    var date = new Date();
                                    //alert(css);
                                    date.setTime(date.getTime() + 30 * 24 * 3066 * 1000);
                                    document.getElementsByTagName("link")[1].href = "extjs/resources/css/" + css;
                                    document.cookie = "css=" + css + ";expires=" + date.toGMTString();
                                }
                            }
                        }
                    ],
                    bbar: ['>',
                        {
                            border: false,
                            html: text,
                            handler: function () {
                                me.userinfo(me)
                            }
                        }, '->',
                        {
                            xtype: 'button',
                            style: [

                            ],
                            text: '注销',
                            icon: "../images/exit1pic.png",
                            handler: function () {
                                Ext.MessageBox.confirm('提示消息', '是否要退出当前用户?', function (choice) {
                                    if (choice == 'yes') {
                                        window.location = "logout.jsp"
                                    }
                                });
                            }
                        }
                    ]
                },
                {
                    region: 'west',
                    title: '功能菜单',
                    collapsible: true,
                    width: 150,
                    layout: 'accordion',
                    items: me.menuList
                },
                {
                    region: 'south',
                    xtype: 'toolbar',
                    items: ['->',
                        {
                            xtype: 'tbtext',
                            text: '版权所有 启奥实训',
                            style: {
                                color: 'red',
                                fontWeight: 'bold'
                            }
                        }
                    ]
                },
                {
                    region: 'east',
                    title: '当前登陆操作员及权限信息',
                    collapsible: true,
                    split: true,
                    width: 276,
                    layout: 'border', items: [
                    {
                        region: 'north',
                        title: '操作员信息',
                        layout: "anchor",
                        items: [
                            {
                                layout: 'column',
                                xtype: 'panel',
                                defaults: {
                                    readOnly: true,
                                    xtype: 'label',
                                    style: {
                                        fontFamily: 'SimSun'
                                    }
                                },
                                items: [
                                    {
                                        text: time, columnWidth: 1
                                    },
                                    {text: '操作员名称:', columnWidth: .5},
                                    {text: menu.user.operName ? menu.user.operName : "未提供", columnWidth: .5},
                                    {text: '操作员权限:', columnWidth: .5},
                                    {text: menu.user.role.roleName ? menu.user.role.roleName : "未提供", columnWidth: .5},
                                    {text: '地址:', columnWidth: .5},
                                    { text: menu.user.address ? menu.user.address : "未提供", columnWidth: .5},
                                    {text: '手机号码:', columnWidth: .5},
                                    { text: menu.user.mobile ? menu.user.mobile : " 未提供", columnWidth: .5},
                                    {text: '联系电话:', columnWidth: .5},
                                    { text: menu.user.linkTel ? menu.user.linkTel : " 未提供", columnWidth: .5},
                                    {text: 'QQ:', columnWidth: .5},
                                    { text: menu.user.qq ? menu.user.qq : "未提供", columnWidth: .5},
                                    {text: 'Email:', columnWidth: .5},
                                    { text: menu.user.email ? menu.user.email : "未提供", columnWidth: .5},
                                    {text: '排序编码:', columnWidth: .5},
                                    { text: menu.user.sortId ? menu.user.sortId : "未提供", columnWidth: .5},
                                    {text: '状态:', columnWidth: .5},
                                    { text: menu.user.state ? "已激活" : "未激活", columnWidth: .5}
                                ], border: false,
                                buttons: [
                                    {text: '修改信息', columnWidth: 1, handler: function () {
                                        me.userinfo(me)
                                    }}
                                ]
                            }
                        ]
                    },
                    {
                        region: 'center',
                        title: '权限信息',
                        layout: 'fit',
                        items: Ext.create('Ext.tree.Panel', {
//                        title: 'Simple Tree',
                            store: store1,
                            rootVisible: false,
                            renderTo: Ext.getBody()
                        })
                    }
                ]


                },
                {
                    region: 'center',
                    xtype: 'tabpanel',
                    activeTab: 0,
                    id: 'jdbc',
                    items: [
                        {
                            title: '库存饼状图',
                            layout: 'fit',
                            xtype: 'panel',
                            tbar: [
                                {
                                    text: '保存图表',
                                    handler: function () {
                                        Ext.MessageBox.confirm('下载提示', '是否下载当前图表?', function (choice) {
                                            if (choice == 'yes') {
                                                Ext.getCmp('chartid1').save({
                                                    type: 'image/png'
                                                });
                                            }
                                        });
                                    }
                                },
                                {
                                    enableToggle: true,
                                    pressed: false,
                                    text: 'Donut',
                                    toggleHandler: function (btn, pressed) {
                                        Ext.getCmp('chartid1').series.first().donut = pressed ? 35 : false;
                                        Ext.getCmp('chartid1').refresh();
                                    }
                                } ,
                                {
                                    text: '销量条状图', handler: function () {

                                    Ext.create('Ext.Window', {
                                        width: 800,
                                        height: 600,
                                        minHeight: 400,
                                        modal: true,
                                        minWidth: 550,
                                        hidden: false,
                                        maximizable: true,
                                        title: '销量统计表',
                                        autoShow: true,
                                        layout: 'fit',
                                        tbar: [
                                            {
                                                text: '下载图表',
                                                handler: function () {
                                                    Ext.MessageBox.confirm('下载提示', '是否下载当前图表?', function (choice) {
                                                        if (choice == 'yes') {
                                                            Ext.getCmp('chartid2').save({
                                                                type: 'image/png'
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        ],
                                        items: [
                                            Ext.create('Ext.chart.Chart', me.chart1(me))]
                                    });
                                }
                                },
                                {text: '进货柱状图', handler: function () {
                                    Ext.create('Ext.window.Window', {
                                        width: 800,
                                        height: 600,
                                        modal: true,
                                        minHeight: 400,
                                        minWidth: 550,
                                        hidden: false,
                                        maximizable: true,
                                        title: '进货柱状统计图',
                                        autoShow: true,
                                        layout: 'fit',
                                        tbar: [
                                            {
                                                text: '下载图表',
                                                handler: function () {
                                                    Ext.MessageBox.confirm('下载提示', '是否下载当前图表?', function (choice) {
                                                        if (choice == 'yes') {
                                                            Ext.getCmp('chartid3').save({
                                                                type: 'image/png'
                                                            });
                                                        }
                                                    });
                                                }
                                            },
                                            {
                                                text: '刷新',
                                                handler: function () {
                                                    // Add a short delay to prevent fast sequential clicks
                                                    window.loadTask.delay(100, function () {
                                                        instockinfo.loadData(generateData());
                                                    });
                                                }
                                            }
                                        ], items: [
                                            Ext.create('Ext.chart.Chart', me.chart2(me))

                                        ]
                                    }).show().center();

                                }}
                            ],
                            items: [
                                Ext.create('Ext.chart.Chart', this.chart(me))
                            ]
                        }
                    ]}
            ]
        });
        this.callParent();
    },
    user: new Array(),
    menuList: new Array(),
    createMenuList: function () {
        var menulist = {}, tpl, me = this;
        tpl = new Ext.XTemplate(
            '<tpl for=".">',
            '<div class="part01">',
            '<img src="{src}" style="width:45px;height: 45px;"><br/>',
            '<div class="con">',
            '<span>{title}</span>',
            '<div class="con1">{remark}</div>',
            '</div>',
            '</div>',
            '</tpl>'
        );
        Ext.Ajax.request({
            url: '/json',
            async: false,
            success: function (response) {
                menu = Ext.JSON.decode(response.responseText);
            }
        });
        for (var i = 0, len = menu.treeNode.children.length; i < len; i++) {
            var storeID = 'store_' + i, item, title = menu.treeNode.children[i].menuinfo.title;
            Ext.create('Ext.data.Store', {
                id: storeID,
                data: menu.treeNode.children[i].children,
                fields: [
                    { name: 'src', type: 'string', mapping: 'menuinfo.src' },
                    { name: 'title', type: 'string', mapping: 'menuinfo.title' },
                    { name: 'remark', type: 'string', mapping: 'menuinfo.remark' },
                    { name: 'tag', type: 'string', mapping: 'menuinfo.tag' },
                    { name: 'js', type: 'string', mapping: 'menuinfo.js' }
                ]
            });
            item = {
                xtype: 'panel',
                title: title,
                icon: 'images/1-1.png',
                layout: 'fit',
                items: [
                    {
                        xtype: 'dataview',
                        store: Ext.data.StoreManager.lookup(storeID),
                        tpl: tpl,
                        itemSelector: 'div.part01',
                        listeners: {
                            itemdblclick: function (view, record) {

                                Ext.require(record.get('js'), function () {
                                    var center = Ext.getCmp('jdbc');
                                    var tag = center.items.get(record.get("tag"));
                                    if (!tag) {
                                        var obj = Ext.create(record.get('js'));
                                        center.add(obj);
                                        center.setActiveTab(obj);
                                    } else {
                                        if (center.setActiveTab() !== tag) {
                                            center.setActiveTab(tag);
                                        }
                                    }
                                })
                            }
                        }
                    }
                ]
            };
            me.menuList.push(item);
        }
    },
    userinfo: function (t) {
        {
            Ext.apply(Ext.form.VTypes, {
                password: function (val, field) {//val指这里的文本框值，field指这个文本框组件，大家要明白这个意思
                    if (field.confirmTo) {//confirmTo是我们自定义的配置参数，一般用来保存另外的组件的id值
                        var pwd = Ext.getCmp("pass")
                        return (val == pwd.getValue());
                    }
                    return true;
                }
            });
            Ext.create('Ext.window.Window', {
                title: '修改个人信息',
                id: 'updateuserinfo',
                modal: true,
                border: false,
                items: [
                    {
                        layout: 'form',
                        xtype: 'form',
                        width: 280,
                        frame: true,
                        defaults: {
                            labelWidth: 80,
                            labelAlign: "right",
                            xtype: 'textfield'
                        },
                        items: [
                            {fieldLabel: '操作员名称', name: 'to.operName', value: menu.user.operName, maxLength: 20},
                            {name: 'to.pwd', value: menu.user.pwd, hidden: true},
                            {name: 'to.operId', value: menu.user.operId, hidden: true},
                            {name: 'to.sortId', value: menu.user.sortId, hidden: true},
                            {name: 'to.state', value: menu.user.state, hidden: true},
                            {name: 'to.role.roleId', value: menu.user.role.roleId, hidden: true},
                            {fieldLabel: '地址', name: 'to.address', value: menu.user.address, maxLength: 10},
                            {fieldLabel: '手机号码', name: 'to.mobile', value: menu.user.mobile, xtype: 'numberfield', maxLength: 11},
                            {fieldLabel: '联系电话', name: 'to.linkTel', value: menu.user.linkTel, xtype: 'numberfield', maxLength: 13},
                            {fieldLabel: 'QQ', name: 'to.qq', value: menu.user.qq, xtype: 'numberfield', maxLength: 13},
                            {fieldLabel: 'Email', name: 'to.email', value: menu.user.email, vtypeText: "不是有效的邮箱地址", vtype: "email"}
                        ]
                    }
                ],
                buttonAlign: 'center',
                buttons: [
                    { text: '提交', handler: t.sumupdate},
                    { text: '重置',
                        handler: function () {
                            this.up('window').down('form').getForm().reset();
                        } },
                    { text: '取消', handler: function () {
                        Ext.getCmp("updateuserinfo").close();
                    }}
                ]
            }).show().center();
        }
    },
    sumupdate: function () {
        var form = this.up('window').down('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '/operupdate',
                success: function (form, action) {
                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.mag,
                        icon: Ext.MessageBox.WARNING,
                        buttons: Ext.MessageBox.YES
                    });
                    if (msg.ishave) {
                        Ext.getCmp("updateuserinfo").close();
                        return;
                    }
                },
                failure: function (form, action) {

                    var msg = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: '系统提示',
                        msg: msg.mag,
                        icon: Ext.MessageBox.QUESTION,
                        buttons: Ext.MessageBox.YES
                    });
                }
            });
        }
    }
});