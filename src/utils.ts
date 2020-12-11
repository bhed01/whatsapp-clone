import React from 'react';

export const showDropdown = (e:React.MouseEvent<HTMLElement, MouseEvent>) => {
    (e.target as HTMLElement).parentElement?.children[1].classList.toggle('dropdown-show')
}

export const setTheme = (theme: string|null) => {
    if (theme && theme === 'dark') document.body.classList.add('dark');
    else if (theme) document.body.classList.remove('dark');
    if(theme)
        window.localStorage.setItem('theme', theme);
}

export const truncate = (str: string, n: number) => {
	if (str.length <= n) {
		return str;
	}
	return str.slice(0, n) + '...';
};

const getRandomHex = ():string => Math.floor(Math.random()*13631272+3145728).toString(16)
const getHex = (n:number): string => (n%256).toString(16)

export const getColor = (id:string):string => {
    if(id.length > 4) {
        var n = id.length;
        return "#"
            + getHex(id.charCodeAt(0)+id.charCodeAt(1))
            + getHex(id.charCodeAt(n-4)+id.charCodeAt(n-3))
            + getHex(id.charCodeAt(n-2)+id.charCodeAt(n-1))
    }
    else 
        return "#" + getRandomHex()
}


export const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.ceil(
        Math.abs((
            Date.UTC(
                now.getFullYear(), 
                now.getMonth(), 
                now.getDate()
            )
            - Date.UTC(
                date.getFullYear(), 
                date.getMonth(), 
                date.getDate()
            )
        ) / (1000 * 60 * 60 * 24))
    );
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    if(diffDays < 1){
        return time;
    }else if(diffDays < 2){
        return "Yesterday, "+time;
    }else{
        return date.toLocaleDateString()+ ', ' + time;
    }
}