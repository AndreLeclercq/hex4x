
export let launch = () => console.log('script1 is loaded');


export function helloworld(text){
    document.getElementById('content').textContent = text;
}

export let msg = (id, txt) => document.getElementById(id).textContent = txt;
