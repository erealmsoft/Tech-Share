
# eRealm Tech Share
**eRealm Tech Share** is a project for online presentation base on [reveal.js][1].

##项目结构 & 文件作用
 - Tech-Share结构
    - 2018-01-13
        - 个人文件夹 （如：Lynn）
            - 个人demo所需的所有文件
    - demo.html
    - index.html
    - .gitignore
    - README.md
 - 文件作用
    1. demo.html
        此文件为官方demo，包含reveal.js所有使用方式。
    2. index.html
        此文件是以demo.html为基础修改的eRealm Tech Share的主页，包含每次分享的所有ppt的地址入口。
    3. .gitignore
        所有需要忽略的文件的格式在此文件中记录，比如'.idea/'会忽略所有.idea文件夹下的所有文件。
    4. README.md
        即此文档。
##使用方法
1. 找到分享日期所对应的文件夹下找到自己的名字的文件夹；
2. 复制根目录下的demo.html文件，在此基础上修改为自己的内容，之后将此文件放在自己名字下的文件夹下；
3. 其中所有的CSS和JavaScript文件都使用了cdn link，自己新加的CSS及JS文件自行引用；
4. 在reveal.js中有很多主题可以切换，只需要将下面代码中的**serif**切换成以下词语即可
**Black / White / League / Sky / Beige / Simple / Serif / Blood / Night / Moon / Solarized**。

----------
    <head>
        <link rel="stylesheet" href="https://cdn.bootcss.com/reveal.js/3.6.0/css/theme/serif.css"id="theme">
    </head>
----------


  [1]: https://github.com/hakimel/reveal.js