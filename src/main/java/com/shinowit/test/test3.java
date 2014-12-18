package com.shinowit.test;

import javax.swing.*;


class MyCellEditor extends DefaultCellEditor {

    public MyCellEditor(JTextField textField) {
        super(textField);
// TODO Auto-generated constructor stub
    }

    public boolean stopCellEditing() {
        String value = (String) this.getCellEditorValue();
        if (value.equals("")) {
            ((JTextField) this.getComponent()).requestFocus();
            return false;
        } else
            return super.stopCellEditing();

    }
}