import { http, url, type ServerResponse } from "@/util/http";
import storage from "@/util/storage";

interface Menu
{
	text: string;
	is_header: boolean;
	url: string;
	icon: string;
	is_divider: boolean;
	children: Menu[];
}

export interface Role
{
    _id: string;
    name: string;
    permission: Permission[];
}

export interface Permission
{
    _id: string;
    role_id: string;
    name: string;
    domain: string;
    action: string;
    route: string;
    role: Role
}

export interface Profile
{
    _id: string;
    role_id: string;
    fullname: string;
    username: string;
    email: string;
    hardware_id: string;
    computer_name: string;
    image: any;
    expired: string;
    recent_login: string;
    remember_token: string;
    refresh_token: string;
    google_id: string;
    role: Role;
    permission: Permission[];
}

class authentication extends(storage)
{
    async login(credential: { identity: string; password: string })
    {
        try 
        {
            const response = await http.post('/auth/login', credential, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200 && response.data.success)
            {
                this.setDuration(new Date());

                return true;
            }
        } 
        catch (error: any) 
        {
            alert(`Login Error ${error}`);
        }

        return false;
    }

    async logout()
    {
        try 
        {
            const response = await http.get('/auth/logout');

            if (response.status === 200)
            {
                this.clearData();
                location.replace('/login');

                return true;
            }
        } 
        catch (error) 
        {
            this.clearData();
            location.replace('/login');

            return false;
        }
    }

    async userProfile(): Promise<Profile | null>
    {
        const response = await http.get('/user/profile/detail', {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status == 200)
        {
            const json = response.data as ServerResponse<Profile>;

            if (!this.isAuth)
            {
                this.setUser(json.data);
            }

            return json.data;
        }

        return null;
    }

    async checkAuth(): Promise<boolean>
    {
        const response = await http.get('auth/check', {
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.status == 200)
        {
            const json = response.data as {message: string; success: boolean};

            return json.success;
        }

        this.clearData();

        return false;
    }
    
    data(): Profile | undefined
    {
        const data = this.getData('USER');
        if (!data)
        {
            this.clearData();

            return undefined;
        }

        
        return JSON.parse(data as string) as Profile;
    }

    role(): Role | null
    {
        const user = this.data();

        if (user)
        {
            return user.role;
        }

        return null;
    }

    get_expiry_time(): number
    {
        const data = this.getData('EXPIRY_TIME');

        if (!data)
        {
            this.logout();

            return 0;
        }

        return +data;
    }

    is_expired(): boolean
    {
        const data = this.getData('EXPIRY_TIME');
        const now = new Date();
        const threshold = 24 * 60 * 60 * 1000;

        if (data)
        {
            if (Math.abs(now.getTime() - +data) >= threshold)
            {
                return true;
            }
        }

        return false;
    }

    is_auth(): boolean 
    {
        this.isAuth = !!this.getData('USER');
        return this.isAuth as boolean;
    }

    avatar()
    {
        if (!this.data())
            return 'https://via.placeholder.com/800x500';

        return `${url.backend}/user/avatar/${this.data()?.image}`;
    }

    hasPermission(path: string): boolean
    {
        const jsonStr = this.getData('USER');
        const user = JSON.parse(jsonStr as string) as Profile;
        
        const permissions = user.permission.map((p) => p.name);
        
        return permissions.includes(path);
    }

    hasRenderPermission(param: Menu | any)
    {
        if (this.is_auth())
        {
            const jsonStr = this.getData('USER');
            const user = JSON.parse(jsonStr as string) as Profile;
            const permissions = user.permission.map((p) => p.route);

            if (!param.is_header || !param.is_divider)
            {
                return permissions.includes(param.url);
            }

            return true;
        }

        return false;
    }

    validate_permission(to: any, next: any)
    {
        if (this.is_auth()) 
        {
            if (!this.hasPermission(to.name))
            {
                if (to.path !== '/forbidden') 
                {
                    next('/forbidden');

                    return false;
                } 
                else 
                {
                    next();

                    return true;
                }
            }
            else
            {
                next();

                return true;
            }
        }
        else
        {
            if (to.path !== '/login') 
            {
                next('/login');

                return false;
            } 
            else 
            {
                // If already on /login, don't redirect again
                next();

                return true;
            }
        }
    }

    updateUser(id: string, user: Profile): Boolean
    {
        const jsonStr = this.getData('USER');
        const auth = JSON.parse(jsonStr as string) as Profile;
        
        if (id === auth._id)
        {
            auth.role_id = user.role_id
            auth.fullname = user.fullname
            auth.username = user.username
            auth.email = user.email
            auth.hardware_id = user.hardware_id
            auth.computer_name = user.computer_name
            auth.image = user.image
            auth.expired = user.expired
            auth.recent_login = user.recent_login
            auth.remember_token = user.remember_token
            auth.refresh_token = user.refresh_token
            auth.google_id = user.google_id

            this.setUser(auth);
            
            return true;
        }

        return false;
    }

    updateRole(id: string, role: Role): Boolean
    {
        const jsonStr = this.getData('USER');
        const user = JSON.parse(jsonStr as string) as Profile;
        
        if (id === user.role_id)
        {
            user.role_id = id;
            user.role = role;

            this.setUser(user);

            return true;
        }

        return false;
    }

    insertPermission(roleId: string, permission: Permission)
    {
        const jsonStr = this.getData('USER');
        const user = JSON.parse(jsonStr as string) as Profile;
        
        if (user.role_id === roleId)
        {
            user.permission.push(permission);
        }

        this.setUser(user);
    }

    updatePermission(id: string, permission: Permission)
    {
        const jsonStr = this.getData('USER');
        const user = JSON.parse(jsonStr as string) as Profile;

        if (user.permission.some(p => p._id === id))
        {
            user.permission.forEach((p) => {
                if (p._id === id)
                {
                    p = permission;
                }
            });

            this.setUser(user);

            return true;
        }
    }

    private setUser(user: Profile)
    {
        this.setData('USER', JSON.stringify(user));
        this.isAuth = true;
    }

    private setDuration(date: Date)
    {
        this.setData('EXPIRY_TIME', String(date.getTime()));
    }

    private isAuth: boolean | undefined;
}

export default new authentication();