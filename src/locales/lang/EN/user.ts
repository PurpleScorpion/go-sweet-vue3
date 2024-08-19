export default {
    user: {
        login: {
            username: {
                placeholder: "Username",
                required: "Please enter your username"
            },
            password: {
                placeholder: "Password",
                required: "Please enter password"
            },
            login: "Login",
            logout: "Logout",
            change_password:"Change password",
			msg: "Incorrect username or password",
			msg2: "This account does not have permission to set up",
			msg3:"Server error"
        },
        menu:{
            menuName:'MenuName',
            routerName:'RouterName',
            sort:'Sort',
            action:'Action',
            titleAdd:'Add',
            titleUpdate:'Update',
            directory:'Directory',
            directoryEnter:'Please enter directory',
            type:'Type',
            menu:'Menu',
            menuEnter:'Please enter a menu name',
            router:'Router',
            routerEnter:'Please enter router',
            parentDirectory:'Parent directory',
            parentDirectorySelect:'Please select a parent directory',
            order:'Sort',
            delete: {
                message: "Are you sure you want to delete the menu?"
            }
        },
        user:{
            userName:'UserName',
            role:'Role',
            status:'Status',
            createTime:'CreateTime',
            action:'Action',
            titleAdd:'Add',
            titleUpdate:'Update',
            password:'Password',
            rePassword:'Re-Password',
            enterUserName:'Please enter username',
            enterPassWord:'Please enter password',
            confirmPassWord:'Please re-enter password',
            roleSelect:'Please select a role',
            selectrole:'Select Role',
            deleteUser: 'Do you want to delete this user?'
        },
        role:{
            roleName:'RoleName',
            roleSelect:'SelectRole',
            titleAdd:'Add',
            titleUpdate:'Update',
            enterRoleName:'Please enter a role name',
            delete: {
                message: "Do you want to delete this role?"
            }
        },
        button:{
            add:'add',
            search:'search',
            reset:'reset',
        }
    }
}