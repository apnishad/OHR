export class JsLoader
{
    public loadExternalScript(url: string) {
        const el = document.querySelector("script[src=\""+url+"\"]");
        if(el !== null){
            document.body.removeChild(el);
        }
        const body = <HTMLDivElement> document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = true;
        script.defer = true;
        body.appendChild(script);
      }
}