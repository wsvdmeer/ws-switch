ws-switch
===========

Minimal jquery switch based on a checkbox

How to use:

Html:
```html
<input id="switch1" class="switch" type="checkbox" value="1" checked/>
```

Jquery:
```html
$(".switch").wsSwitch({onChange:check});
function check(data){
 console.log(data.value,data.target);
}

```

Defaults:
<ul>
<li>value: 1</li>
<li>onChange:function({value:boolean,target:object})</li>
</ul>
