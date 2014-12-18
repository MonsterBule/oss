package com.shinowit.test;

import javax.swing.*;
import javax.swing.event.TableModelEvent;
import javax.swing.event.TableModelListener;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableColumn;
import javax.swing.table.TableColumnModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.util.Vector;

public class help extends JFrame implements ActionListener {

    Vector srcdata = new Vector();
    Vector rowdata = new Vector();
    Vector cname = new Vector(7);
    JTable jtable;
    JScrollPane jsp = new JScrollPane(); // 创建滚动窗
    //String projectintroadd="你的位置:"+TryTree.addprojectintro;
    DefaultTableModel model;
    JButton del;
    //TryTree trytree;
    JDialog jfr;
    int totalcol, selectcolum, totalrow, delrow;
    private JPanel jp2;

    public help() {
        super("Table");
        String[] columnName = {"col1", "col2", "col3", "col4", "col5", "col6", "col7"};
        rowdata.add("请输入");
        rowdata.add("请输入");
        rowdata.add("请输入");
        rowdata.add("请输入");
        rowdata.add("请输入");
        rowdata.add("请输入");
        rowdata.add("请输入");
        srcdata.add(rowdata);
        cname.add(columnName[0]);
        cname.add(columnName[1]);
        cname.add(columnName[2]);
        cname.add(columnName[3]);
        cname.add(columnName[4]);
        cname.add(columnName[5]);
        cname.add(columnName[6]);

        model = new DefaultTableModel(srcdata, cname);
        jtable = new JTable(model);
        model.addTableModelListener(new TableModelListener() {

            @Override
            public void tableChanged(TableModelEvent e) {
                // TODO Auto-generated method stub
                model = (DefaultTableModel) jtable.getModel();
            }
        });
        jtable.addKeyListener(new java.awt.event.KeyListener() {

            int col = 0;

            @Override
            public void keyPressed(KeyEvent e) {
                // TODO Auto-generated method stub
                totalcol = jtable.getModel().getColumnCount();
                selectcolum = jtable.getSelectedColumn();
                int keycode = e.getKeyCode();

                if ((selectcolum + 1) == totalcol && keycode == KeyEvent.VK_ENTER) {
                    Vector newdata = new Vector();
                    newdata.add("请输入");
                    newdata.add("请输入");
                    newdata.add("请输入");
                    newdata.add("请输入");
                    newdata.add("请输入");
                    newdata.add("请输入");
                    newdata.add("请输入");
                    model.addRow(newdata);//new Vector()

                }

                validate();

            }

            @Override
            public void keyReleased(KeyEvent e) {
                // TODO Auto-generated method stub

            }

            @Override
            public void keyTyped(KeyEvent e) {
                // TODO Auto-generated method stub

            }

        });
        TableColumnModel colmodel = jtable.getColumnModel();
        for (int index = 0; index < columnName.length; index++) {
            TableColumn tc = colmodel.getColumn(index);
            JTextField editor = new JTextField();
            MyCellEditor cellEditor = new MyCellEditor(editor);
            cellEditor.setClickCountToStart(1);
            tc.setCellEditor(cellEditor);
        }
        del = new JButton("删除选中行");
        del.addActionListener(this);
        this.add(del, BorderLayout.SOUTH);
        this.add(new JScrollPane(jtable), BorderLayout.CENTER);
        this.setSize(800, 600);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setVisible(true);
    }

    public static void main(String args[]) {
        new help();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // TODO Auto-generated method stub
        if (e.getSource() == del) {
            delrow = this.jtable.getSelectedRow();
            if (delrow == -1) {
                JOptionPane.showMessageDialog(this, "请选择要刪除的一行");
                return;
            }

            if (delrow > 0) {
                model.removeRow(delrow);//删除一行

            }
        }
    }
}
