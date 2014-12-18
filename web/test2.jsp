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
            Ext.require('Ext.chart.*');
            Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);

            var store1 = Ext.create('Ext.data.JsonStore', {
                fields: ['name', 'total', 'passed', 'deleted'],
                data: [
                    {
                        'name': '张三',
                        'total': 10,
                        'passed': 6,
                        'deleted': 4
                    },
                    {
                        'name': '李四',
                        'total': 10,
                        'passed': 5,
                        'deleted': 5
                    },
                    {
                        'name': '王五',
                        'total': 7,
                        'passed': 4,
                        'deleted': 3
                    },
                    {
                        'name': '赵六',
                        'total': 50,
                        'passed': 40,
                        'deleted': 10
                    },
                    {
                        'name': '赵六',
                        'total': 50,
                        'passed': 40,
                        'deleted': 10
                    }
                ]
            });

            var chart = Ext.create('Ext.chart.Chart', {
                style: 'background:#fff',
                animate: true,        //动画
                shadow: true,         //阴影
                store: store1,        //##
                legend: {
                    position: 'right'   //图例
                },
                axes: [
                    {
                        type: 'Numeric',  //显示图形类型- line：则线图；column：柱形图；radar：
                        position: 'bottom',        //
                        //fields: ['total', 'passed', 'deleted'],
                        xField: 'name',
                        yField: ['total', 'passed', 'deleted'],
                        minimum: 0,  //如果小于这个数，图标向下（相当于设置了一个起始点）
                        label: {
                            renderer: Ext.util.Format.numberRenderer('0,0')
                        },
                        grid: true,
                        title: '文章数'
                    },
                    {
                        type: 'Category',
                        position: 'left',
                        fields: ['name']
                        //, title: '员工绩效统计图'
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        axis: 'bottom',
                        xField: 'name',
                        yField: ['total', 'passed', 'deleted']
                    }
                ]
            });
            var win = Ext.create('Ext.Window', {
                width: 800,
                height: 600,
                minHeight: 400,
                minWidth: 550,
                hidden: false,
                maximizable: true,
                title: '员工绩效统计图',
                autoShow: true,
                layout: 'fit',
                tbar: [
                    {
                        text: '下载图表',
                        handler: function () {
                            Ext.MessageBox.confirm('下载提示', '是否下载当前图表?', function (choice) {
                                if (choice == 'yes') {
                                    chart.save({
                                        type: 'image/png'
                                    });
                                }
                            });
                        }
                    }
                ],
                items: chart
            });

        });
    </script>
</head>
<body>
<%--<s:hidden value="%{#session.user.operName}" id="username"></s:hidden>--%>
<%--<s:hidden value="%{#session.user.operId}" id="userid"></s:hidden>--%>
</body>
</html>
