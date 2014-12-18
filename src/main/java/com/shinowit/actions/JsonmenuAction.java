package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.dao.MenuDAO;
import com.shinowit.dao.TreeCheckedDAO;
import com.shinowit.dao.TreeRoleDAO;
import com.shinowit.entity.TAuAuthorization;
import com.shinowit.entity.TAuOperInfo;
import com.shinowit.tree.TreeNode;
import com.shinowit.tree.TreeNodeChecked;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014-11-11.
 */
public class JsonmenuAction extends ActionSupport {
    @Resource
    private BaseDAO<TAuAuthorization> midao;
    @Resource
    private BaseDAO<TAuOperInfo> todao;
    @Resource
    private MenuDAO menudao;
    //   private List<TAuAuthorization> root;
    @Resource
    private TreeRoleDAO roledao;
    @Resource
    private TreeCheckedDAO treedao;


    private TreeNodeChecked treeNodeChecked;
    private TreeNode treeNode;

    private TAuOperInfo user;

    private String id;

    private String roleid;

    public String list() {

        TAuOperInfo name = (TAuOperInfo) ServletActionContext.getRequest().getSession().getAttribute("user");
        if (name != null) {
            user = todao.findByHql1("from TAuOperInfo u where u.operName=? ", name.getOperName()).get(0);
            ServletActionContext.getRequest().getSession(true).setAttribute("now_user", user);

            treeNode = menudao.queryModule(user.getOperId());
        }
        return SUCCESS;
    }

    public String jsonmenu() {
        if (id != null) {

            treeNode = menudao.queryModule(id);
        }
        if (roleid != null) {
            treeNode = roledao.queryModule(roleid);
        }
        return SUCCESS;
    }


    public String tree() {
        treeNodeChecked = treedao.queryModule();
        return SUCCESS;
    }

    public String oss() {

        return SUCCESS;
    }


    public TAuOperInfo getUser() {
        return user;
    }

    public void setUser(TAuOperInfo user) {
        this.user = user;
    }

    public TreeNode getTreeNode() {
        return treeNode;
    }

    public void setTreeNode(TreeNode treeNode) {
        this.treeNode = treeNode;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoleid() {
        return roleid;
    }

    public void setRoleid(String roleid) {
        this.roleid = roleid;
    }

    public TreeNodeChecked getTreeNodeChecked() {
        return treeNodeChecked;
    }

    public void setTreeNodeChecked(TreeNodeChecked treeNodeChecked) {
        this.treeNodeChecked = treeNodeChecked;
    }
}
