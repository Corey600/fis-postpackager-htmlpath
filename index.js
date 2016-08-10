/*
 * author: corey600@github
 * for: Fis http://fis.baidu.com/
 */
'use strict';

function trimQuery(url){
    if (url.indexOf("?") !== -1) {
        url = url.slice(0, url.indexOf("?"));
    }
    return url;
}

module.exports = function(ret, conf, settings, opt){

    //替换a标签中的资源
    var tagReg = /<a[^>]+href=([^>]+)>/gi;

    //重组打包对象
    var map = {};
    fis.util.map(ret.src,function(subpath,file){
        if(file.isHtmlLike){
            map[subpath] = file.getUrl(opt.hash, opt.domain);
        }
    });

    fis.util.map(ret.src, function(subpath, file) {
        //html类文件，才需要做替换
        if (file.isHtmlLike) {
            var content = file.getContent();
			content = content.replace(tagReg,function(tag,url){
				if(url.indexOf("http://") > -1) return tag;
				url = url.replace(/"|'/g,"");
				url = url.split(" ")[0];
				var pkg = map[url];
				if(pkg){
					//console.log("htmlpath:" + tag);
					return tag.replace(url,pkg);
				}
				return tag;
			});
            file.setContent(content);
        }
    });
};