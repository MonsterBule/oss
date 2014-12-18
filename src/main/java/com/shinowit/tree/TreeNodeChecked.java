package com.shinowit.tree;

import com.shinowit.entity.TAuMenuinfo;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014/12/6.
 */


public class TreeNodeChecked {

    public TreeNodeChecked parent;

    private TAuMenuinfo menuinfo;

    private List<TreeNodeChecked> children = new ArrayList<TreeNodeChecked>();
    private boolean checked;

    public void addChild(TreeNodeChecked childNode) {
        childNode.parent = this;
        children.add(childNode);
    }

    public TAuMenuinfo getMenuinfo() {
        return menuinfo;
    }

    public void setMenuinfo(TAuMenuinfo menuinfo) {
        this.menuinfo = menuinfo;
    }

    public List<TreeNodeChecked> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNodeChecked> children) {
        this.children = children;
    }

    public boolean isLeaf() {
        return children.size() == 0;
    }


    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}