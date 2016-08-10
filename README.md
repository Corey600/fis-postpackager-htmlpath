### 用于补充Fis工具对html页面中a标签的href属性的处理

>   属于Fis的插件

Fis工具在编译文件时，对于html文件中a标签的href属性的路径并不会进行处理。这样会导致如果使用绝对路径，且部署的路径不是根目录，则路径将出错。

虽然Fis工具支持资源路径配置domain前缀，但是由于并不会处理a标签的href属性中的路径，所以也无效。

本插件的作用就是匹配html文件的中a标签的href属性，如果是绝对路径的html文件，则替换为增加了domain前缀的路径。

当然，由于domain前缀只在-D编译时有效，该插件的作用也只在-D编译时才会生效，而且由于html后缀的文件默认不开启domain前缀，需要在配置文件中开启。

示例：

```html
// 在html页面中，其中/html/index.html为绝对路径
<a href="/html/index.html">我是一个资源</a>

// fis release -D 编译后，可能是这样
<a href="/test/html/index.html">我是一个资源</a>
```

```javascript
// 配置

// 开启插件
fis.config.set('modules.postpackager', 'htmlpath');

// 配置domain前缀
fis.config.set('roadmap.domain', '/test');

// 配置html后缀名的文件路径是否使用domain前缀
fis.config.set('roadmap.path', [
    {
		reg: '**.html',
		useDomain: true
	}
].concat(fis.config.get('roadmap.path', []))
);
```
