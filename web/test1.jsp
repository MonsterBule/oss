<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014-11-11
  Time: 15:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
<title></title>
<style type="text/css">

</style>
<link href="extjs/resources/ext-theme-gray/ext-theme-gray-all.css" rel="stylesheet" type="text/css"/>
<link href="extjs/resources/css/xtheme-olive.css" rel="stylesheet"/>
<script type="text/javascript" src="extjs/ext-all-debug.js"></script>
<script src="extjs/locale/ext-lang-zh_CN.js" type="text/javascript"></script>
<script type="text/javascript">
Ext.onReady(function () {
//            var themes = [
//                ['默认', 'ext-all-gray.css'],
//                ['浅灰橙','xtheme-olive.css'],
//                ['黑灰色','ext-all-access.css'],
//                ['浅蓝色', 'ext-all-rtl.css'],
//                ['暗蓝色', 'ext-all-neptune.css']
//            ];
//            var Mystore=Ext.create("Ext.data.SimpleStore",{
//
//                fields:['theme','css'],
//                data:themes
//            });
//
//            Ext.create("Ext.window.Window",{
//                wight:250,
//                height:300,
//                border:true,
//           //     layout:'fit',
//                frame: true,
//                items:[{
//                    xtype:'form',
//                    layout:'form',
//                    items:[
//                        {
//                           xtype:'combo', fieldLabel:'更换皮肤',
//                            id:'css',
////                            triggerAction:'all',
//                            store:Mystore,
//                            displayField:'theme',
//                            valueField:'css',
//                            value:'默认',
//                            mode:'local',
//                            anchor:'95%',
//                            handleHeight:10,
//                            resizable:true,
//                            selectOnfocus:true,
//                            typeAhead:true,
//                            listeners:{
//                                "select":function(combo)
//                                {
//                                    var css = combo.getValue();
//                                    //设置cookies
//                                    var date=new Date();
//                                    //alert(css);
//                                    date.setTime(date.getTime()+30*24*3066*1000);
//                                    document.getElementsByTagName("link")[1].href="extjs/resources/css/"+css;
//                                    document.cookie="css="+css+";expires="+date.toGMTString();
//                                }
//                            }
//                        }
//                    ]
//
//                }]
//
//            }).show().center();
////            var Mycombo=new Ext.form.ComboBox({
////                fieldLabel:'更换皮肤',
////                id:'css',
////                triggerAction:'all',
////                store:Mystore,
////                displayField:'theme',
////                valueField:'css',
////                value:'默认',
////                mode:'local',
////                anchor:'95%',
////                handleHeight:10,
////                resizable:true,
////                selectOnfocus:true,
////                typeAhead:true
////            });
////            Mycombo.on //定义事件
////            ({
////                "select":function()
////                {
////                    var css =   Mycombo.getValue();
////                    //设置cookies
////                    var date=new Date();
////                    //alert(css);
////                    date.setTime(date.getTime()+30*24*3066*1000);
////                    document.getElementsByTagName("link")[1].href="extjs/resources/css/"+css;
////                    document.cookie="css="+css+";expires="+date.toGMTString();
////                }
////            });
    Ext.require('Ext.chart.*');
    Ext.require(['Ext.layout.container.Fit', 'Ext.window.MessageBox']);

    var store1 = Ext.create('Ext.data.Store', {
        fields: ['data1', 'name'],
        data: [
            {"data1": 1, "name": "正常入库"},
            {"data1": 2, "name": "报溢"},
            {"data1": 3, "name": "盘盈"}

        ]
    });
//
//            Ext.onReady(function () {
//                // store1.loadData(generateData(6, 20));
//
//                var donut = false,
//                        chart = Ext.create('Ext.chart.Chart', {
//                            xtype: 'chart',
//                            animate: true,
//                            store: store1,
//                            shadow: true,
//                            legend: {
//                                position: 'right'
//                            },
//                            insetPadding: 60,
//                            theme: 'Base:gradients',
//                            series: [{
//                                type: 'pie',
//                                field: 'data1',
//                                showInLegend: true,
//                                donut: donut,
//                                tips: {
//                                    trackMouse: true,
//                                    width: 140,
//                                    height: 28,
//                                    renderer: function(storeItem, item) {
//                                        //calculate percentage.
//                                        var total = 0;
//                                        store1.each(function(rec) {
//                                            total += rec.get('data1');
//                                        });
//                                        this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
//                                    }
//                                },
//                                highlight: {
//                                    segment: {
//                                        margin: 20
//                                    }
//                                },
//                                label: {
//                                    field: 'name',
//                                    display: 'rotate',
//                                    contrast: true,
//                                    font: '18px Arial'
//                                }
//                            }]
//                        });
//
//
//                var panel1 = Ext.create('widget.panel', {
//                    width: 800,
//                    height: 600,
//                    title: 'Semester Trends',
//                    renderTo: Ext.getBody(),
//                    layout: 'fit',
//                    tbar: [{
//                        text: 'Save Chart',
//                        handler: function() {
//                            Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
//                                if(choice == 'yes'){
//                                    chart.save({
//                                        type: 'image/png'
//                                    });
//                                }
//                            });
//                        }
//                    }, {
//                        text: 'Reload Data',
//                        handler: function() {
//                            // Add a short delay to prevent fast sequential clicks
//                            window.loadTask.delay(100, function() {
//                                store1.loadData(generateData(6, 20));
//                            });
//                        }
//                    }, {
//                        enableToggle: true,
//                        pressed: false,
//                        text: 'Donut',
//                        toggleHandler: function(btn, pressed) {
//                            chart.series.first().donut = pressed ? 35 : false;
//                            chart.refresh();
//                        }
//                    }],
//                    items: chart
//                });
//            });


    Ext.require('Ext.chart.*');
    Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite', 'Ext.window.MessageBox']);

    Ext.onReady(function () {

        var chart = Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: store1,
            axes: [
                {
                    type: 'Numeric',
                    position: 'left',
                    fields: ['data1'],
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    title: 'Number of Hits',
                    grid: true,
                    minimum: 0
                },
                {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'Month of the Year'
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
                            this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' $');
                        }
                    },
                    label: {
                        display: 'insideEnd',
                        'text-anchor': 'middle',
                        field: 'data1',
                        renderer: Ext.util.Format.numberRenderer('0'),
                        orientation: 'vertical',
                        color: '#333'
                    },
                    xField: 'name',
                    yField: 'data1'
                }
            ]
        });


        var win = Ext.create('Ext.window.Window', {
            width: 800,
            height: 600,
            minHeight: 400,
            minWidth: 550,
            hidden: false,
            maximizable: true,
            title: 'Column Chart',
            autoShow: true,
            layout: 'fit',
            tbar: [
                {
                    text: 'Save Chart',
                    handler: function () {
                        Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function (choice) {
                            if (choice == 'yes') {
                                chart.save({
                                    type: 'image/png'
                                });
                            }
                        });
                    }
                },
                {
                    text: 'Reload Data',
                    handler: function () {
                        // Add a short delay to prevent fast sequential clicks
                        window.loadTask.delay(100, function () {
                            store1.loadData(generateData());
                        });
                    }
                }
            ],
            items: chart
        });
    });
});
</script>
</head>
<body>
<%--<s:hidden value="%{#session.user.operName}" id="username"></s:hidden>--%>
<%--<s:hidden value="%{#session.user.operId}" id="userid"></s:hidden>--%>
</body>
</html>
