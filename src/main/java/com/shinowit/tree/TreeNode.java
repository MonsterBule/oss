package com.shinowit.tree;

import com.shinowit.entity.TAuMenuinfo;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014/12/6.
 */


public class TreeNode {

    public TreeNode parent;

    private TAuMenuinfo menuinfo;

    private List<TreeNode> children = new ArrayList<TreeNode>();

    public void addChild(TreeNode childNode) {
        childNode.parent = this;
        children.add(childNode);
    }

    public TAuMenuinfo getMenuinfo() {
        return menuinfo;
    }

    public void setMenuinfo(TAuMenuinfo menuinfo) {
        this.menuinfo = menuinfo;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

    public boolean isLeaf() {
        return children.size() == 0;
    }
}