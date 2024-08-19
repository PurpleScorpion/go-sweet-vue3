export default {
    user: {
        login: {
            username: {
                placeholder: "用户名",
                required: "请输入您的用户名"
            },
            password: {
                placeholder: "密码",
                required: "请输入密码"
            },
            login: "登录",
            logout: "登出",
            change_password:"修改密码",
			msg: "用户名或密码不正确",
			msg2: "该账户没有设置权限",
			msg3:"服务器错误"
        },
        menu:{
            menuName:'菜单名称',
            routerName:'路由名称',
            sort:'排序',
            action:'操作',
            titleAdd:'添加菜单',
            titleUpdate:'更新菜单',
            directory:'目录',
            directoryEnter:'请输入目录',
            type:'类型',
            menu:'菜单',
            menuEnter:'请输入菜单名称',
            router:'路由',
            routerEnter:'请输入路由',
            parentDirectory:'父目录',
            parentDirectorySelect:'请选择父目录',
            order:'排序',
            delete: {
                message: "您确定要删除菜单吗?"
            }
        },
        user:{
            userName:'用户名',
            role:'角色',
            status:'状态',
            createTime:'创建时间',
            action:'操作',
            titleAdd:'添加用户',
            titleUpdate:'更新用户',
            password:'密码',
            rePassword:'重复密码',
            enterUserName:'请输入用户名',
            enterPassWord:'请输入密码',
            confirmPassWord:'请重复输入密码',
            roleSelect:'请选择角色',
            selectrole:'选择角色',
            deleteUser: '是否要删除该用户?'
        },
        role:{
            roleName:'角色名',
            roleSelect:'角色选择',
            titleAdd:'添加角色',
            titleUpdate:'更新角色',
            enterRoleName:'请输入角色名称',
            delete: {
                message: "是否要删除该角色?"
            }
        },
        button:{
            add:'添加',
            search:'搜索',
            reset:'重置',
        }
    }
}